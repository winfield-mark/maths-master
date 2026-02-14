// public/testEngine.js
import { tests } from './tests.js';
import { loadPage } from './loader.js';
import { renderDashboard } from './ui.js';
import { markAsComplete, currentUser, saveUserData } from './user.js';
import { curriculum } from './curriculum.js';

let currentTestSet = [];
let currentQuestionIndex = 0;
let score = 0;
let testConfig = null;
let activeTestId = null;

// public/testEngine.js

export async function startTest(id) {
    if (!id) {
        alert('No lesson selected for testing.');
        console.error('startTest called without an id:', { id, activeTestId });
        return;
    }

    // Reset runtime state immediately so stale UI/state cannot persist
    activeTestId = id;
    currentTestSet = [];
    currentQuestionIndex = 0;
    score = 0;
    testConfig = null;

    // Ensure the Tests page is reloaded (clear any previous results) and show a loading placeholder
    const testsDiv = document.getElementById('Tests');
    if (testsDiv) testsDiv.innerHTML = ''; // force loadPage to re-fetch the page
    await loadPage('Tests');
    const testContainer = document.getElementById('test-container');

    // Attempt to import the test module (cache-busted)
    const timestamp = new Date().getTime();
    const importPath = `/assets/tests/${id}.js?v=${timestamp}`;
    try {
        console.log('Importing test module:', importPath);
        let module;
        try {
            module = await import(importPath);
        } catch (impErr) {
            console.warn('Direct import failed, attempting fetch+blob fallback', impErr);
            // Try fetching the file text and importing from a blob (works around MIME/CORS issues)
            const resp = await fetch(importPath, { cache: 'no-store' });
            if (!resp.ok) throw new Error(`Fetch failed with status ${resp.status}`);
            const text = await resp.text();
            const blob = new Blob([text], { type: 'text/javascript' });
            const blobUrl = URL.createObjectURL(blob);
            try {
                module = await import(blobUrl);
            } finally {
                URL.revokeObjectURL(blobUrl);
            }
        }

        const testData = module.testData;
        testConfig = testData.config;

        // Reset counters and load the questions from the module
        currentTestSet = [...testData.questions]
            .sort(() => 0.5 - Math.random())
            .slice(0, testConfig.questionsToAsk || testData.questions.length);

        currentQuestionIndex = 0;
        score = 0;

        const titleEl = document.getElementById('test-title');
        if (titleEl) titleEl.textContent = `Testing: ${id}`;
        renderQuestion();

    } catch (err) {
        console.error("Could not load test file:", err);
        // First, inform the user
        if (testContainer) testContainer.innerHTML = `<h3>Error</h3><p>Test file not found for lesson: ${id}</p>`;
        alert(`Test file not found for lesson: ${id}\nTried: ${importPath}\n${err.message}`);

        // Fallback: try to find the test data in the bundled `tests` list
        try {
            const fallback = tests.find(t => t.testId === id || t.testId === String(id));
            if (fallback) {
                console.log('Using fallback test data from public/tests.js for', id);
                const testsDiv = document.getElementById('Tests');
                if (testsDiv) testsDiv.innerHTML = ''; // force reload of page structure
                await loadPage('Tests');

                const testData = fallback;
                testConfig = testData.config;

                currentTestSet = [...testData.questions]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, testConfig.questionsToAsk || testData.questions.length);

                currentQuestionIndex = 0;
                score = 0;

                const titleEl = document.getElementById('test-title');
                if (titleEl) titleEl.textContent = `Testing: ${id}`;
                renderQuestion();
                return;
            }
        } catch (fallbackErr) {
            console.error('Fallback to bundled tests failed', fallbackErr);
        }
    }
}

export function renderQuestion() {
    if (!currentTestSet || currentTestSet.length === 0) {
        const container = document.getElementById('choices-container');
        const testContainer = document.getElementById('test-container');
        if (container) container.innerHTML = '';
        if (testContainer) testContainer.innerHTML = '<p>No questions available for this test.</p>';
        console.warn('renderQuestion called but currentTestSet is empty', { currentTestSet, currentQuestionIndex });
        return;
    }

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

// public/testEngine.js

function showResults() {
    const isPass = score >= testConfig.minToPass;
    const testContainer = document.getElementById('test-container');
    const lesson = curriculum.find(l => l.lessonId === activeTestId);
    const masteryReward = lesson ? lesson.tokensReward : 10;
    const finalReward = isPass ? masteryReward : 1;

    // 1. Update the local session object
    if (isPass) {
        markAsComplete(activeTestId); // Adds ID to currentUser.lessonsDone
    }
    
    if (currentUser) {
        currentUser.tokens += finalReward; // Adds tokens to currentUser.tokens
        
        // 2. IMPORTANT: Send the updated currentUser object to the server
        saveUserData(); 
    }

    // 3. Display the Results UI
    testContainer.innerHTML = `
        <h3>Test Complete!</h3>
        <p>You scored: ${score} / ${currentTestSet.length}</p>
        <p>${isPass ? "🎉 Congratulations! You Passed!" : "❌ Not quite there yet."}</p>
        <p>Tokens earned: 🪙 ${finalReward}</p>
        <button id="finish-test-btn" class="primary-btn">Return to Dashboard</button>
    `;

    // 4. Handle navigation
    document.getElementById('finish-test-btn').onclick = () => {
        loadPage('Home').then(() => renderDashboard());
    };
}