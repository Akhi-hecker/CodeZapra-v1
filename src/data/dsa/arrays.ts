
import type { SectionInfo, Topic } from '../../types/dsa';

export const sectionInfo: SectionInfo = {
    title: 'Arrays Data Structure',
    description: 'Master the fundamental building block of data structures. Learn how arrays work in memory, common operations, and essential techniques.',
    totalTopics: 5,
};

export const topics: Topic[] = [
    {
        id: 1,
        slug: 'intro-arrays',
        title: 'Introduction to Arrays',
        concept: `An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.

This makes it easier to calculate the position of each element by simply adding an offset to a base value, i.e., the memory location of the first element of the array (generally denoted by the name of the array).

**Key Characteristics:**
- Fixed size (in static arrays)
- Indexed access (O(1) time complexity)
- Contiguous memory allocation`,
        video: {
            title: 'Introduction to Arrays',
            duration: '8–10 minutes',
            src: 'https://youtu.be/j46oMZyyQAs',
        },
        pdf: {
            filename: 'Introduction_to_Arrays.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Arrays/Introduction to Arrays.pdf',
            contents: ['Definition', 'Memory Layout', 'Types of Arrays', 'Advantages & Disadvantages'],
        },
        quiz: [
            {
                question: 'What is the time complexity to access an element in an array by index?',
                options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
                correct: 2,
            },
            {
                question: 'Arrays store elements in:',
                options: ['Random memory locations', 'Contiguous memory locations', 'Linked memory locations', 'Hash buckets'],
                correct: 1,
            },
            {
                question: 'Which of the following is a disadvantage of a static array?',
                options: ['Slow access time', 'Fixed size', 'Complex implementation', 'Cannot store numbers'],
                correct: 1,
            },
        ],
    },
    {
        id: 2,
        slug: 'traversal-arrays',
        title: 'Array Traversal',
        concept: `Traversal means visiting every element of the array at least once. This is the most basic operation you can perform.

You typically use a loop (for or while) to iterate through the array indices from 0 to n-1, where n is the size of the array.

**Common Uses:**
- Printing all elements
- Searching for an item
- Modifying each element`,
        video: {
            title: 'Traversing Arrays',
            duration: '10–12 minutes',
            src: 'https://youtu.be/vy2ThD1K3_U',
        },
        pdf: {
            filename: 'Array_Traversal.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Arrays/Array Traversal.pdf',
            contents: ['Iterating (For Loops)', 'While Loops', 'ForEach (Enhanced Loops)', 'Performance Notes'],
        },
        quiz: [
            {
                question: 'What is the standard time complexity to traverse an array of size n?',
                options: ['O(1)', 'O(log n)', 'O(n)', 'O(n!)'],
                correct: 2,
            },
            {
                question: 'Which loop is most commonly used for array traversal?',
                options: ['If-Else', 'For Loop', 'Switch Case', 'Do-While'],
                correct: 1,
            },
            {
                question: 'Visiting every element is necessary for:',
                options: ['Accessing by index', 'Calculating the sum of all elements', 'Knowing the array size', 'creating an array'],
                correct: 1,
            },
        ],
    },
    {
        id: 3,
        slug: 'insertion-deletion',
        title: 'Insertion and Deletion',
        concept: `Inserting or deleting elements in an array can be costly depending on the position.

**Insertion:**
- At end: O(1) (if space is available)
- At beginning/middle: O(n) (requires shifting elements)

**Deletion:**
- At end: O(1)
- At beginning/middle: O(n) (requires shifting elements to fill the gap)`,
        video: {
            title: 'Insertion and Deletion Operations',
            duration: '12–15 minutes',
            src: 'https://youtu.be/6URg8EEeAWw',
        },
        pdf: {
            filename: 'Insertion_and_Deletion.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Arrays/Insertion and Deletion.pdf',
            contents: ['Insertion Logic', 'Deletion Logic', 'Shifting Elements', 'Complexity Analysis'],
        },
        quiz: [
            {
                question: 'What is the worst-case time complexity of inserting into an array?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
                correct: 1,
            },
            {
                question: 'Why is deleting from the beginning of an array slow?',
                options: ['It changes the memory address', 'You process the element', 'All subsequent elements must be shifted', 'It is not allowed'],
                correct: 2,
            },
            {
                question: 'Which operation is generally O(1) in a dynamic array?',
                options: ['Insert at index 0', 'Delete at index 0', 'Append to end', 'Search for value'],
                correct: 2,
            },
        ],
    },
    {
        id: 4,
        slug: 'min-max',
        title: 'Finding Min & Max',
        concept: `Finding the minimum or maximum element in an array involves traversing the entire array and keeping track of the current extreme value seen so far.

**Algorithm:**
1. Initialize \`min_val\` to the first element.
2. Iterate through the rest of the array.
3. If \`current_element < min_val\`, update \`min_val\`.
4. Return \`min_val\`.

Time Complexity: O(n)`,
        video: {
            title: 'Min and Max',
            duration: '8 minutes',
            src: 'https://youtu.be/nBk7I6sBn0U',
        },
        pdf: {
            filename: 'Finding_Minimum_and_Maximum.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Arrays/Finding Minimum and Maximum.pdf',
            contents: ['Linear Scan', 'Initialization', 'Comparison Logic'],
        },

        quiz: [
            {
                question: 'How many comparisons are needed to find the maximum in an array of size n?',
                options: ['n', 'n-1', 'n/2', 'log n'],
                correct: 1,
            },
            {
                question: 'Can you find the max element in O(1) time in an unsorted array?',
                options: ['Yes', 'No', 'Only if numbers are positive', 'Only if size is small'],
                correct: 1,
            },
            {
                question: 'What is a good initial value for finding current maximum?',
                options: ['0', 'The first element of the array', 'Infinity', 'None'],
                correct: 1,
            },
        ],
    },
    {
        id: 5,
        slug: 'prefix-sum',
        title: 'Prefix Sum Technique',
        concept: `Prefix Sum is a powerful technique where you precompute cumulative sums to answer range sum queries efficiently.

A prefix sum array \`P\` for array \`A\` is defined as:
\`P[i] = A[0] + A[1] + ... + A[i]\`

This allows calculating the sum of a subarray \`A[L...R]\` in O(1) time using:
\`Sum(L, R) = P[R] - P[L-1]\``,
        video: {
            title: 'Prefix Sum Explained',
            duration: '15 minutes',
            src: 'https://youtu.be/80A9bQQDIn8',
        },
        pdf: {
            filename: 'Prefix_Sum_Technique.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Arrays/Prefix Sum Technique.pdf',
            contents: ['Concept', 'Range Queries', 'Optimization', 'Applications'],
        },

        quiz: [
            {
                question: 'After building the prefix sum array, how fast can you calculate range sum?',
                options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
                correct: 1,
            },
            {
                question: 'If P is the prefix sum array, what is P[i]?',
                options: ['A[i]', 'Sum of A[0]...A[i]', 'Sum of A[i]...A[n]', 'Average of A[0]...A[i]'],
                correct: 1,
            },
            {
                question: 'What is the time complexity to build the prefix sum array?',
                options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n^2)'],
                correct: 1,
            },
        ],
    },
];

