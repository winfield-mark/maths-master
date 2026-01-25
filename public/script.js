const lessonData = {
    'intro-fractions': {
        title: 'Introduction to Fractions',
        videoUrl: 'https://www.youtube.com/embed/n0FZhQ_GkKw', // Updated ID
        content: '<p>Fractions represent parts of a whole...</p>'
    },
    'decimals-basics': {
        title: 'Mastering Decimals',
        videoUrl: 'https://www.youtube.com/embed/n0FZhQ_GkKw', // Updated ID
        content: '<p>Decimals are another way of writing fractions...</p>'
    }
};

/**
 * 1. HELPER FUNCTIONS
 * We define these first so they are ready to be called.
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

// The "Brain" that fetches content only when needed
async function loadPage(pageId) {
    const targetDiv = document.getElementById(pageId);

    // If the div has no content, we fetch it from the server
    if (targetDiv.innerHTML.trim() === '') {
        targetDiv.innerHTML = '<p class="loading">Loading content...</p>';
        showPage(pageId); 

        try {
            const response = await fetch(`/pages/${pageId}.html`);
            if (!response.ok) throw new Error('Page not found');
            
            const html = await response.text();
            
            // Optional: Artificial delay to see the "Loading..." state
            // await new Promise(resolve => setTimeout(resolve, 500));

            targetDiv.innerHTML = html;
        } catch (err) {
            targetDiv.innerHTML = "<h2>Error</h2><p>Could not load the requested page.</p>";
            console.error(err);
        }
    }

    

    // Always ensure the requested page is visible
    showPage(pageId);
}

async function startLesson(lessonKey) {
    // 1. Load the "Template" HTML
    await loadPage('Lessons');

    // 2. Get the data from our mock database
    const lesson = lessonData[lessonKey];

    if (lesson) {
        // 3. Inject the data into our IDs
        document.getElementById('lesson-title').textContent = lesson.title;
        document.getElementById('lesson-video').src = lesson.videoUrl;
        document.getElementById('lesson-text').innerHTML = lesson.content;
    }
}

/**
 * 2. EVENT LISTENERS
 */

// Listen for standard navigation clicks (Pages 3, 4, 5)
const navButtons = document.querySelectorAll('.nav-link');
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const pageId = button.getAttribute('data-page');
        loadPage(pageId);
    });
});

// EVENT DELEGATION: Listen for form submission
document.body.addEventListener('submit', (e) => {
    if (e.target.id === 'login-form') {
        // Prevent the page from refreshing (the default browser behavior)
        e.preventDefault(); 
        
        // For now, we just grab the values to show we can
        const user = document.getElementById('username').value;
        console.log(`Attempting login for: ${user}`);

        handleLogin();
    }
});

/**
 * 3. APPLICATION LOGIC
 */

function handleLogin() {
    const usernameInput = document.getElementById('username').value;
    
    // Show the nav
    document.getElementById('main-nav').classList.remove('nav-hidden');
    
    // Load the Home page
    loadPage('Home').then(() => {
        // This part runs AFTER the Home page is fetched and placed in the div
        const displaySpan = document.getElementById('display-username');
        if (displaySpan) {
            displaySpan.textContent = usernameInput;
        }
    });
}

// Listen for the "I Understand" button click
document.body.addEventListener('click', (e) => {
    if (e.target.id === 'start-fraction-btn') {
        startLesson('intro-fractions');
    }
    if (e.target.id === 'start-decimal-btn') {
        startLesson('decimals-basics');
    }
    if (e.target.id === 'understand-btn') {
        markLessonComplete('Intro to Fractions');
    }
});

function markLessonComplete(lessonName) {
    alert(`Great job! ${lessonName} has been added to your completed list.`);
    
    // Eventually, this is where we will push to your 'lessonsDone' array 
    // and update your MongoDB. For now, let's just go back to the Home dashboard.
    loadPage('Home');
}

/**
 * 4. INITIALIZATION
 * When the script first loads, start at Page 1 (Login).
 */
loadPage('Login');