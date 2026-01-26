
import type { SectionInfo, Topic } from '../../types/dsa';

export const sectionInfo: SectionInfo = {
    title: 'Linked List',
    description: 'Master Linked Lists, a fundamental dynamic data structure. Learn how to Traverse, Insert, Delete, and Reverse nodes efficiently.',
    totalTopics: 5,
};

export const topics: Topic[] = [
    {
        id: 1,
        slug: 'intro-linked-list',
        title: 'Introduction to Linked List',
        concept: 'A Linked List is a linear data structure where elements are not stored at contiguous memory locations. The elements in a linked list are linked using pointers. Use it when dynamic size is required.',
        video: {
            title: 'Introduction to Linked List',
            duration: '10 minutes',
            src: 'https://youtu.be/1rCAaRK70hM',
        },
        pdf: {
            filename: 'Introduction_to_Linked_List.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Linked List/Introduction to Linked List.pdf',
            contents: ['Definition', 'Node Structure', 'Memory Allocation']
        },
        quiz: [
            {
                question: 'What does a node in a generic linked list contain?',
                options: ['Data only', 'Address only', 'Data and Address of next node', 'Data and Address of previous node'],
                correct: 2
            },
            {
                question: 'Are linked list elements stored in contiguous memory?',
                options: ['Yes', 'No', 'Sometimes', 'Depends on compiler'],
                correct: 1
            },
            {
                question: 'What is the worst-case time complexity to access an element in a Linked List?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
                correct: 1
            }
        ]
    },
    {
        id: 2,
        slug: 'traversal-linked-list',
        title: 'Traversal of Linked List',
        concept: 'Traversal involves visiting each node of the linked list exactly once. We start from the head and follow the `next` pointers until we reach null.',
        video: {
            title: 'Traversal of Linked List',
            duration: '12 minutes',
            src: 'https://youtu.be/28w3f4P_nY8',
        },
        pdf: {
            filename: 'Traversal_of_Linked_List.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Linked List/Traversal of Linked List.pdf',
            contents: ['Pointer Logic', 'While Loop', 'Printing Data', 'Complexity']
        },
        quiz: [
            {
                question: 'When traversing a Singly Linked List, how do you know you reached the end?',
                options: ['Node data is 0', 'Node pointer is NULL', 'Counter reaches size', 'Node points to Head'],
                correct: 1
            },
            {
                question: 'What is the time complexity to traverse a linked list of size n?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
                correct: 1
            },
            {
                question: 'Can you traverse a Singly Linked List backwards naturally?',
                options: ['Yes', 'No, pointers are one-way', 'Yes, using binary search', 'Yes, using magic'],
                correct: 1
            }
        ]
    },
    {
        id: 3,
        slug: 'insertion-linked-list',
        title: 'Insertion in Linked List',
        concept: 'Insertion can happen at the Beginning (O(1)), at the End (O(n) without tail pointer), or at a specific Position (O(n)). We create a new node and adjust pointers.',
        video: {
            title: 'Insertion in Linked List',
            duration: '15 minutes',
            src: 'https://youtu.be/76Ms3OuKP3s',
        },
        pdf: {
            filename: 'Insertion_in_Linked_List.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Linked List/Insertion in Linked List.pdf',
            contents: ['Insert at Head', 'Insert at Tail', 'Insert at Position', 'Pointer Updates']
        },
        quiz: [
            {
                question: 'What complexity is insertion at the HEAD of a linked list?',
                options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
                correct: 1
            },
            {
                question: 'To insert at the end, what do we need to traverse?',
                options: ['The whole list', 'Half the list', 'Nothing', 'The first node'],
                correct: 0
            },
            {
                question: 'When inserting a new node `N` between `A` and `B`, the correct pointer update is:',
                options: ['A.next = N, N.next = B', 'A.next = B, B.next = N', 'N.next = A, A.next = B', 'A.next = N'],
                correct: 0
            }
        ]
    },
    {
        id: 4,
        slug: 'deletion-linked-list',
        title: 'Deletion in Linked List',
        concept: 'Deletion involves removing a node and re-linking the previous node to the next node. Special care must be taken when deleting the Head or the Tail.',
        video: {
            title: 'Deletion in Linked List',
            duration: '14 minutes',
            src: 'https://youtu.be/Q4DbZMZzQjU',
        },
        pdf: {
            filename: 'Deletion_in_Linked_List.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Linked List/Deletion in Linked List.pdf',
            contents: ['Delete Head', 'Delete Tail', 'Delete by Value', 'Memory Management']
        },
        quiz: [
            {
                question: 'To delete a node, what information is primarily needed?',
                options: ['The previous node', 'The list size', 'The tail node', 'The root value'],
                correct: 0
            },
            {
                question: 'To delete node B that lies between A and C (A -> B -> C), what pointer change is needed?',
                options: ['A.next = C', 'B.next = A', 'C.next = B', 'A.next = null'],
                correct: 0,
            },
            {
                question: 'What is the complexity to delete the FIRST node?',
                options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
                correct: 2
            }
        ]
    },
    {
        id: 5,
        slug: 'reverse-linked-list',
        title: 'Reverse Linked List',
        concept: 'Reversing a linked list is a classic technical interview question. We change the `next` pointer of every node to point to its previous node. Can be done Iteratively or Recursively.',
        video: {
            title: 'Reverse Linked List',
            duration: '12 minutes',
            src: 'https://youtu.be/4Uvhw6ngjvU',
        },
        pdf: {
            filename: 'Reverse_Linked_List.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Linked List/Reverse Linked List.pdf',
            contents: ['Iterative Approach', 'Recursive Approach', 'Dry Run', 'Complexity']
        },
        quiz: [
            {
                question: 'How many pointers are typically used in the iterative reversal method?',
                options: ['1 (curr)', '2 (curr, prev)', '3 (curr, prev, next)', '0'],
                correct: 2
            },
            {
                question: 'After reversal, what does the original Head point to?',
                options: ['New Head', 'NULL', 'Second Node', 'Infinity'],
                correct: 1
            },
            {
                question: 'What is the time complexity of reversing a linked list?',
                options: ['O(1)', 'O(n)', 'O(n^2)', 'O(log n)'],
                correct: 1
            }
        ]
    }
];
