export const testData = {
    testId: "n20",
    config: {
        questionsToAsk: 10,
        minToPass: 9
    },
    questions: [
        // 9+ Pairs
        { type: "multiple-choice", q: "Unit after adding 9 to 2?", options: ["1", "2", "3", "0"], correctIndex: 0 },
        { type: "multiple-choice", q: "Unit after adding 9 to 3?", options: ["1", "3", "2", "4"], correctIndex: 2 },
        { type: "multiple-choice", q: "Unit after adding 9 to 4?", options: ["2", "5", "4", "3"], correctIndex: 3 },
        { type: "multiple-choice", q: "Unit after adding 9 to 5?", options: ["4", "5", "6", "3"], correctIndex: 0 },
        { type: "multiple-choice", q: "Unit after adding 9 to 6?", options: ["4", "5", "6", "7"], correctIndex: 1 },
        { type: "multiple-choice", q: "Unit after adding 9 to 7?", options: ["5", "6", "7", "8"], correctIndex: 1 },
        { type: "multiple-choice", q: "Unit after adding 9 to 8?", options: ["6", "7", "8", "9"], correctIndex: 1 },
        { type: "multiple-choice", q: "Unit after adding 9 to 9?", options: ["6", "7", "8", "9"], correctIndex: 2 },

        // 8+ Pairs
        { type: "multiple-choice", q: "Unit after adding 8 to 3?", options: ["3", "2", "1", "4"], correctIndex: 2 },
        { type: "multiple-choice", q: "Unit after adding 8 to 4?", options: ["1", "2", "3", "4"], correctIndex: 1 },
        { type: "multiple-choice", q: "Unit after adding 8 to 5?", options: ["3", "6", "4", "5"], correctIndex: 0 },
        { type: "multiple-choice", q: "Unit after adding 8 to 6?", options: ["3", "4", "5", "6"], correctIndex: 1 },
        { type: "multiple-choice", q: "Unit after adding 8 to 7?", options: ["4", "7", "6", "5"], correctIndex: 3 },
        { type: "multiple-choice", q: "Unit after adding 8 to 8?", options: ["4", "5", "6", "7"], correctIndex: 2 },
        { type: "multiple-choice", q: "Unit after adding 8 to 9?", options: ["4", "5", "6", "7"], correctIndex: 2 },

        // 7+ and 6+ Pairs
        { type: "multiple-choice", q: "Unit after adding 7 to 4?", options: ["3", "2", "1", "0"], correctIndex: 2 },
        { type: "multiple-choice", q: "Unit after adding 7 to 5?", options: ["1", "2", "3", "4"], correctIndex: 1 },
        { type: "multiple-choice", q: "Unit after adding 7 to 6?", options: ["1", "2", "3", "5"], correctIndex: 2 },
        { type: "multiple-choice", q: "Unit after adding 7 to 7?", options: ["4", "5", "6", "7"], correctIndex: 0 },
        { type: "multiple-choice", q: "Unit after adding 7 to 8?", options: ["3", "4", "5", "6"], correctIndex: 2 },
        { type: "multiple-choice", q: "Unit after adding 7 to 9?", options: ["6", "7", "8", "9"], correctIndex: 0 },
    ]
};