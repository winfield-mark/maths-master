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

    container.innerHTML = ''; 

    curriculum.forEach(lesson => {
        // Logic: Only show lessons where prerequisites are met
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