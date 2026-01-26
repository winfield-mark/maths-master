// public/user.js
export let currentUser = {
    username: "Student1",
    password: "password123", // In a real app, this would never be sent to the frontend
    email: "student@example.com",
    lessonsDone: [], // This now means "Tests Passed"
    tokens: { received: 0, used: 0 },
    gameState: { /* ... */ }
};

export function markAsComplete(lessonId) {
    if (!currentUser.lessonsDone.includes(lessonId)) {
        currentUser.lessonsDone.push(lessonId);
    }
}