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
    const testData = tests.find(t => t.testId === id);
    if (!testData) return;

    testConfig = testData.config;
    // Shuffle and slice
    currentTestSet = [...testData.questions]
        .sort(() => 0.5 - Math.random())
        .slice(0, testConfig.questionsToAsk);

    currentQuestionIndex = 0;
    score = 0;
    
    await loadPage('Tests');
    document.getElementById('test-title').textContent = `Testing: ${id}`;
    renderQuestion();
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

    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = option; 
        btn.onclick = () => handleAnswer(index);
        container.appendChild(btn);
    });

    if (window.MathJax) {
        MathJax.typesetPromise([container, document.getElementById('question-text')]);
    }
}

function handleAnswer(selectedIndex) {
    const question = currentTestSet[currentQuestionIndex];
    const feedback = document.getElementById('test-feedback');
    const msg = document.getElementById('feedback-message');
    const nextBtn = document.getElementById('next-question-btn');
    
    document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
    
    if (selectedIndex === question.correctIndex) {
        score++;
        msg.textContent = "Correct!";
        msg.style.color = "green";
    } else {
        msg.innerHTML = `Incorrect. The answer was: ${question.options[question.correctIndex]}`;
        msg.style.color = "red";
        if (window.MathJax) MathJax.typesetPromise([msg]);
    }

    feedback.classList.remove('hidden');
    nextBtn.textContent = (currentQuestionIndex === currentTestSet.length - 1) ? "See Results" : "Next Question";
}

export function handleNextStep() {
    if (currentQuestionIndex < currentTestSet.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        finishTest();
    }
}

function finishTest() {
    const passed = score >= testConfig.minToPass;
    if (passed) {
        markAsComplete(activeTestId);
        const lesson = curriculum.find(l => l.lessonId === activeTestId);
        if (lesson) currentUser.tokens.received += lesson.tokensReward;
        alert("Passed!");
    } else {
        alert("Try again!");
    }
    loadPage('Home').then(() => renderDashboard());
}