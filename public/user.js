// public/user.js

export let currentUser = {
    username: "Student1",
    password: "password123",
    email: "student@example.com",
    lessonsDone: [], 
    tokens: 0, 
    gameState: {
        level: 1,
        lastPlayed: new Date().toISOString().split('T')[0],
        pads: [],
        characters: []
    }
};

export function markAsComplete(lessonId) {
    if (!currentUser.lessonsDone.includes(lessonId)) {
        currentUser.lessonsDone.push(lessonId);
    }
}

/**
 * Sends the current state of currentUser to the server.
 * Moved here to prevent circular dependencies between script.js and testEngine.js
 */
export async function saveUserData() {
    console.log("Saving progress for:", currentUser.username);
    try {
        const response = await fetch('/api/save-progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentUser)
        });
        const data = await response.json();
        if (data.success) {
            console.log("File updated successfully on server.");
        } else {
            console.error("Server refused save:", data.message);
        }
    } catch (err) {
        console.error("Network error: Could not reach server to save.");
    }
}