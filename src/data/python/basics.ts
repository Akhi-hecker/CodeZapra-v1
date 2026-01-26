
import type { SectionInfo, Topic, CodingQuestionData } from '../../types/dsa';

export const sectionInfo: SectionInfo = {
    title: 'Python Basics',
    description: 'This section introduces the foundational concepts of Python programming. Learners must complete topics sequentially before accessing coding problems.',
    totalTopics: 5,
};

export const topics: Topic[] = [
    {
        id: 1,
        slug: 'intro-python',
        title: 'Introduction to Python',
        concept: `Python is a high-level, interpreted programming language designed for simplicity and readability. It allows programmers to focus on problem-solving instead of complex syntax. Python executes code line by line, making debugging easier.\n\nIt is widely used in automation, web development, data science, cybersecurity, and artificial intelligence. Python's clean syntax and extensive library support make it an ideal first language for beginners.`,
        video: {
            title: 'Introduction to Python Programming',
            duration: '8–10 minutes',
            src: '/dev_uploaded/Introduction_to_Python.mp4',
        },
        pdf: {
            filename: 'Introduction_to_Python.pdf',
            src: '/dev_uploaded/Introduction_to_Python.pdf',
            contents: ['Definition of Python', 'Interpreted vs compiled languages', 'Use cases of Python', 'Advantages of Python'],
        },
        quiz: [
            {
                question: 'Python is best described as a:',
                options: ['Low-level language', 'High-level language', 'Machine language', 'Assembly language'],
                correct: 1,
            },
            {
                question: 'Python executes programs:',
                options: ['All at once', 'After compilation only', 'Line by line', 'Inside hardware'],
                correct: 2,
            },
            {
                question: 'Which of the following is a common use of Python?',
                options: ['Mobile hardware design', 'Web development', 'BIOS programming', 'Circuit simulation'],
                correct: 1,
            },
        ],
    },
    {
        id: 2,
        slug: 'variables-datatypes',
        title: 'Variables and Data Types',
        concept: `Variables are used to store data in memory. Python automatically determines the data type based on the value assigned. This is known as dynamic typing.\n\nCommon data types include integers (whole numbers), floats (decimal numbers), strings (text), and booleans (True/False). Understanding these types is essential for writing effective Python programs.`,
        video: {
            title: 'Variables and Data Types in Python',
            duration: '10–12 minutes',
            src: '/dev_uploaded/variables_and_datatypes.mp4',
        },
        pdf: {
            filename: 'Variables_and_Data_Types.pdf',
            src: '/dev_uploaded/variables_and_datatypes.pdf',
            contents: ['Variable naming rules', 'Integer, float, string, boolean', 'Dynamic typing explained', 'Examples and memory concept'],
        },
        quiz: [
            {
                question: 'Python decides the data type of a variable:',
                options: ['At compile time', 'Manually by the programmer', 'Based on the assigned value', 'Using keywords'],
                correct: 2,
            },
            {
                question: 'Which data type is used to store text?',
                options: ['int', 'float', 'str', 'bool'],
                correct: 2,
            },
            {
                question: 'Dynamic typing means:',
                options: ['Variables cannot change', 'Data types are fixed', 'Python assigns types automatically', 'Variables need type declaration'],
                correct: 2,
            },
        ],
    },
    {
        id: 3,
        slug: 'operators-expressions',
        title: 'Operators and Expressions',
        concept: `Operators perform operations on values or variables. Expressions are combinations of values and operators that produce a result.\n\nPython supports arithmetic operators (+, -, *, /), comparison operators (==, !=, <, >), and logical operators (and, or, not). Understanding operator precedence is crucial for writing correct expressions.`,
        video: {
            title: 'Operators and Expressions in Python',
            duration: '10 minutes',
            src: '/dev_uploaded/operators_and_expressions.mp4',
        },
        pdf: {
            filename: 'Operators_and_Expressions.pdf',
            src: '/dev_uploaded/operators_and_expressions.pdf',
            contents: ['Operator categories', 'Expression examples', 'Order of operations', 'Common mistakes'],
        },
        quiz: [
            {
                question: 'Which operator is used for comparison?',
                options: ['+', '*', '==', '/'],
                correct: 2,
            },
            {
                question: 'An expression always:',
                options: ['Stores data', 'Produces a result', 'Takes input', 'Prints output'],
                correct: 1,
            },
            {
                question: 'Logical operators are mainly used for:',
                options: ['Calculations', 'String formatting', 'Decision making', 'File handling'],
                correct: 2,
            },
        ],
    },
    {
        id: 4,
        slug: 'strings-basics',
        title: 'Working with Strings',
        concept: `Strings represent text data in Python. They are sequences of characters and are immutable, meaning they cannot be changed once created.\n\nStrings support indexing (accessing individual characters), slicing (extracting substrings), and various methods like upper(), lower(), split(), and join(). They are enclosed in single or double quotes.`,
        video: {
            title: 'Strings in Python',
            duration: '9–11 minutes',
            src: '/dev_uploaded/working_with_strings.mp4',
        },
        pdf: {
            filename: 'Working_with_Strings.pdf',
            src: '/dev_uploaded/working_with_strings.pdf',
            contents: ['String creation', 'Indexing and slicing', 'Immutability explained', 'String operations'],
        },
        quiz: [
            {
                question: 'Strings in Python are:',
                options: ['Mutable', 'Immutable', 'Numeric', 'Dynamic'],
                correct: 1,
            },
            {
                question: 'Each character in a string has:',
                options: ['A memory address only', 'A fixed value', 'An index position', 'No order'],
                correct: 2,
            },
            {
                question: 'Which of the following represents text?',
                options: ['10', '3.14', '"Python"', 'True'],
                correct: 2,
            },
        ],
    },
    {
        id: 5,
        slug: 'input-output',
        title: 'Input and Output',
        concept: `Input allows users to provide data to a program, while output displays information back to the user. The input() function receives user input, and print() displays output.\n\nAll input in Python is initially received as a string and must be converted using int() or float() when performing calculations. Proper formatting makes output clear and professional.`,
        video: {
            title: 'Input and Output in Python',
            duration: '8–10 minutes',
            src: '/dev_uploaded/input_and_ouput.mp4',
        },
        pdf: {
            filename: 'Input_and_Output.pdf',
            src: '/dev_uploaded/input_and_ouput.pdf',
            contents: ['Input function', 'Output formatting', 'Type conversion basics', 'Common errors'],
        },
        quiz: [
            {
                question: 'User input in Python is received as:',
                options: ['int', 'float', 'string', 'boolean'],
                correct: 2,
            },
            {
                question: 'Output in Python is used to:',
                options: ['Store data', 'Take input', 'Display results', 'Compile code'],
                correct: 2,
            },
            {
                question: 'Why is type conversion needed?',
                options: ['To store text', 'To change memory', 'To perform calculations', 'To exit the program'],
                correct: 2,
            },
        ],
    },
];

