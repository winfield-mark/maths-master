import { tests } from './tests.js';
import { curriculum } from './curriculum.js';
import { currentUser, markAsComplete } from './user.js'; // Essential import!

// Application State
let activeLessonId = null;
let activeTestId = null;
let currentTestSet = [];
let currentQuestionIndex = 0;
let score = 0;
let testConfig = null;

/**
 * 1. UTILITY & HELPER FUNCTIONS
 */

function showPage(pageId) {
    document.querySelectorAll('.page-content').forEach(div => {
        div.classList.add('hidden');
    });
    const target = document.getElementById(pageId);
    if (target) target.classList.remove('hidden');
}

function prepareTestSet(testId) {
    const testData = tests.find(t => t.testId === testId);
    if (!testData) return null;
    testConfig = testData.config;
    const shuffled = [...testData.questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, testConfig.questionsToAsk);
}

/**
 * 2. RENDERING FUNCTIONS
 */

function renderDashboard() {
    const container = document.getElementById('lesson-list');
    if (!container) return;
    container.innerHTML = '';

    curriculum.forEach(lesson => {
        const isUnlocked = lesson.prerequisites.every(prereq => 
            currentUser.lessonsDone.includes(prereq)
        );

        if (isUnlocked) {
            const btn = document.createElement('button');
            btn.className = 'lesson-btn';
            const status = currentUser.lessonsDone.includes(lesson.lessonId) ? ' ✓' : '';
            btn.textContent = `${lesson.lessonId}${status}`;
            btn.dataset.lessonId = lesson.lessonId;
            container.appendChild(btn);
        }
    });
}

function renderQuestion() {
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

/**
 * 3. LOGIC & EVENT HANDLERS
 */

async function loadPage(pageId) {
    const targetDiv = document.getElementById(pageId);
    if (!targetDiv) return;
    if (targetDiv.innerHTML.trim() === '') {
        targetDiv.innerHTML = '<p class="loading">Loading content...</p>';
        showPage(pageId); 
        try {
            const response = await fetch(`/pages/${pageId}.html`);
            if (!response.ok) throw new Error('Page not found');
            const html = await response.text();
            targetDiv.innerHTML = html;
        } catch (err) {
            targetDiv.innerHTML = "<h2>Error</h2><p>Could not load page.</p>";
            console.error(err);
        }
    }
    showPage(pageId);
}

function handleAnswer(selectedIndex) {
    const question = currentTestSet[currentQuestionIndex];
    const feedback = document.getElementById('test-feedback');
    const msg = document.getElementById('feedback-message');
    const nextBtn = document.getElementById('next-question-btn');
    
    document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
    
    if (selectedIndex === question.correctIndex) {
        score++;
        msg.textContent = "Correct! Well done.";
        msg.style.color = "green";
    } else {
        // Change from .textContent to .innerHTML to support LaTeX formatting
        msg.innerHTML = `Not quite. The correct answer was: ${question.options[question.correctIndex]}`;
        msg.style.color = "red";

        // --- NEW: Trigger MathJax to render the feedback message ---
        if (window.MathJax) {
            MathJax.typesetPromise([msg]);
        }
    }

    feedback.classList.remove('hidden');
    nextBtn.textContent = (currentQuestionIndex === currentTestSet.length - 1) ? "See Results" : "Next Question";
}

function finishTest() {
    const passed = score >= testConfig.minToPass;
    if (passed) {
        markAsComplete(activeTestId);
        const lesson = curriculum.find(l => l.lessonId === activeTestId);
        if (lesson) currentUser.tokens.received += lesson.tokensReward;
        alert(`Congratulations! You passed with ${score}/${currentTestSet.length}.`);
    } else {
        alert(`You didn't pass (${score}/${currentTestSet.length}). Try again!`);
    }
    loadPage('Home').then(() => renderDashboard());
}

async function startLesson(id) {
    activeLessonId = id;
    await loadPage('Lessons');
    const lesson = curriculum.find(l => l.lessonId === id);
    if (lesson) {
        document.getElementById('lesson-title').textContent = lesson.title;
        document.getElementById('lesson-video').src = `https://www.youtube.com/embed/${lesson.media.youtubeId}`;
        const mathHeader = lesson.media.keyFormula ? `<div class="formula-box">Key Formula: ${lesson.media.keyFormula}</div>` : '';
        document.getElementById('lesson-text').innerHTML = mathHeader + lesson.content;
        if (window.MathJax) MathJax.typesetPromise();
    }
}

async function startTest(id) {
    activeTestId = id; 
    currentTestSet = prepareTestSet(id);
    if (!currentTestSet) return;
    currentQuestionIndex = 0;
    score = 0;
    await loadPage('Tests');
    document.getElementById('test-title').textContent = `Testing: ${id}`;
    renderQuestion();
}

function handleLogin() {
    const usernameInput = document.getElementById('username').value;
    document.getElementById('main-nav').classList.remove('nav-hidden');
    loadPage('Home').then(() => {
        const displaySpan = document.getElementById('display-username');
        if (displaySpan) displaySpan.textContent = usernameInput;
        renderDashboard();
    });
}

/**
 * 4. GLOBAL EVENT LISTENERS
 */

document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('lesson-btn')) {
        startLesson(e.target.dataset.lessonId);
    }
    if (e.target.id === 'next-question-btn') {
        if (currentQuestionIndex < currentTestSet.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            finishTest();
        }
    }
    if (e.target.classList.contains('nav-link')) {
        const pageId = e.target.getAttribute('data-page');
        loadPage(pageId).then(() => { if (pageId === 'Home') renderDashboard(); });
    }
    if (e.target.id === 'start-test-btn') {
        startTest(activeLessonId);
    }
});

document.body.addEventListener('submit', (e) => {
    if (e.target.id === 'login-form') {
        e.preventDefault(); 
        handleLogin();
    }
});

/**
 * 5. INITIALIZATION
 */
loadPage('Login');