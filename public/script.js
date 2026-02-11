// public/script.js
import { loadPage } from './loader.js';
import { renderDashboard } from './ui.js';
import { startTest, handleNextStep } from './testEngine.js';
import { curriculum } from './curriculum.js';

let activeLessonId = null;

async function startLesson(id) {
    activeLessonId = id;
    await loadPage('Lessons');
    const lesson = curriculum.find(l => l.lessonId === id);
    
    if (lesson) {
        document.getElementById('lesson-title').textContent = lesson.title;
        
        // Update for local video storage
        const videoElement = document.getElementById('lesson-video');
        const sourceElement = document.getElementById('video-source');
        
        // This assumes your assets folder is served at the root/assets
        sourceElement.src = `/assets/${lesson.media.videoFile}`;
        
        videoElement.load(); // This tells the browser to reload the new video file
        
        document.getElementById('lesson-text').innerHTML = lesson.content;
        if (window.MathJax) MathJax.typesetPromise();
    }
}

function handleLogin() {
    const username = document.getElementById('username').value;
    document.getElementById('main-nav').classList.remove('nav-hidden');
    loadPage('Home').then(() => {
        document.getElementById('display-username').textContent = username;
        renderDashboard();
    });
}

// Global Event Delegation
document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('lesson-btn')) startLesson(e.target.dataset.lessonId);
    if (e.target.classList.contains('nav-link')) {
        const page = e.target.dataset.page;
        loadPage(page).then(() => { if (page === 'Home') renderDashboard(); });
    }
    if (e.target.id === 'start-test-btn'){ 
        console.log("Test requested for lesson:", activeLessonId);
        startTest(activeLessonId);
    }
    // if (e.target.id === 'next-question-btn') handleNextStep();
});

document.body.addEventListener('submit', (e) => {
    if (e.target.id === 'login-form') { e.preventDefault(); handleLogin(); }
});

loadPage('Login');