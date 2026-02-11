// public/curriculum.js
export const curriculum = [
    {
    "lessonId": "n10",
    "strand": "number",
    "title": "Number Bonds to 10 (A)",
    "difficulty": 1,
    "prerequisites": [],
    "tokensReward": 10,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/number-bonds-a.pdf" },
    "content": "Identify pairs of numbers that sum exactly to 10 without remainders."
  },
  {
    "lessonId": "n20",
    "strand": "number",
    "title": "Number Bonds to 10 (B)",
    "difficulty": 1,
    "prerequisites": ["n10"],
    "tokensReward": 12,
    "media": { "videoFile": "Videos/unit_after_addition.webm", "pdfLink": "Pdfs/bridging-ten.pdf" },
    "content": "Learn the 'bridging through ten' strategy to add numbers exceeding 10."
  },
  {
    "lessonId": "n30",
    "strand": "number",
    "title": "Adding single digit numbers mentally",
    "difficulty": 1,
    "prerequisites": ["n20"],
    "tokensReward": 12,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/mental-addition-1.pdf" },
    "content": "Mentally add a single digit to a two-digit number using bridging."
  },
  {
    "lessonId": "n40",
    "strand": "number",
    "title": "Adding 3 digit numbers using pencil and paper",
    "difficulty": 2,
    "prerequisites": ["n30"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/column-addition.pdf" },
    "content": "Master column addition for adding multi-digit numbers."
  },
  {
    "lessonId": "n50",
    "strand": "number",
    "title": "Subtracting 2 and 3 digit numbers, method 1",
    "difficulty": 2,
    "prerequisites": ["n40"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/subtraction-partitioning.pdf" },
    "content": "Subtract numbers by rewriting and partitioning the larger value."
  },
  {
    "lessonId": "n60",
    "strand": "number",
    "title": "Subtracting 2 and 3 digit numbers, method 2",
    "difficulty": 2,
    "prerequisites": ["n40"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/subtraction-equal-addition.pdf" },
    "content": "Subtract numbers by adding a constant to both values to simplify."
  },
  {
    "lessonId": "n63",
    "strand": "number",
    "title": "Multiplying by 10, 100, and 1000",
    "difficulty": 1,
    "prerequisites": ["n30"],
    "tokensReward": 10,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/multiplying-by-10-100-1000.pdf" },
    "content": "Multiply numbers by powers of 10 using place value understanding."
  },
  {
    "lessonId": "n66",
    "strand": "number",
    "title": "Dividing by 10, 100, and 1000",
    "difficulty": 1,
    "prerequisites": ["n30"],
    "tokensReward": 10,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/dividing-by-10-100-1000.pdf" },
    "content": "Divide numbers by powers of 10 using place value understanding."
  },
  {
    "lessonId": "n70",
    "strand": "number",
    "title": "Long Multiplication",
    "difficulty": 2,
    "prerequisites": ["n40"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/long-multiplication.pdf" },
    "content": "Standard method for multiplying 2-digit by 3-digit numbers."
  },
  {
    "lessonId": "n80",
    "strand": "number",
    "title": "Lattice Multiplication",
    "difficulty": 2,
    "prerequisites": ["n70"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/lattice-multiplication.pdf" },
    "content": "A visual grid approach to solving complex multiplication problems."
  },
  {
    "lessonId": "n90",
    "strand": "number",
    "title": "Pencil and Paper Division",
    "difficulty": 3,
    "prerequisites": ["n50"],
    "tokensReward": 20,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/division-methods.pdf" },
    "content": "Master dividing integers with and without remainders."
  },
  {
    "lessonId": "n100",
    "strand": "number",
    "title": "Order of Operations",
    "difficulty": 2,
    "prerequisites": ["n90"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/order-of-operations.pdf" },
    "content": "Learn the rules for solving multi-step calculations correctly."
  },
  {
    "lessonId": "n110",
    "strand": "number",
    "title": "Directed Numbers: Addition and Subtraction",
    "difficulty": 2,
    "prerequisites": ["n90"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/negatives-add-sub.pdf" },
    "content": "Working with negative numbers on a number line."
  },
  {
    "lessonId": "n120",
    "strand": "number",
    "title": "Directed Numbers: Multiplication and Division",
    "difficulty": 2,
    "prerequisites": ["n90"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/negatives-mult-div.pdf" },
    "content": "Apply sign rules to multiply and divide negative integers."
  },
  {
    "lessonId": "n130",
    "strand": "number",
    "title": "Introduction to Fractions",
    "difficulty": 1,
    "prerequisites": ["n80"],
    "tokensReward": 10,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/fractions-intro.pdf" },
    "content": "Understand fractions as parts of a whole."
  },
  {
    "lessonId": "n140",
    "strand": "number",
    "title": "Equivalent Fractions",
    "difficulty": 1,
    "prerequisites": ["n80"],
    "tokensReward": 10,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/equivalent-fractions.pdf" },
    "content": "Simplify and expand fractions using common factors."
  },
  {
    "lessonId": "n145",
    "strand": "number",
    "title": "Adding and Subtracting Fractions with Common Denominators",
    "difficulty": 1,
    "prerequisites": ["n140"],
    "tokensReward": 10,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/fractions-arithmetic-with-common-denominators.pdf" },
    "content": "Add and subtract fractions with the same denominator."
  },
  {
    "lessonId": "n150",
    "strand": "number",
    "title": "Adding and Subtracting Fractions",
    "difficulty": 2,
    "prerequisites": ["n145"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/fractions-arithmetic.pdf" },
    "content": "Use common denominators to add and subtract fractions."
  },
  {
    "lessonId": "a10",
    "strand": "algebra",
    "title": "Introduction to Variables",
    "difficulty": 1,
    "prerequisites": ["n100"],
    "tokensReward": 10,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/intro-variables.pdf" },
    "content": "Using letters to represent unknown or general numbers."
  },
  {
    "lessonId": "a20",
    "strand": "algebra",
    "title": "Algebraic Notation",
    "difficulty": 1,
    "prerequisites": ["a10"],
    "tokensReward": 10,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/algebraic-notation.pdf" },
    "content": "Standard shorthand for multiplication and division in algebra."
  },
  {
    "lessonId": "a30",
    "strand": "algebra",
    "title": "Algebraic Substitution",
    "difficulty": 2,
    "prerequisites": ["a20"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/substitution.pdf" },
    "content": "Evaluate expressions by replacing variables with numbers."
  },
  {
    "lessonId": "a40",
    "strand": "algebra",
    "title": "Linear Equations type 1",
    "difficulty": 1,
    "prerequisites": ["a30"],
    "tokensReward": 10,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/one-step-equations-1.pdf" },
    "content": "Splitting a variable by division."
  },
  {
    "lessonId": "a50",
    "strand": "algebra",
    "title": "Linear Equations type 2",
    "difficulty": 2,
    "prerequisites": ["a40"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/one-step-equations-2.pdf" },
    "content": "Changing equations of the type $ax + b = c$ into type 1 by rearranging."
  },
  {
    "lessonId": "a60",
    "strand": "algebra",
    "title": "Linear Equations type 3",
    "difficulty": 3,
    "prerequisites": ["a50"],
    "tokensReward": 20,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/one-step-equations-3.pdf" },
    "content": "Changing equations of the type $ax + b = cx + d$ into type 2 by rearranging."
  },
  {
    "lessonId": "a70",
    "strand": "algebra",
    "title": "Linear Equations type 4",
    "difficulty": 3,
    "prerequisites": ["a50"],
    "tokensReward": 20,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/one-step-equations-4.pdf" },
    "content": "Changing equations of the type $a(bx + c) = d$ into type 2 by rearranging."
  },
  {
    "lessonId": "a80",
    "strand": "algebra",
    "title": "Linear Equations type 5",
    "difficulty": 4,
    "prerequisites": ["a50"],
    "tokensReward": 25,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/one-step-equations-5.pdf" },
    "content": "Changing equations of the type $\\frac{ax + b}{c} = d$ into type 2 by rearranging."
  },
  {
    "lessonId": "a90",
    "strand": "algebra",
    "title": "Linear Equations type 6",
    "difficulty": 5,
    "prerequisites": ["a70"],
    "tokensReward": 30,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/one-step-equations-6.pdf" },
    "content": "Changing equations of the type $\\frac{ax + b}{c} = \\frac{dx + e}{f}$ into type 4 by rearranging."
  },
  {
    "lessonId": "a100",
    "strand": "algebra",
    "title": "Rearranging Simple Equations",
    "difficulty": 5,
    "prerequisites": ["a80"],
    "tokensReward": 30,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/rearranging-equations.pdf" },
    "content": "Learn how to change the subject of a formula."
  },
  {
    "lessonId": "a110",
    "strand": "algebra",
    "title": "Linear Sequences",
    "difficulty": 2,
    "prerequisites": ["a30"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/linear-sequences.pdf" },
    "content": "Recognize and describe patterns in arithmetic sequences."
  },
  {
    "lessonId": "a120",
    "strand": "algebra",
    "title": "Finding the nth Term",
    "difficulty": 3,
    "prerequisites": ["a110"],
    "tokensReward": 20,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/nth-term.pdf" },
    "content": "Create algebraic formulas for any term in a sequence."
  },
  {
    "lessonId": "m10",
    "strand": "measurement",
    "title": "Units of Measurement",
    "difficulty": 1,
    "prerequisites": ["n66"],
    "tokensReward": 10,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/metric-units.pdf" },
    "content": "Convert between metric units for length and mass."
  },
  {
    "lessonId": "m20",
    "strand": "measurement",
    "title": "Perimeter via Substitution",
    "difficulty": 2,
    "prerequisites": ["a30"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/perimeter-algebra.pdf" },
    "content": "Calculate the boundary of shapes using algebraic formulas."
  },
  {
    "lessonId": "m30",
    "strand": "measurement",
    "title": "Area of Rectangles",
    "difficulty": 2,
    "prerequisites": ["a30"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/area-rectangles.pdf" },
    "content": "Apply the area formula for 2D rectangular shapes."
  },
  {
    "lessonId": "m40",
    "strand": "measurement",
    "title": "Area of Triangles",
    "difficulty": 2,
    "prerequisites": ["m30"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/area-triangles.pdf" },
    "content": "Derive and use the formula for the area of a triangle."
  },
  {
    "lessonId": "g10",
    "strand": "geometry",
    "title": "Coordinates in the First Quadrant",
    "difficulty": 1,
    "prerequisites": ["n180"],
    "tokensReward": 10,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/coordinates-first-quadrant.pdf" },
    "content": "Plot and identify points using positive coordinates only."
  },
  {
    "lessonId": "g20",
    "strand": "geometry",
    "title": "Coordinates in Four Quadrants",
    "difficulty": 2,
    "prerequisites": ["n180"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/coordinates-4-quadrants.pdf" },
    "content": "Plot and identify points using positive and negative coordinates."
  },
  {
    "lessonId": "s10",
    "strand": "statistics",
    "title": "Mean, Median, and Mode",
    "difficulty": 2,
    "prerequisites": ["n66"],
    "tokensReward": 15,
    "media": { "videoFile": "Videos/bonds_to_10a.webm", "pdfLink": "Pdfs/averages.pdf" },
    "content": "Calculate the three main types of statistical averages."
  }
];