export const codingQuestions: CodingQuestionData[] = [
    {
        id: 1,
        title: 'Even or Odd Checker',
        description: 'Write a Python program to check whether a number is even or odd.',
        hint: 'Think about what mathematical operation helps you determine if a number is divisible by 2.',
        expectedLogicKeywords: ['modulo', 'remainder', 'divide', '%', '2', 'check', 'if', 'condition', 'even', 'odd'],
        minLogicSentences: 3,
        starterCode: '# Write your code here\n\n',
        testCases: [
            { input: '4', expectedOutput: 'Even', description: 'Test with even number 4' },
            { input: '7', expectedOutput: 'Odd', description: 'Test with odd number 7' },
            { input: '0', expectedOutput: 'Even', description: 'Test with zero' },
        ],
    },
    {
        id: 2,
        title: 'Sum of Two Numbers',
        description: 'Write a Python program that takes two numbers as input and prints their sum.',
        hint: 'Think about how you would take multiple inputs and store them, then perform addition.',
        expectedLogicKeywords: ['input', 'two', 'numbers', 'add', 'sum', 'store', 'variable', 'print', 'result'],
        minLogicSentences: 3,
        starterCode: '# Write your code here\n\n',
        testCases: [
            { input: '5\n3', expectedOutput: '8', description: 'Sum of 5 and 3' },
            { input: '10\n20', expectedOutput: '30', description: 'Sum of 10 and 20' },
            { input: '-5\n5', expectedOutput: '0', description: 'Sum of negative and positive' },
        ],
    },
    {
        id: 3,
        title: 'Find the Larger Number',
        description: 'Write a Python program that takes two numbers and prints which one is larger. If they are equal, print "Equal".',
        hint: 'Think about using comparison operators and handling three possible cases.',
        expectedLogicKeywords: ['compare', 'larger', 'greater', 'if', 'else', 'condition', 'equal', 'two', 'numbers'],
        minLogicSentences: 3,
        starterCode: '# Write your code here\n\n',
        testCases: [
            { input: '10\n5', expectedOutput: '10', description: '10 is larger than 5' },
            { input: '3\n8', expectedOutput: '8', description: '8 is larger than 3' },
            { input: '5\n5', expectedOutput: 'Equal', description: 'Both numbers are equal' },
        ],
    },
];
