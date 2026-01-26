
import type { SectionInfo, Topic } from '../../types/dsa';

export const sectionInfo: SectionInfo = {
    title: 'Strings Data Structure',
    description: 'Master string manipulation, a critical skill for coding interviews. Learn about immutability, common patterns, and efficient algorithms.',
    totalTopics: 5,
};

export const topics: Topic[] = [
    {
        id: 1,
        slug: 'intro-strings',
        title: 'Introduction to Strings',
        concept: `A string is a sequence of characters. In many languages (like Python and Java), strings are immutable, meaning they cannot be changed after creation.

**Key Characteristics:**
- Sequence of characters (can be accessed index-wise)
- Immutable (in many high-level languages)
- Variable length
- Stored as an array of characters in memory (usually)`,
        video: {
            title: 'Introduction to Strings',
            duration: '8–10 minutes',
            src: 'https://youtu.be/oTQZcIXHYlU',
        },
        pdf: {
            filename: 'Introduction_to_Strings.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Strings/Introduction to Strings.pdf',
            contents: ['Definition', 'Memory Representation', 'ASCII vs Unicode', 'Immutability'],
        },
        quiz: [
            {
                question: 'What does it mean for a string to be immutable?',
                options: ['It cannot be deleted', 'It cannot be modified in place', 'It has fixed size', 'It is encrypted'],
                correct: 1,
            },
            {
                question: 'How are strings typically stored in memory?',
                options: ['Linked List of characters', 'Array of characters', 'Tree of characters', 'Hash Map'],
                correct: 1,
            },
            {
                question: 'What is the time complexity to access a character by index?',
                options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
                correct: 2,
            },
        ],
    },
    {
        id: 2,
        slug: 'string-traversal',
        title: 'String Traversal',
        concept: `Traversal means visiting every character of the string at least once. This is the foundation for almost all string algorithms.

**Techniques:**
- **Index-based Loop:** iterate from i = 0 to length-1.
- **Enhanced Loop (For-Each):** directly iterate over characters.
- **Iterator:** use language-specific iterators.

Time Complexity: O(n)`,
        video: {
            title: 'String Traversal',
            duration: '10–12 minutes',
            src: 'https://youtu.be/KrrpL965tJk',
        },
        pdf: {
            filename: 'String_Traversal.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Strings/String Traversal.pdf',
            contents: ['For Loop vs While Loop', 'Accessing Characters', 'Common Patterns', 'Performance'],
        },
        quiz: [
            {
                question: 'What is the time complexity to traverse a string of length n?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
                correct: 1,
            },
            {
                question: 'Which loop is typically used for index-based traversal?',
                options: ['For loop', 'Do-while loop', 'Recursion', 'Switch statement'],
                correct: 0,
            },
            {
                question: 'Can you modify characters during traversal in an immutable string?',
                options: ['Yes, directly', 'No, must create new string', 'Only in reverse', 'Only vowels'],
                correct: 1,
            },
        ],
    },
    {
        id: 3,
        slug: 'reverse-string',
        title: 'Reverse a String',
        concept: `Reversing a string is a common problem that tests understanding of string manipulation.

**Approaches:**
1. **Two Pointers:** Swap characters at start and end pointers until they meet.
2. **Built-in Functions:** format like .reverse() or [::-1].
3. **Stack:** Push all chars to stack and pop them out.

Time Complexity: O(n)`,
        video: {
            title: 'Reverse a String',
            duration: '12 minutes',
            src: 'https://youtu.be/2P4gVjvynqo',
        },
        pdf: {
            filename: 'Reverse_a_String.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Strings/Reverse a String.pdf',
            contents: ['Two Pointer Method', 'Stack Method', 'Recursive Method', 'In-place limitations'],
        },
        quiz: [
            {
                question: 'Which data structure follows LIFO and can be used to reverse a string?',
                options: ['Queue', 'Stack', 'Linked List', 'Tree'],
                correct: 1,
            },
            {
                question: 'What is the time complexity of reversing a string using two pointers?',
                options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(1)'],
                correct: 0,
            },
            {
                question: 'When using two pointers (left, right), the loop condition is:',
                options: ['left == right', 'left > right', 'left < right', 'left != right'],
                correct: 2,
            },
        ],
    },
    {
        id: 4,
        slug: 'palindrome-check',
        title: 'Palindrome Check',
        concept: `A palindrome is a string that reads the same forward and backward (e.g., "madam", "racecar").

**Algorithm:**
1. Use two pointers: Left (start) and Right (end).
2. Compare characters at Left and Right.
3. If they differ, it's NOT a palindrome.
4. Move Left forward and Right backward.
5. Repeat until pointers cross.`,
        video: {
            title: 'Palindrome Check',
            duration: '10 minutes',
            src: 'https://youtu.be/rcShHR8-10U',
        },
        pdf: {
            filename: 'Palindrome_Check.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Strings/Palindrome Check.pdf',
            contents: ['Definition', 'Two Pointer Logic', 'Recursive Approach', 'Edge Cases'],
        },
        quiz: [
            {
                question: 'Which of these is a palindrome?',
                options: ['hello', 'world', 'level', 'java'],
                correct: 2,
            },
            {
                question: 'What is the best case time complexity for checking a palindrome?',
                options: ['O(1) (mismatch at ends)', 'O(n) (matches till end)', 'O(log n)', 'O(n^2)'],
                correct: 0,
            },
            {
                question: 'Does a single character string qualify as a palindrome?',
                options: ['Yes', 'No', 'Depends on character', 'Only if it is a vowel'],
                correct: 0,
            },
        ],
    },
    {
        id: 5,
        slug: 'character-frequency',
        title: 'Character Frequency',
        concept: `Counting how often each character appears in a string is a fundamental hashing problem.

**Approaches:**
1. **Hash Map / Dictionary:** Key = Character, Value = Count.
2. **Frequency Array:** Use an array of size 26 (for 'a'-'z') where index = ascii_val - 'a'.

**Applications:**
- Anagram checks
- Finding unique characters
- Compression algorithms (Huffman coding)`,
        video: {
            title: 'Character Frequency',
            duration: '15 minutes',
            src: 'https://youtu.be/kRiTYK4-ugk',
        },
        pdf: {
            filename: 'Character_Frequency.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Strings/Character Frequency.pdf',
            contents: ['Hash Map Implementation', 'Array Implementation', 'Complexity Analysis', 'Applications'],
        },
        quiz: [
            {
                question: 'What is the most efficient data structure to count character frequencies?',
                options: ['Linked List', 'Hash Map / Frequency Array', 'Binary Search Tree', 'Queue'],
                correct: 1,
            },
            {
                question: 'What is the space complexity to store frequencies of lowercase English letters?',
                options: ['O(n)', 'O(1) (Fixed size 26)', 'O(n^2)', 'O(log n)'],
                correct: 1,
            },
            {
                question: 'If two strings have identical character frequency maps, they are:',
                options: ['Palindromes', 'Anagrams', 'Substrings', 'Identical'],
                correct: 1,
            },
        ],
    },
];

