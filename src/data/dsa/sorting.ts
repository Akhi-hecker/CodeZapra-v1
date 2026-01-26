
import type { SectionInfo, Topic } from '../../types/dsa';

export const sectionInfo: SectionInfo = {
    title: 'Sorting Algorithms',
    description: 'Master fundamental sorting algorithms like Bubble, Selection, Insertion, Merge, and Quick Sort.',
    totalTopics: 5,
};

export const topics: Topic[] = [
    {
        id: 1,
        slug: 'bubble-sort',
        title: 'Bubble Sort',
        concept: 'Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. It passes through the list multiple times until the list is sorted.',
        video: {
            title: 'Bubble Sort Implementation',
            duration: '10 minutes',
            src: 'https://youtu.be/DGLVVITFgLQ'
        },
        pdf: {
            filename: 'Bubble_Sort.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Sorting/Bubble Sort.pdf',
            contents: ['Algorithm', 'Complexity']
        },
        quiz: [
            {
                question: 'What is the worst-case time complexity of Bubble Sort?',
                options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
                correct: 2,
            },
            {
                question: 'In Bubble Sort, after the first pass, which element is in its correct position?',
                options: ['The smallest element', 'The largest element', ' The middle element', 'No element'],
                correct: 1,
            },
            {
                question: 'Is Bubble Sort specific to any data type?',
                options: ['Yes, only integers', 'No, any comparable type', 'Yes, only strings', 'No, only lists'],
                correct: 1,
            },
        ],
    },
    {
        id: 2,
        slug: 'selection-sort',
        title: 'Selection Sort',
        concept: 'Selection sort is a simple sorting algorithm. This sorting algorithm is an in-place comparison-based algorithm in which the list is divided into two parts, the sorted part at the left end and the unsorted part at the right end.',
        video: {
            title: 'Selection Sort Guide',
            duration: '12 minutes',
            src: 'https://youtu.be/uZA_E7uTRDk'
        },
        pdf: {
            filename: 'Selection_Sort.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Sorting/Selection Sort.pdf',
            contents: ['Algorithm', 'Complexity']
        },
        quiz: [
            {
                question: 'What is the main idea behind Selection Sort?',
                options: ['Swapping adjacent elements', 'Dividing the list', 'Finding the minimum element', 'Merging sorted sublists'],
                correct: 2,
            },
            {
                question: 'What is the best-case time complexity of Selection Sort?',
                options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(1)'],
                correct: 2,
            },
            {
                question: 'Is Selection Sort stable?',
                options: ['Yes', 'No', 'Depends on implementation', 'Always'],
                correct: 1,
            },
        ],
    },
    {
        id: 3,
        slug: 'insertion-sort',
        title: 'Insertion Sort',
        concept: 'Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.',
        video: {
            title: 'Insertion Sort Visualized',
            duration: '11 minutes',
            src: 'https://youtu.be/X7G1qJVuJUc'
        },
        pdf: {
            filename: 'Insertion_Sort.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Sorting/Insertion Sort.pdf',
            contents: ['Algorithm', 'Complexity']
        },
        quiz: [
            {
                question: 'When is Insertion Sort most efficient?',
                options: ['Large datasets', 'Reverse sorted data', 'Almost sorted data', 'Random data'],
                correct: 2,
            },
            {
                question: 'What is the worst-case time complexity of Insertion Sort?',
                options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(n!)'],
                correct: 2,
            },
            {
                question: 'Is Insertion Sort an in-place algorithm?',
                options: ['Yes', 'No', 'Sometimes', 'Never'],
                correct: 0,
            },
        ],
    },
    {
        id: 4,
        slug: 'merge-sort',
        title: 'Merge Sort (Conceptual)',
        concept: 'Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.',
        video: {
            title: 'Merge Sort Explained',
            duration: '15 minutes',
            src: 'https://youtu.be/nTQaEOwZ3OY'
        },
        pdf: {
            filename: 'Merge_Sort.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Sorting/Merge Sort.pdf',
            contents: ['Algorithm', 'Complexity', 'Divide & Conquer']
        },
        quiz: [
            {
                question: 'What is the time complexity of Merge Sort in all cases?',
                options: ['O(n)', 'O(n^2)', 'O(n log n)', 'O(log n)'],
                correct: 2,
            },
            {
                question: 'Does Merge Sort require extra space?',
                options: ['No, it is in-place', 'Yes, O(n) auxiliary space', 'Yes, O(n^2) space', 'Yes, O(log n) space'],
                correct: 1,
            },
            {
                question: 'Which strategy does Merge Sort use?',
                options: ['Greedy', 'Dynamic Programming', 'Divide and Conquer', 'Backtracking'],
                correct: 2,
            },
        ],
    },
    {
        id: 5,
        slug: 'quick-sort',
        title: 'Quick Sort (Conceptual)',
        concept: 'QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways.',
        video: {
            title: 'Quick Sort Deep Dive',
            duration: '15 minutes',
            src: 'https://youtu.be/VKBb4YuDBAs'
        },
        pdf: {
            filename: 'Quick_Sort.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Sorting/Quick Sort.pdf',
            contents: ['Algorithm', 'Complexity', 'Pivot Selection']
        },
        quiz: [
            {
                question: 'What is the key process in Quick Sort?',
                options: ['Merging', 'Partitioning', 'Selection', 'Insertion'],
                correct: 1,
            },
            {
                question: 'What is the worst-case time complexity of Quick Sort?',
                options: ['O(n log n)', 'O(n)', 'O(n^2)', 'O(n!)'],
                correct: 2,
            },
            {
                question: 'Which is generally faster in practice for random arrays?',
                options: ['Merge Sort', 'Heap Sort', 'Quick Sort', 'Bubble Sort'],
                correct: 2,
            },
        ],
    },
];

