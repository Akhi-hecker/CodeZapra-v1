
import type { SectionInfo, Topic } from '../../types/dsa';

export const sectionInfo: SectionInfo = {
    title: 'Searching Algorithms',
    description: 'Learn efficient ways to find data. Master generic Linear Search and the powerful O(log n) Binary Search for sorted data.',
    totalTopics: 5,
};

export const topics: Topic[] = [
    {
        id: 1,
        slug: 'linear-search',
        title: 'Linear Search',
        concept: `Linear Search is the simplest searching algorithm. It checks every element in the list sequentially until the target element is found or the list ends.

**Algorithm:**
1. Start from the first element.
2. Compare current element with target.
3. If match, return index.
4. If not match, move to next.
5. If end of list reached, return -1 (not found).

**Time Complexity:** O(n)`,
        video: {
            title: 'Linear Search Explained',
            duration: '8 minutes',
            src: 'https://youtu.be/k6EjJ4gHftY',
        },
        pdf: {
            filename: 'Linear_Search.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Searching/Linear Search.pdf',
            contents: ['Algorithm Steps', 'Complexity Analysis', 'When to Use', 'Code Implementation'],
        },
        quiz: [
            {
                question: 'What is the worst-case time complexity of Linear Search?',
                options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
                correct: 2,
            },
            {
                question: 'Does Linear Search require the array to be sorted?',
                options: ['Yes', 'No', 'Only for numbers', 'Only for strings'],
                correct: 1,
            },
            {
                question: 'If the element is at the first position, what is the complexity?',
                options: ['O(n)', 'O(1)', 'O(log n)', 'O(n/2)'],
                correct: 1,
            },
        ],
    },
    {
        id: 2,
        slug: 'binary-search',
        title: 'Binary Search',
        concept: `Binary Search is an efficient algorithm to find a target in a **sorted** array. It works by repeatedly dividing the search interval in half.

**Algorithm:**
1. Set \`low = 0\` and \`high = n-1\`.
2. While \`low <= high\`:
   - Calculate \`mid = (low + high) / 2\`.
   - If \`arr[mid] == target\`, return \`mid\`.
   - If \`arr[mid] < target\`, ignore left half (\`low = mid + 1\`).
   - If \`arr[mid] > target\`, ignore right half (\`high = mid - 1\`).
3. If loop ends, target not found.

**Time Complexity:** O(log n)`,
        video: {
            title: 'Binary Search Visualized',
            duration: '15 minutes',
            src: 'https://youtu.be/NhFxzSh_UfY',
        },
        pdf: {
            filename: 'Binary_Search.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Searching/Binary Search.pdf',
            contents: ['Divide and Conquer', 'Iterative vs Recursive', 'Midpoint Calculation', 'Overflow Safety'],
        },
        quiz: [
            {
                question: 'What is the precondition for Binary Search?',
                options: ['Array must be unique', 'Array must be sorted', 'Array must be small', 'Array must contain integers only'],
                correct: 1,
            },
            {
                question: 'What is the time complexity of Binary Search?',
                options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
                correct: 1,
            },
            {
                question: 'How do you calculate mid to avoid overflow in large arrays?',
                options: ['(low + high) / 2', 'low + (high - low) / 2', '(low - high) / 2', 'high - low / 2'],
                correct: 1,
            },
        ],
    },
    {
        id: 3,
        slug: 'first-last-occurrence',
        title: 'First & Last Occurrence',
        concept: `In a sorted array with duplicates, standard Binary Search might return any instance of the target. To find the first or last occurrence, you modify the binary search condition.

**First Occurrence:**
- When \`arr[mid] == target\`, record \`mid\` as a potential answer, but continue searching in the **left** half (\`high = mid - 1\`) to see if there's an earlier occurrence.

**Last Occurrence:**
- Similarly, search in the **right** half (\`low = mid + 1\`) after finding a match.`,
        video: {
            title: 'First / Last Occurrence',
            duration: '12 minutes',
            src: 'https://youtu.be/rCatZqsZLFg',
        },
        pdf: {
            filename: 'First_and_Last_Occurrence.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Searching/First & Last Occurrence.pdf',
            contents: ['Problem Statement', 'Modified Binary Search', 'Finding Count of Elements', 'Edge Cases'],
        },
        quiz: [
            {
                question: 'To find the first occurrence, where do you move if arr[mid] == target?',
                options: ['Stop and return', 'Move Right (low = mid + 1)', 'Move Left (high = mid - 1)', 'Return mid - 1'],
                correct: 2,
            },
            {
                question: 'What is the complexity to find the count of a number in a sorted array using this method?',
                options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
                correct: 1,
            },
            {
                question: 'Standard binary search guarantees finding which Occurrence?',
                options: ['First', 'Last', 'Any valid one', 'Middle one'],
                correct: 2,
            },
        ],
    },
    {
        id: 4,
        slug: 'search-in-sorted',
        title: 'Search in Sorted Array',
        concept: `Often binary search needs to be applied in variations involving sorted arrays, such as Order-Agnostic Binary Search or searching in an Infinite Array.

**Order Agnostic Logic:**
- If you don't know the sort order (ascending/descending), check \`arr[0]\` vs \`arr[n-1]\`.
- If \`asc\`, standard logic.
- If \`desc\`, flip the comparison logic.

This topic covers applying BS to general sorted structures.`,
        video: {
            title: 'Search in Sorted Array',
            duration: '10 minutes',
            src: 'https://youtu.be/hwL1uLoaW9w',
        },
        pdf: {
            filename: 'Search_in_Sorted_Array.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Searching/Search in Sorted Array.pdf',
            contents: ['Concept', 'Determining Order', 'Modified Algorithm', 'Examples'],
        },
        quiz: [
            {
                question: 'How do you determine if an array is sorted ascending or descending?',
                options: ['Check all elements', 'Compare start and end elements', 'Compare middle elements', 'Random sampling'],
                correct: 1,
            },
            {
                question: 'In descending sorted array, if target > mid, where do you search?',
                options: ['Right half', 'Left half', 'Both halves', 'Stop searching'],
                correct: 1,
            },
            {
                question: 'Does the time complexity change for Order Agnostic BS?',
                options: ['Yes, it becomes O(n)', 'No, it remains O(log n)', 'Yes, O(2 log n)', 'No, O(1)'],
                correct: 1,
            },
        ],
    },
    {
        id: 5,
        slug: 'search-rotated-array',
        title: 'Search in Rotated Array',
        concept: `searching in a Rotated Sorted Array is a classic problem. An array sorted ascendingly is rotated at some pivot unknown to you.

**Approach:**
1. **Find Pivot:** The element where the next element is smaller. Can be done in O(log n).
2. **Binary Search:** Once pivot is found, the array is split into two sorted subarrays. Perform BS on the appropriate half.

Alternatively, perform a slightly modified BS directly by checking which half is sorted.`,
        video: {
            title: 'Search in Rotated Array',
            duration: '14 minutes',
            src: 'https://youtu.be/4alnaqnzU1w',
        },
        pdf: {
            filename: 'Search_in_Rotated_Sorted_Array.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Searching/Search in Rotated Sorted Array.pdf',
            contents: ['Problem Analysis', 'Finding Pivot', 'Binary Search on Subarrays', 'Complexity'],
        },
        quiz: [
            {
                question: 'In a rotated sorted array [4,5,6,7,0,1,2], which is the minimum element (rotation point)?',
                options: ['4', '7', '0', '2'],
                correct: 2,
            },
            {
                question: 'What is the time complexity to search in a rotated sorted array?',
                options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
                correct: 1,
            },
            {
                question: 'If the left half is sorted and target is within range, where do you search?',
                options: ['Left half', 'Right half', 'Neither', 'Restart'],
                correct: 0,
            },
        ],
    },
];

