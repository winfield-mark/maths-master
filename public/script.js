// public/script.js
import { loadPage } from './loader.js';
import { renderDashboard } from './ui.js';
import { startTest, handleNextStep } from './testEngine.js';
import { curriculum } from './curriculum.js';
import { currentUser, saveUserData } from './user.js';

let activeLessonId = null;

async function startLesson(id) {
    activeLessonId = id;
    await loadPage('Lessons');
    const lesson = curriculum.find(l => l.lessonId === id);
    
    if (lesson) {
        document.getElementById('lesson-title').textContent = lesson.title;
        const videoElement = document.getElementById('lesson-video');
        const sourceElement = document.getElementById('video-source');
        sourceElement.src = `/assets/${lesson.media.videoFile}`;
        videoElement.load();
        document.getElementById('lesson-text').innerHTML = lesson.content;
        if (window.MathJax) MathJax.typesetPromise();
    }

    // Attach the current lesson id to the "Take the Test" button so startTest always has it
    const startBtn = document.getElementById('start-test-btn');
    if (startBtn) startBtn.dataset.lessonId = id;
}

/**
 * Updates the global user session and UI after successful authentication
 */
function finalizeLogin(user) {
    // Copy all data from the server response into our local currentUser object
    Object.assign(currentUser, user); 
    
    document.getElementById('main-nav').classList.remove('nav-hidden');
    loadPage('Home').then(() => {
        document.getElementById('display-username').textContent = user.username;
        renderDashboard();
    });
}

function showLoginError(msg) {
    const errorEl = document.getElementById('login-error');
    if (errorEl) {
        errorEl.textContent = msg;
        errorEl.classList.remove('hidden');
    }
}

// Global Event Delegation for Clicks
// Replace the event listeners at the bottom of public/script.js

// 1. Unified Click Listener
document.body.addEventListener('click', async (e) => {
    // Prevent default button behaviour (page refresh)
    if (e.target.tagName === 'BUTTON') e.preventDefault();

    // Standard Navigation
    if (e.target.classList.contains('lesson-btn')) startLesson(e.target.dataset.lessonId);
    if (e.target.classList.contains('nav-link')) {
        const page = e.target.dataset.page;
        loadPage(page).then(() => { if (page === 'Home') renderDashboard(); });
    }
    if (e.target.id === 'start-test-btn') {
        const id = e.target.dataset.lessonId || activeLessonId;
        startTest(id);
    }

    // --- LOGIN / REGISTER LOGIC ---

    // Switch to Registration View
    if (e.target.id === 'show-register-btn') {
        document.getElementById('email-label').classList.remove('hidden');
        document.getElementById('email').classList.remove('hidden');
        document.getElementById('confirm-pass-group').classList.remove('hidden');
        document.getElementById('register-btn').classList.remove('hidden');
        document.getElementById('back-to-login-btn').classList.remove('hidden');
        
        document.getElementById('login-btn').classList.add('hidden');
        document.getElementById('show-register-btn').classList.add('hidden');
    }

    // Return to Login View
    if (e.target.id === 'back-to-login-btn') {
        location.reload(); 
    }

    // Process Login
    if (e.target.id === 'login-btn') {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) return showLoginError("Please enter both fields.");

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.success) finalizeLogin(data.user);
            else showLoginError(data.message);
        } catch (err) {
            showLoginError("Server connection failed.");
        }
    }

    // Process Registration
    if (e.target.id === 'register-btn') {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirm-password').value;

        if (password !== confirm) return showLoginError("Passwords do not match");

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            if (data.success) finalizeLogin(data.user);
            else showLoginError(data.message);
        } catch (err) {
            showLoginError("Server connection failed.");
        }
    }
});


// Initial Page Load
loadPage('Login');
