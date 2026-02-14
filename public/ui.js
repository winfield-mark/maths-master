// public/ui.js
import { curriculum } from './curriculum.js';
import { currentUser } from './user.js';

export function showPage(pageId) {
    document.querySelectorAll('.page-content').forEach(div => {
        div.classList.add('hidden');
    });
    
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove('hidden');
    }
}

export function renderDashboard() {
    const container = document.getElementById('lesson-list');
    if (!container) return;

    // 1. Update the Statistics on the Home Page
    // We match these IDs exactly to your Home.html
    const lessonsCountEl = document.getElementById('stat-lessons'); 
    const tokenDisplay = document.getElementById('stat-tokens');
    const testsPassedEl = document.getElementById('stat-tests');

    if (lessonsCountEl) {
        // The count is the number of items in the lessonsDone array
        lessonsCountEl.textContent = currentUser.lessonsDone.length;
    }

    if (tokenDisplay) {
        tokenDisplay.textContent = currentUser.tokens;
    }
    
    if (testsPassedEl) {
        // For now, this is the same as lessons completed
        testsPassedEl.textContent = currentUser.lessonsDone.length;
    }

    // 2. Clear and rebuild the Lesson Buttons
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