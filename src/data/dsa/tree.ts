
import type { SectionInfo, Topic } from '../../types/dsa';

export const sectionInfo: SectionInfo = {
    title: 'Tree Data Structure',
    description: 'Explore hierarchical data structures. Master Binary Trees, Traversals (Inorder, Preorder, Postorder), calculating Height, and Binary Search Trees (BST).',
    totalTopics: 5,
};

export const topics: Topic[] = [
    {
        id: 1,
        slug: 'intro-trees',
        title: 'Introduction to Trees',
        concept: 'A Tree is a hierarchical data structure consisting of nodes connected by edges. The top node is the Root. Nodes with no children are leaves. It is a non-linear data structure.',
        video: {
            title: 'Introduction to Trees',
            duration: '10 minutes',
            src: 'https://youtu.be/0mGV8mrwUrE',
        },
        pdf: {
            filename: 'Introduction_to_Trees.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Tree/Introduction to Trees.pdf',
            contents: ['Definitions', 'Terminology', 'Types of Trees']
        },
        quiz: [
            {
                question: 'Which node has no parent in a tree?',
                options: ['Leaf', 'Root', 'Child', 'Sibling'],
                correct: 1
            },
            {
                question: 'A node with no children is called a?',
                options: ['Root', 'Parent', 'Leaf', 'Branch'],
                correct: 2
            },
            {
                question: 'What is the maximum number of edges in a tree with N nodes?',
                options: ['N', 'N-1', 'N+1', '2N'],
                correct: 1
            }
        ]
    },
    {
        id: 2,
        slug: 'binary-tree',
        title: 'Binary Tree',
        concept: 'A Binary Tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child.',
        video: {
            title: 'Binary Tree',
            duration: '12 minutes',
            src: 'https://youtu.be/T4phdeY5-E4',
        },
        pdf: {
            filename: 'Binary_Tree.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Tree/Binary Tree.pdf',
            contents: ['Properties', 'Representation', 'Types (Full, Complete)']
        },
        quiz: [
            {
                question: 'What is the maximum number of children a node in a binary tree can have?',
                options: ['1', '2', '3', 'Unlimited'],
                correct: 1
            },
            {
                question: 'A binary tree where every node has 0 or 2 children is called?',
                options: ['Complete', 'Full/Strict', 'Perfect', 'Balanced'],
                correct: 1
            },
            {
                question: 'Max nodes at level L (starting 0) is?',
                options: ['2^L', '2^(L-1)', 'L^2', '2*L'],
                correct: 0
            }
        ]
    },
    {
        id: 3,
        slug: 'tree-traversal',
        title: 'Tree Traversals',
        concept: 'Traversal means visiting every node in the tree. Common techniques: Inorder (Left-Root-Right), Preorder (Root-Left-Right), Postorder (Left-Right-Root), and Level Order (BFS).',
        video: {
            title: 'Tree Traversals',
            duration: '15 minutes',
            src: 'https://youtu.be/Ebc2jgs9sY0',
        },
        pdf: {
            filename: 'Tree_Traversals.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Tree/Tree Traversals.pdf',
            contents: ['DFS (In, Pre, Post)', 'BFS (Level Order)', 'Applications']
        },
        quiz: [
            {
                question: 'In Preorder traversal, when is the root visited?',
                options: ['First', 'In Middle', 'Last', 'Randomly'],
                correct: 0
            },
            {
                question: 'Which traversal gives nodes in non-decreasing order for a BST?',
                options: ['Preorder', 'Inorder', 'Postorder', 'Level Order'],
                correct: 1
            },
            {
                question: 'BFS uses which data structure?',
                options: ['Stack', 'Queue', 'Array', 'Linked List'],
                correct: 1
            }
        ]
    },
    {
        id: 4,
        slug: 'height-of-tree',
        title: 'Height of Tree',
        concept: 'The height (or max depth) of a tree is the number of edges on the longest path from the root to a leaf node. It is calculated recursively: 1 + max(height(left), height(right)).',
        video: {
            title: 'Height of Tree',
            duration: '10 minutes',
            src: 'https://youtu.be/oeLkJZrsriM',
        },
        pdf: {
            filename: 'Height_of_Tree.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Tree/Height of Tree.pdf',
            contents: ['Recursive Logic', 'Edge Cases', 'Complexity O(n)', 'Diameter Relation']
        },
        quiz: [
            {
                question: 'In the recursive height function, what is the base case for an empty node (null)?',
                options: ['Return 0 or -1', 'Return 1', 'Return Infinity', 'Return null'],
                correct: 0,
            },
            {
                question: 'What is the worst-case time complexity to find the height of a binary tree?',
                options: ['O(log n)', 'O(n)', 'O(1)', 'O(n^2)'],
                correct: 1
            },
            {
                question: 'If left subtree height is 3 and right is 5, what is tree height?',
                options: ['4', '5', '6', '8'],
                correct: 2 // 1 + max(3,5) = 6
            }
        ]
    },
    {
        id: 5,
        slug: 'bst',
        title: 'Binary Search Tree',
        concept: 'A BST is a binary tree where the left child is smaller than the parent, and the right child is greater. This logic applies recursively.',
        video: {
            title: 'Binary Search Tree',
            duration: '14 minutes',
            src: 'https://youtu.be/7LCbW1XKU3o',
        },
        pdf: {
            filename: 'Binary_Search_Tree.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Tree/Binary Search Tree (BST).pdf',
            contents: ['BST Properties', 'Search', 'Insert', 'Delete']
        },
        quiz: [
            {
                question: 'What is the time complexity of Search in a balanced BST?',
                options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
                correct: 1
            },
            {
                question: 'Where is the smallest element in a BST located?',
                options: ['Leftmost leaf', 'Rightmost leaf', 'Root', 'Anywhere'],
                correct: 0
            },
            {
                question: 'BST worst case search time complexity (skewed tree)?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
                correct: 1
            }
        ]
    }
];

