// public/curriculum.js
export const curriculum = [
    {
        lessonId: "number-13",
        strand: "number",
        title: "Introduction to Fractions",
        difficulty: 1,
        prerequisites: [],
        tokensReward: 50,
        media: {
            youtubeId: "n0FZhQ_GkKw",
            keyFormula: "$$\\frac{a}{b}$$"
        },
        content: "<h3>Numerator and Denominator</h3><p>In this lesson, we look at $\\frac{1}{2}$ and other basics...</p>"
    },
    {
        lessonId: "number-14",
        strand: "number",
        title: "Mastering Decimals",
        difficulty: 1,
        prerequisites: ["number-13"],
        tokensReward: 50,
        media: {
            youtubeId: "n0FZhQ_GkKw", // Using working link for now
            keyFormula: "$$0.1 = \\frac{1}{10}$$"
        },
        content: "<p>Decimals are another way of writing fractions whose denominators are powers of ten.</p>"
    }
];