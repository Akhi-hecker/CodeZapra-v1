// Logic-First Coding Interface - Question Data
// Completely isolated from existing coding system

export interface LogicCodeQuestion {
    id: string;
    title: string;
    description: string;
    hints: string[];
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    expectedApproach: string; // Used by Gemini for validation context
}

export const logicCodeQuestions: LogicCodeQuestion[] = [
    {
        id: 'find-maximum',
        title: 'Find the Maximum Element',
        description: `Given an array of integers, find and return the maximum element in the array.

The array will always contain at least one element. You cannot use any built-in max functions.

Example:
Input: [3, 7, 2, 9, 1]
Output: 9`,
        hints: [
            'Think about how you would find the tallest person in a line',
            'You need to remember something as you go through the array',
            'Compare each element with what you have stored'
        ],
        difficulty: 'easy',
        category: 'Arrays',
        expectedApproach: 'Linear scan with tracking variable for maximum seen so far'
    },
    {
        id: 'reverse-string',
        title: 'Reverse a String',
        description: `Given a string, return it reversed.

You should not use any built-in reverse functions.

Example:
Input: "hello"
Output: "olleh"`,
        hints: [
            'Think about the relationship between first and last characters',
            'You could build a new string or swap in place',
            'Two pointers moving toward each other can help'
        ],
        difficulty: 'easy',
        category: 'Strings',
        expectedApproach: 'Two-pointer swap or iterative backward traversal'
    },
    {
        id: 'two-sum',
        title: 'Two Sum',
        description: `Given an array of integers and a target sum, find two numbers that add up to the target.

Return the indices of the two numbers. You may assume exactly one solution exists.

Example:
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1] (because nums[0] + nums[1] = 2 + 7 = 9)`,
        hints: [
            'For each number, what would its pair need to be?',
            'How can you quickly check if a number exists?',
            'A hash map can store values you have seen'
        ],
        difficulty: 'medium',
        category: 'Arrays',
        expectedApproach: 'Hash map to store complement values for O(n) lookup'
    },
    {
        id: 'palindrome-check',
        title: 'Check Palindrome',
        description: `Determine if a given string is a palindrome.

A palindrome reads the same forwards and backwards. Ignore case and non-alphanumeric characters.

Example:
Input: "A man, a plan, a canal: Panama"
Output: true`,
        hints: [
            'What makes a word read the same both ways?',
            'Compare characters from both ends',
            'Skip characters that are not letters or numbers'
        ],
        difficulty: 'easy',
        category: 'Strings',
        expectedApproach: 'Two pointers comparing from both ends, skipping non-alphanumeric'
    },
    {
        id: 'fibonacci-sequence',
        title: 'Fibonacci Number',
        description: `Calculate the nth Fibonacci number.

The Fibonacci sequence is: 0, 1, 1, 2, 3, 5, 8, 13, ...
Each number is the sum of the two preceding ones.

Example:
Input: n = 6
Output: 8 (sequence: 0, 1, 1, 2, 3, 5, 8)`,
        hints: [
            'Each number depends on the previous two',
            'You only need to remember the last two values',
            'Think iteratively rather than recursively for efficiency'
        ],
        difficulty: 'easy',
        category: 'Math',
        expectedApproach: 'Iterative calculation storing only previous two values'
    }
];

// Get a question by ID
export const getQuestionById = (id: string): LogicCodeQuestion | undefined => {
    return logicCodeQuestions.find(q => q.id === id);
};

// Get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): LogicCodeQuestion[] => {
    return logicCodeQuestions.filter(q => q.difficulty === difficulty);
};
