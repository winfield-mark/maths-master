// public/loader.js
import { showPage } from './ui.js';

export async function loadPage(pageId) {
    const targetDiv = document.getElementById(pageId);
    if (!targetDiv) return;

    // Only fetch if the div is empty to save bandwidth
    if (targetDiv.innerHTML.trim() === '') {
        targetDiv.innerHTML = '<p class="loading">Loading content...</p>';
        showPage(pageId); 

        try {
            const response = await fetch(`/pages/${pageId}.html`);
            if (!response.ok) throw new Error('Page not found');
            const html = await response.text();
            targetDiv.innerHTML = html;

            // Trigger MathJax for the newly injected HTML
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