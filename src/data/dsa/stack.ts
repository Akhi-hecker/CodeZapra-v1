
import type { SectionInfo, Topic } from '../../types/dsa';

export const sectionInfo: SectionInfo = {
    title: 'Stack Data Structure',
    description: 'Master the Last-In-First-Out (LIFO) principle. Learn basic operations, implementation, and solving problems like balanced parentheses.',
    totalTopics: 5,
};

export const topics: Topic[] = [
    {
        id: 1,
        slug: 'stack-basics',
        title: 'Stack Introduction',
        concept: 'A Stack is a linear data structure that follows the LIFO (Last In, First Out) principle. The last element added is the first one to be removed. Think of a stack of plates.',
        video: {
            title: 'Stack Introduction',
            duration: '10 minutes',
            src: 'https://youtu.be/nz-2IfORpSg'
        },
        pdf: {
            filename: 'Stack_Introduction.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Stack/Stack Introduction.pdf',
            contents: ['Definition', 'LIFO Principle', 'Real-world Examples', 'Applications']
        },
        quiz: [
            {
                question: 'Which principle does a Stack follow?',
                options: ['FIFO', 'LIFO', 'Random', 'Sorted'],
                correct: 1,
            },
            {
                question: 'What is a real-world example of a Stack?',
                options: ['Queue at a ticket counter', 'Stack of books', 'Playlist of songs', 'Network packets'],
                correct: 1,
            },
            {
                question: 'Which operation removes the top element?',
                options: ['Push', 'Peek', 'Pop', 'Insert'],
                correct: 2,
            },
        ],
    },
    {
        id: 2,
        slug: 'stack-operations',
        title: 'Stack Operations',
        concept: 'The primary operations are Push (add to top), Pop (remove from top), Peek/Top (view top element), and isEmpty (check if empty). operations are typically O(1).',
        video: {
            title: 'Stack Operations',
            duration: '12 minutes',
            src: 'https://youtu.be/zFi_WpB6Tvo'
        },
        pdf: {
            filename: 'Stack_Operations.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Stack/Stack Operations.pdf',
            contents: ['Push', 'Pop', 'Peek', 'Complexity Analysis']
        },
        quiz: [
            {
                question: 'What is the time complexity of Push operation?',
                options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
                correct: 2,
            },
            {
                question: 'What happens if you Pop from an empty stack?',
                options: ['Returns null', 'Stack Underflow Error', 'Stack Overflow Error', 'Nothing happens'],
                correct: 1,
            },
            {
                question: 'Which operation helps to see the top element without removing it?',
                options: ['Pop', 'Push', 'Peek', 'Poll'],
                correct: 2,
            },
        ],
    },
    {
        id: 3,
        slug: 'stack-implementation',
        title: 'Stack Using Array',
        concept: 'Stacks can be implemented using arrays or linked lists. In an array implementation, we maintain a `top` pointer to track the index of the top element.',
        video: {
            title: 'Stack Using Array',
            duration: '15 minutes',
            src: 'https://youtu.be/A8yTAlaGi88'
        },
        pdf: {
            filename: 'Stack_Using_Array.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Stack/Stack Using Array.pdf',
            contents: ['Array vs Linked List', 'Code Walkthrough', 'Advantages', 'Disadvantages']
        },
        quiz: [
            {
                question: 'In an array implementation, what is the initial value of top?',
                options: ['0', '1', '-1', 'Array Length'],
                correct: 2,
            },
            {
                question: 'What condition indicates Stack Overflow in a fixed-size array?',
                options: ['top == -1', 'top == size - 1', 'top == 0', 'top == null'],
                correct: 1,
            },
            {
                question: 'Is dynamic array implementation of stack always O(1) for push?',
                options: ['Yes', 'No, amortized O(1)', 'No, usually O(n)', 'Yes, always'],
                correct: 1,
            },
        ],
    },
    {
        id: 4,
        slug: 'balanced-parentheses',
        title: 'Valid Parentheses',
        concept: 'A classic problem: Given a string containing `(`, `)`, `{`, `}`, `[`, `]`, determine if the brackets are balanced. We push opening brackets and pop matching closing brackets.',
        video: {
            title: 'Valid Parentheses',
            duration: '14 minutes',
            src: 'https://youtu.be/fv0XVNlFQvg'
        },
        pdf: {
            filename: 'Valid_Parentheses.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Stack/Valid Parentheses.pdf',
            contents: ['Problem Statement', 'Algorithm', 'Edge Cases', 'Complexity']
        },
        quiz: [
            {
                question: 'What do you do when you encounter an opening bracket?',
                options: ['Pop from stack', 'Push to stack', 'Ignore', 'Count it'],
                correct: 1,
            },
            {
                question: 'If the stack is not empty at the end, is the string balanced?',
                options: ['Yes', 'No', 'Depends on length', 'Maybe'],
                correct: 1,
            },
            {
                question: 'Which of these strings is valid?',
                options: ['([)]', '((]', '{[()]}', '}{'],
                correct: 2,
            },
        ],
    },
    {
        id: 5,
        slug: 'reverse-string',
        title: 'Reverse String Using Stack',
        concept: 'A simple application of using Stack to reverse a string. Since Stack follows LIFO, pushing all characters and then popping them results in reversal.',
        video: {
            title: 'Reverse String Using Stack',
            duration: '16 minutes',
            src: 'https://youtu.be/SgV4e3kgcCo'
        },
        pdf: {
            filename: 'Reverse_String_Using_Stack.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Stack/Reverse String Using Stack.pdf',
            contents: ['LIFO Property', 'Algorithm Steps', 'Complexity Analysis', 'Code Implementation']
        },
        quiz: [
            {
                question: 'Which property of Stack is used to reverse a string?',
                options: ['FIFO', 'LIFO', 'Random Access', 'Sorting'],
                correct: 1,
            },
            {
                question: 'What is the space complexity to reverse a string of length n using a stack?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
                correct: 1,
            },
            {
                question: 'After pushing "ABC" into stack, what is the order of popping?',
                options: ['ABC', 'BCA', 'CBA', 'CAB'],
                correct: 2,
            },
        ],
    },
];

