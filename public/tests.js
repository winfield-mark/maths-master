// public/tests.js
export const tests = [
    {
        testId: "n10", // Maps to Introduction to Fractions
        config: {
            questionsToAsk: 2, // Number of questions drawn from the pool
            minToPass: 2       // Passing threshold
        },
        questions: [
            {
                q: "In the fraction $\\frac{3}{4}$, what is the number 4 called?",
                options: ["Numerator", "Denominator", "Integer", "Decimal"],
                correctIndex: 1
            },
            {
                q: "Which of these represents a 'half'?",
                options: ["$\\frac{1}{4}$", "$\\frac{1}{3}$", "$\\frac{1}{2}$", "$\\frac{1}{1}$"],
                correctIndex: 2
            },
            {
                q: "If a whole cake is cut into 8 slices, what is the denominator?",
                options: ["1", "4", "8", "10"],
                correctIndex: 2
            }
        ]
    },
    {
        testId: "n20", // Maps to Mastering Decimals
        config: {
            questionsToAsk: 2,
            minToPass: 1
        },
        questions: [
            {
                q: "What is $0.5$ written as a fraction?",
                options: ["$\\frac{1}{5}$", "$\\frac{1}{2}$", "$\\frac{5}{1}$", "$\\frac{1}{10}$"],
                correctIndex: 1
            },
            {
                q: "In the number $12.34$, which digit is in the 'tenths' column?",
                options: ["1", "2", "3", "4"],
                correctIndex: 2
            }
        ]
    }
];