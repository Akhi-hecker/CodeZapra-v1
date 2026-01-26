
import type { SectionInfo, Topic } from '../../types/dsa';

export const sectionInfo: SectionInfo = {
    title: 'Recursion',
    description: 'Understand the power of functions calling themselves. Master base cases, recursive steps, and the call stack.',
    totalTopics: 5,
};

export const topics: Topic[] = [
    {
        id: 1,
        slug: 'recursion-basics',
        title: 'Introduction to Recursion',
        concept: 'Recursion is a programming technique where a function calls itself to solve a problem. It solves a problem by breaking it down into smaller, self-similar subproblems.',
        video: {
            title: 'Introduction to Recursion',
            duration: '10 minutes',
            src: 'https://youtu.be/yctdlOdVCrU'
        },
        pdf: {
            filename: 'Introduction_to_Recursion.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Recursion/Introduction to Recursion.pdf',
            contents: ['Definition', 'Real World Examples', 'Functions', 'Logic Flow']
        },
        quiz: [
            {
                question: 'What is Recursion?',
                options: ['A function looping indefinitely', 'A function calling itself', 'A compiled function', 'A function with two names'],
                correct: 1,
            },
            {
                question: 'Recursion is similar to which iterative structure?',
                options: ['If-Else', 'Switch Case', 'Loops (For/While)', 'Variables'],
                correct: 2,
            },
            {
                question: 'What happens if recursion never stops?',
                options: ['It crashes the computer', 'Stack Overflow Error', 'It returns 0', 'It runs in background'],
                correct: 1,
            },
        ],
    },
    {
        id: 2,
        slug: 'base-recursive-case',
        title: 'Base Case & Recursive Case',
        concept: 'Every valid recursive function must have two parts: 1) The Base Case: a condition to stop recursion. 2) The Recursive Case: the part where the function calls itself with modified arguments moving towards the base case.',
        video: {
            title: 'Base Case & Recursive Case',
            duration: '12 minutes',
            src: 'https://youtu.be/6zJR6IgDcmU'
        },
        pdf: {
            filename: 'Base_Case_and_Recursive_Case.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Recursion/Base Case & Recursive Case.pdf',
            contents: ['Anatomy of Recursion', 'Infinite Recursion', 'Designing Base Cases', 'Trace']
        },
        quiz: [
            {
                question: 'What is the purpose of the Base Case?',
                options: ['To speed up code', 'To terminate the recursion', 'To call the function again', 'To allocate memory'],
                correct: 1,
            },
            {
                question: 'If the recursive step does not move toward the base case, what happens?',
                options: ['Infinite Loop / Stack Overflow', 'Correct Answer', 'Compilation Error', 'Nothing'],
                correct: 0,
            },
            {
                question: 'A recursive function can have how many base cases?',
                options: ['Only one', 'At least one', 'Exactly two', 'None'],
                correct: 1,
            },
        ],
    },
    {
        id: 3,
        slug: 'factorial',
        title: 'Factorial Using Recursion',
        concept: 'The factorial of n (n!) is the product of all positive integers less than or equal to n. Recursive formula: n! = n * (n-1)!. Base case: 0! = 1.',
        video: {
            title: 'Factorial Using Recursion',
            duration: '8 minutes',
            src: 'https://youtu.be/LIPSTu_VnVA'
        },
        pdf: {
            filename: 'Factorial_Using_Recursion.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Recursion/Factorial Using Recursion.pdf',
            contents: ['Formula', 'Dry Run', 'Time Complexity', 'Iterative vs Recursive']
        },
        quiz: [
            {
                question: 'What is the base case for factorial?',
                options: ['n = 100', 'n = 0 or n = 1', 'n = -1', 'n = 2'],
                correct: 1,
            },
            {
                question: 'What is the recurrence relation for factorial(n)?',
                options: ['n + f(n-1)', 'n * f(n-1)', 'f(n-1) / n', 'f(n-2)'],
                correct: 1,
            },
            {
                question: 'What is 4! ?',
                options: ['10', '12', '24', '16'],
                correct: 2,
            },
        ],
    },
    {
        id: 4,
        slug: 'fibonacci',
        title: 'Fibonacci Using Recursion',
        concept: 'The Fibonacci sequence is where each number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8... Formula: Fib(n) = Fib(n-1) + Fib(n-2). Base cases: Fib(0)=0, Fib(1)=1.',
        video: {
            title: 'Fibonacci Using Recursion',
            duration: '14 minutes',
            src: 'https://youtu.be/bxpxLKCyhLY'
        },
        pdf: {
            filename: 'Fibonacci_Using_Recursion.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Recursion/Fibonacci Using Recursion.pdf',
            contents: ['Sequence Definition', 'Recursion Tree', 'Exponential Time', 'Optimization Hint']
        },
        quiz: [
            {
                question: 'How many recursive calls does Fib(n) make initially directly?',
                options: ['1', '2', 'n', '0'],
                correct: 1,
            },
            {
                question: 'What is the time complexity of naive recursive Fibonacci?',
                options: ['O(n)', 'O(n^2)', 'O(2^n)', 'O(log n)'],
                correct: 2,
            },
            {
                question: 'What is Fib(5)?',
                options: ['3', '5', '8', '13'],
                correct: 1,
            },
        ],
    },
    {
        id: 5,
        slug: 'recursion-tree',
        title: 'Recursion Tree',
        concept: 'A Recursion Tree is a visual representation of the recursive calls made by a function. It helps in understanding the flow of execution and calculating time complexity by summing work at each level.',
        video: {
            title: 'Recursion Tree',
            duration: '11 minutes',
            src: 'https://youtu.be/gY1ONwnfcwI'
        },
        pdf: {
            filename: 'Recursion_Tree.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Recursion/Recursion Tree.pdf',
            contents: ['Visualization', 'Depth and Breadth', 'Complexity Analysis', 'Examples']
        },
        quiz: [
            {
                question: 'What does each node in a Recursion Tree represent?',
                options: ['A variable', 'A function call', 'A loop iteration', 'A return value'],
                correct: 1,
            },
            {
                question: 'For Fibonacci, how does the Recursion Tree grow?',
                options: ['Linearly', 'Logarithmically', 'Exponentially', 'Constant'],
                correct: 2,
            },
            {
                question: 'Why uses Recursion Trees?',
                options: ['To debug logic', 'To analyze complexity', 'To visualize flow', 'All of the above'],
                correct: 3,
            },
        ],
    },
];

