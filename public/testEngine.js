// public/testEngine.js
import { tests } from './tests.js';
import { loadPage } from './loader.js';
import { renderDashboard } from './ui.js';
import { markAsComplete, currentUser } from './user.js';
import { curriculum } from './curriculum.js';

let currentTestSet = [];
let currentQuestionIndex = 0;
let score = 0;
let testConfig = null;
let activeTestId = null;

export async function startTest(id) {
    activeTestId = id;
    
    try {
        // Dynamically import the specific test file from the assets folder
        const module = await import(`/assets/tests/${id}.js`);
        const testData = module.testData;

        testConfig = testData.config;
        currentTestSet = [...testData.questions]
            .sort(() => 0.5 - Math.random())
            .slice(0, testConfig.questionsToAsk);

        currentQuestionIndex = 0;
        score = 0;

        await loadPage('Tests');
        document.getElementById('test-title').textContent = `Testing: ${id}`;
        renderQuestion();
    } catch (err) {
        console.error("Could not load test file:", err);
        alert("Test file not found for this lesson.");
    }
}

export function renderQuestion() {
    const question = currentTestSet[currentQuestionIndex];
    const container = document.getElementById('choices-container');
    const feedback = document.getElementById('test-feedback');

    document.getElementById('current-q-number').textContent = currentQuestionIndex + 1;
    document.getElementById('total-q-count').textContent = currentTestSet.length;
    document.getElementById('score-count').textContent = score;
    
    document.getElementById('question-text').textContent = question.q;
    container.innerHTML = '';
    feedback.classList.add('hidden');

    if (question.type === "multiple-choice") {
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = option;
            btn.onclick = () => handleAnswer(index);
            container.appendChild(btn);
        });
    } else if (question.type === "written") {
        const input = document.createElement('input');
        input.type = "text";
        input.id = "written-answer";
        input.className = "written-input"; // We can style this in CSS
        input.placeholder = "Type your answer here...";

        // NEW: Listen for the "Enter" key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleAnswer(input.value.trim());
            }
        });
        
        const submitBtn = document.createElement('button');
        submitBtn.textContent = "Submit Answer";
        submitBtn.className = "primary-btn";
        submitBtn.id = "submit-written-btn";
        submitBtn.onclick = () => handleAnswer(input.value.trim());
        
        container.appendChild(input);
        container.appendChild(submitBtn);

        // This places the cursor in the box automatically
        setTimeout(() => input.focus(), 50);
    }

    if (window.MathJax) {
        MathJax.typesetPromise([container, document.getElementById('question-text')]);
    }
}

function handleAnswer(userProvidedValue) {
    const question = currentTestSet[currentQuestionIndex];
    const feedback = document.getElementById('test-feedback');
    const msg = document.getElementById('feedback-message');
    const nextBtn = document.getElementById('next-question-btn');

    // 1. Disable Multiple Choice Buttons
    document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
    
    // 2. Disable the Input Box
    const input = document.getElementById('written-answer');
    if (input) input.disabled = true;

    // 3. REMOVE the Submit Button entirely so it cannot be clicked again
    const submitBtn = document.getElementById('submit-written-btn');
    if (submitBtn) {
        submitBtn.remove(); 
    }

    let isCorrect = false;

    // 4. Scoring Logic
    if (question.type === "multiple-choice") {
        isCorrect = (userProvidedValue === question.correctIndex);
    } else if (question.type === "written") {
        const studentAns = String(userProvidedValue).toLowerCase().trim();
        const correctAns = String(question.correctAnswer).toLowerCase().trim();
        isCorrect = (studentAns === correctAns);
    }

    if (isCorrect) {
        score++;
        msg.textContent = "Correct!";
        msg.style.color = "green";
    } else {
        const displayCorrect = question.type === "multiple-choice" 
            ? question.options[question.correctIndex] 
            : question.correctAnswer;
            
        msg.innerHTML = `Incorrect. The answer was: ${displayCorrect}`;
        msg.style.color = "red";
    }

    // 5. Update UI
    document.getElementById('score-count').textContent = score;
    feedback.classList.remove('hidden');
    
    // Set the text
    if (currentQuestionIndex === currentTestSet.length - 1) {
        nextBtn.textContent = "See Results";
    } else {
        nextBtn.textContent = "Next Question";
    }

    // 1. Disable the button for the half-second delay
    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";

    // 2. Wait 500ms
    setTimeout(() => {
        const finalBtn = document.getElementById('next-question-btn');
        if (finalBtn) {
            finalBtn.disabled = false;
            finalBtn.style.opacity = "1";
            
            // We use 'onclick' because it overwrites previous 'onclick' assignments
            finalBtn.onclick = () => {
                console.log("Button clicked! Current index:", currentQuestionIndex);
                handleNextStep();
            };
            
            finalBtn.focus();
        } else {
            console.error("Could not find next-question-btn in the DOM");
        }
    }, 500);
}

export function handleNextStep() {
    if (currentQuestionIndex < currentTestSet.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        // Switch from calling finishTest() to showResults()
        showResults();
    }
}

function showResults() {
    const isPass = score >= testConfig.minToPass;
    const testContainer = document.getElementById('test-container');
    
    // 1. Find the lesson in the curriculum to get your specific tokensReward
    const lesson = curriculum.find(l => l.lessonId === activeTestId);
    const masteryReward = lesson ? lesson.tokensReward : 10;
    const finalReward = isPass ? masteryReward : 1; 

    // 2. Mark as complete if they passed
    if (isPass) {
        markAsComplete(activeTestId);
    }

    // 3. Display the Results UI
    testContainer.innerHTML = `
        <div class="test-results" style="text-align: center; padding: 20px;">
            <h2>Test Complete!</h2>
            <hr>
            <p style="font-size: 1.5rem;">You scored: <strong>${score} / ${currentTestSet.length}</strong></p>
            <p class="status-msg" style="color: ${isPass ? '#2e7d32' : '#d32f2f'}; font-weight: bold;">
                ${isPass ? "🎉 Congratulations! You Passed!" : "❌ Not quite there yet. Keep practicing!"}
            </p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #dee2e6;">
                <p style="margin:0;">Tokens earned: 🪙 <strong>${finalReward}</strong></p>
            </div>
            <button id="finish-test-btn" class="primary-btn">Return to Dashboard</button>
        </div>
    `;

    // 4. Update the actual token balance (Saving to localStorage)
    let tokens = parseInt(localStorage.getItem('userTokens') || '0');
    localStorage.setItem('userTokens', tokens + finalReward);
    
    // Also update the active session object if it exists
    if (currentUser && currentUser.tokens) {
        currentUser.tokens.received += finalReward;
    }

    // Trigger UI refresh for the token counter
    window.dispatchEvent(new Event('storage'));

    // 5. Handle the return home
    document.getElementById('finish-test-btn').onclick = () => {
        loadPage('Home').then(() => renderDashboard());
    };
}