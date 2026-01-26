
import type { SectionInfo, Topic } from '../../types/dsa';

export const sectionInfo: SectionInfo = {
    title: 'Queue Data Structure',
    description: 'Understand the First-In-First-Out (FIFO) principle. Master Enqueue, Dequeue, Circular Queues, and how to implement Queues using Stacks.',
    totalTopics: 5,
};

export const topics: Topic[] = [
    {
        id: 1,
        slug: 'queue-basics',
        title: 'Queue Introduction',
        concept: 'A Queue is a linear data structure that follows the FIFO (First In, First Out) principle. The first element added is the first one to be removed. Think of a line of people waiting.',
        video: {
            title: 'Queue Introduction',
            duration: '10 minutes',
            src: 'https://youtu.be/4eGl3qgKvZQ',
        },
        pdf: {
            filename: 'Queue_Introduction.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Queue/Queue Introduction.pdf',
            contents: ['Definition', 'FIFO Principle', 'Real-world Examples', 'Applications']
        },
        quiz: [
            {
                question: 'Which principle does a Queue follow?',
                options: ['LIFO', 'FIFO', 'Random', 'Sorted'],
                correct: 1,
            },
            {
                question: 'Where are elements added in a Queue?',
                options: ['Front', 'Rear', 'Middle', 'Anywhere'],
                correct: 1,
            },
            {
                question: 'Where are elements removed from in a Queue?',
                options: ['Rear', 'Middle', 'Front', 'Random'],
                correct: 2,
            },
        ],
    },
    {
        id: 2,
        slug: 'queue-operations',
        title: 'Queue Operations',
        concept: 'The primary operations are Enqueue (add to rear), Dequeue (remove from front), Front/Peek (view front element), and isEmpty. Efficient implementations have O(1) for these operations.',
        video: {
            title: 'Queue Operations',
            duration: '12 minutes',
            src: 'https://youtu.be/dJ-9Rqr1Ztk',
        },
        pdf: {
            filename: 'Queue_Operations.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Queue/Queue Operations.pdf',
            contents: ['Enqueue', 'Dequeue', 'Peek', 'Complexity Analysis']
        },
        quiz: [
            {
                question: 'What is the time complexity of Enqueue operation in a good implementation?',
                options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
                correct: 2,
            },
            {
                question: 'What happens if you Dequeue from an empty queue?',
                options: ['Queue Overflow', 'Queue Underflow', 'Returns 0', 'Nothing'],
                correct: 1,
            },
            {
                question: 'Which operation adds an element?',
                options: ['Pop', 'Push', 'Enqueue', 'Dequeue'],
                correct: 2,
            },
        ],
    },
    {
        id: 3,
        slug: 'circular-queue',
        title: 'Circular Queue',
        concept: 'To avoid the space wastage of a linear array queue (where removed spaces are lost), we use a Circular Queue. The Rear follows the Front in a circle.',
        video: {
            title: 'Circular Queue',
            duration: '15 minutes',
            src: 'https://youtu.be/Cv1SbJo0iek',
        },
        pdf: {
            filename: 'Circular_Queue.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Queue/Circular Queue.pdf',
            contents: ['Modulo Arithmetic', 'Full Condition', 'Empty Condition', 'Implementation']
        },
        quiz: [
            {
                question: 'How do we increment pointers in a circular queue of size N?',
                options: ['ptr++', 'ptr = ptr + 2', 'ptr = (ptr + 1) % N', 'ptr = ptr - 1'],
                correct: 2,
            },
            {
                question: 'What is the main advantage of Circular Queue?',
                options: ['Faster', 'Uses space efficiently', 'Easier to code', 'Sorts data'],
                correct: 1,
            },
            {
                question: 'When is a circular queue full (generic case)?',
                options: ['front == 0', 'rear == size-1', '(rear + 1) % size == front', 'front == rear'],
                correct: 2,
            },
        ],
    },
    {
        id: 4,
        slug: 'queue-implementation',
        title: 'Queue Using Array',
        concept: 'Using a simple array for a queue involves shifting elements during dequeue (O(n)), which is inefficient. A better approach keeps `front` and `rear` pointers.',
        video: {
            title: 'Queue Using Array',
            duration: '14 minutes',
            src: 'https://youtu.be/-NtqG4cYe_Q',
        },
        pdf: {
            filename: 'Queue_Using_Array.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Queue/Queue Using Array.pdf',
            contents: ['Simple Array', 'Two Pointers', 'Drawbacks of Linear Array']
        },
        quiz: [
            {
                question: 'In a simple array implementation, why is Dequeue O(n)?',
                options: ['Searching required', 'Shifting elements', 'Sorting required', 'It is O(1)'],
                correct: 1,
            },
            {
                question: 'Ideally, Dequeue should take how much time?',
                options: ['O(n)', 'O(log n)', 'O(1)', 'O(100)'],
                correct: 2,
            },
            {
                question: 'In a naive array implementation, we typically keep the Front element at?',
                options: ['Index 0 (Fixed)', 'The last index', 'The middle', 'Any random index'],
                correct: 0,
            },
        ],
    },
    {
        id: 5,
        slug: 'queue-using-stack',
        title: 'Queue Using Stack',
        concept: 'We can implement a Queue using two Stacks. One stack is used for pushing elements (enqueue), and the other for popping elements (dequeue) to reverse the order.',
        video: {
            title: 'Queue Using Stack',
            duration: '11 minutes',
            src: 'https://youtu.be/G1u5LhWfKNM',
        },
        pdf: {
            filename: 'Queue_Using_Stack.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Queue/Queue Using Stack.pdf',
            contents: ['Two Stacks Approach', 'Amortized Complexity', 'Code Walkthrough']
        },
        quiz: [
            {
                question: 'How many stacks are maintained to implement a Queue?',
                options: ['1', '2', '3', '0'],
                correct: 1,
            },
            {
                question: 'What is the amortized time complexity of dequeue operation?',
                options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
                correct: 1,
            },
            {
                question: 'When dequeueing, if output stack is empty, what do we do?',
                options: ['Return Error', 'Push from input stack to output stack', 'Clear Queue', 'Wait'],
                correct: 1,
            },
        ],
    },
];

