import { curriculum } from './curriculum.js';
// ADD THIS LINE BELOW:
import { currentUser, markAsComplete } from './user.js'; 

// Let's also define this so startTest works later
let activeLessonId = null;

/**
 * 1. UTILITY FUNCTIONS (Low-Level Helpers)
 */

// Handles the visual swapping of "pages"
function showPage(pageId) {
    document.querySelectorAll('.page-content').forEach(div => {
        div.classList.add('hidden');
    });
    
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove('hidden');
    }
}

// Renders the list of lessons dynamically on the Home dashboard
function renderDashboard() {
    const container = document.getElementById('lesson-list');
    if (!container) return; 

    container.innerHTML = ''; 

    curriculum.forEach(lesson => {
        // LOGIC: A lesson is unlocked only if EVERY prerequisite is found in lessonsDone
        const isUnlocked = lesson.prerequisites.every(prereq => 
            currentUser.lessonsDone.includes(prereq)
        );

        if (isUnlocked) {
            const btn = document.createElement('button');
            btn.className = 'lesson-btn';
            
            // Add a checkmark if they've already passed the test for this lesson
            const status = currentUser.lessonsDone.includes(lesson.lessonId) ? ' ✓' : '';
            btn.textContent = `${lesson.lessonId}${status}`;
            
            btn.dataset.lessonId = lesson.lessonId;
            container.appendChild(btn);
        }
    });
}

/**
 * 2. CORE LOGIC (Middle-Level Functions)
 */

// Fetches content and handles MathJax rendering
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

            if (window.MathJax) {
                MathJax.typesetPromise([targetDiv]);
            }
        } catch (err) {
            targetDiv.innerHTML = "<h2>Error</h2><p>Could not load page.</p>";
            console.error(err);
        }
    }
    showPage(pageId);
}

// Logic for completing a lesson
function markLessonComplete() {
    alert(`Great job! Progress updated.`);
    loadPage('Home').then(() => {
        renderDashboard();
    });
}

// Populates the Lesson template with data from the schema
async function startLesson(id) {
    activeLessonId = id;
    await loadPage('Lessons');

    const lesson = curriculum.find(l => l.lessonId === id);

    if (lesson) {
        document.getElementById('lesson-title').textContent = lesson.title;
        document.getElementById('lesson-video').src = `https://www.youtube.com/embed/${lesson.media.youtubeId}`;
        
        const mathHeader = lesson.media.keyFormula ? `<div class="formula-box">Key Formula: ${lesson.media.keyFormula}</div>` : '';
        document.getElementById('lesson-text').innerHTML = mathHeader + lesson.content;

        if (window.MathJax) {
            MathJax.typesetPromise();
        }
    }
}

async function startTest(id) {
    activeTestId = id; 
    await loadPage('Tests');

    // Filter your testData for this specific lesson ID
    // (We will need to align testData keys with lessonIds)
    const questions = testData[id]; 

    if (questions) {
        renderQuestions(questions);
    }
}

// Inside your Test success logic:
function onTestPass() {
    // 1. Add the active lesson ID to the user's progress
    if (activeLessonId && !currentUser.lessonsDone.includes(activeLessonId)) {
        currentUser.lessonsDone.push(activeLessonId);
    }
    
    // 2. Award tokens
    const lesson = curriculum.find(l => l.lessonId === activeLessonId);
    if (lesson) {
        currentUser.tokens.received += lesson.tokensReward;
    }

    alert(`Test Passed! ${activeLessonId} mastered.`);
    
    // 3. Go home and re-render. Number-14 should now appear!
    loadPage('Home').then(() => {
        renderDashboard();
    });
}

/**
 * 3. TOP-LEVEL APP FUNCTIONS (Entry Point Logic)
 */

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
 * 4. EVENT LISTENERS
 */

// General click listener (Event Delegation)
document.body.addEventListener('click', (e) => {
    // Lesson buttons
    if (e.target.classList.contains('lesson-btn')) {
        const id = e.target.dataset.lessonId;
        startLesson(id);
    }
    
    // Navigation links
    if (e.target.classList.contains('nav-link')) {
        const pageId = e.target.getAttribute('data-page');
        loadPage(pageId).then(() => {
            if (pageId === 'Home') renderDashboard();
        });
    }

    if (e.target.id === 'start-test-btn') {
        // Since activeLessonId was set when we started the lesson, 
        // we pass it straight to the test
        startTest(activeLessonId);
    }
});

// Login form submission
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