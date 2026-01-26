
import type { SectionInfo, Topic } from '../../types/dsa';

export const sectionInfo: SectionInfo = {
    title: 'Graph Data Structure',
    description: 'Understand networks of nodes and edges. Master Graph representations (Adjacency Matrix/List), Traversals (BFS, DFS), and solving problems like Connected Components.',
    totalTopics: 5,
};

export const topics: Topic[] = [
    {
        id: 1,
        slug: 'intro-graph',
        title: 'Introduction to Graphs',
        concept: 'A Graph is a non-linear data structure consisting of nodes (vertices) and edges. Graphs can be Directed or Undirected, Weighted or Unweighted.',
        video: {
            title: 'Graph Introduction',
            duration: '10 minutes',
            src: 'https://youtu.be/KUrjBXbDR54',
        },
        pdf: {
            filename: 'Introduction_to_Graphs.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Graphs/Introduction to Graphs.pdf',
            contents: ['Definitions', 'Types', 'Applications']
        },
        quiz: [
            {
                question: 'A graph where edges have no direction is called?',
                options: ['Directed', 'Undirected', 'Cyclic', 'Weighted'],
                correct: 1
            },
            {
                question: 'What is the maximum number of edges in a simple undirected graph with V vertices?',
                options: ['V', 'V^2', 'V(V-1)/2', 'V-1'],
                correct: 2
            },
            {
                question: 'A graph containing cycles is called?',
                options: ['Tree', 'Acyclic', 'Cyclic', 'Bipartite'],
                correct: 2
            }
        ]
    },
    {
        id: 2,
        slug: 'graph-representation',
        title: 'Graph Representation',
        concept: 'Graphs are commonly represented using Adjacency Matrix (2D array, fast lookup, high space) or Adjacency List (Array of Lists, space efficient for sparse graphs).',
        video: {
            title: 'Graph Representation',
            duration: '12 minutes',
            src: 'https://youtu.be/AYdYxUZj5hQ',
        },
        pdf: {
            filename: 'Graph_Representation.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Graphs/Graph Representation.pdf',
            contents: ['Adjacency Matrix', 'Adjacency List', 'Edge List', 'Space Complexity']
        },
        quiz: [
            {
                question: 'Space complexity of Adjacency Matrix for V vertices?',
                options: ['O(V)', 'O(E)', 'O(V^2)', 'O(1)'],
                correct: 2
            },
            {
                question: 'Which representation is better for sparse graphs?',
                options: ['Adjacency Matrix', 'Adjacency List', 'Both represent same', 'Neither'],
                correct: 1
            },
            {
                question: 'Time complexity to check if edge (u, v) exists in Adjacency List (worst case)?',
                options: ['O(1)', 'O(V)', 'O(log V)', 'O(E)'],
                correct: 1 // O(degree of u), worst case O(V)
            }
        ]
    },
    {
        id: 3,
        slug: 'bfs',
        title: 'Breadth First Search (BFS)',
        concept: 'BFS explores the graph layer by layer. It starts at a source node and visits all immediate neighbors before moving to the next level neighbors. Uses a Queue.',
        video: {
            title: 'Breadth First Search',
            duration: '12 minutes',
            src: 'https://youtu.be/0vMONbsJgog',
        },
        pdf: {
            filename: 'Breadth_First_Search.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Graphs/Breadth First Search (BFS).pdf',
            contents: ['Algorithm', 'Queue Usage', 'Complexity O(V+E)', 'Shortest Path (Unweighted)']
        },
        quiz: [
            {
                question: 'Data structure used for BFS?',
                options: ['Stack', 'Queue', 'Heap', 'Tree'],
                correct: 1
            },
            {
                question: 'BFS naturally finds the shortest path in?',
                options: ['Weighted Graph', 'Unweighted Graph', 'DAG', 'Any Graph'],
                correct: 1
            },
            {
                question: 'Time complexity of BFS using Adjacency List?',
                options: ['O(V^2)', 'O(V+E)', 'O(E)', 'O(V)'],
                correct: 1
            }
        ]
    },
    {
        id: 4,
        slug: 'dfs',
        title: 'Depth First Search (DFS)',
        concept: 'DFS explores as deep as possible along each branch before backtracking. Uses a Stack (or recursion). Useful for topological sorting, cycle detection, etc.',
        video: {
            title: 'Depth First Search',
            duration: '12 minutes',
            src: 'https://youtu.be/I4WeBAdH3ow',
        },
        pdf: {
            filename: 'Depth_First_Search.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Graphs/Depth First Search (DFS).pdf',
            contents: ['Algorithm', 'Recursion/Stack', 'Complexity O(V+E)', 'Applications']
        },
        quiz: [
            {
                question: 'Data structure used for DFS?',
                options: ['Queue', 'Stack', 'Heap', 'Hash Map'],
                correct: 1
            },
            {
                question: 'DFS is NOT typically used for?',
                options: ['Detecting Cycles', 'Topological Sort', 'Shortest Path in Unweighted Graph', 'Path finding'],
                correct: 2 // BFS is better for shortest path unweighted
            },
            {
                question: 'Space complexity of DFS (recursive)?',
                options: ['O(V)', 'O(E)', 'O(1)', 'O(V^2)'],
                correct: 0 // Stack depth
            }
        ]
    },
    {
        id: 5,
        slug: 'connected-components',
        title: 'Connected Components',
        concept: 'In an undirected graph, a connected component is a subgraph where every node is reachable from every other node. We can find them using BFS or DFS traversal.',
        video: {
            title: 'Connected Components',
            duration: '10 minutes',
            src: 'https://youtu.be/-zzVswKVW6M',
        },
        pdf: {
            filename: 'Connected_Components.pdf',
            src: '/dev_uploaded/DSA_COURSE_NOTES/Graphs/Connected Components.pdf',
            contents: ['Definition', 'Finding logic', 'Counting Islands']
        },
        quiz: [
            {
                question: 'How do we count connected components?',
                options: ['Run BFS/DFS on every unvisited node', 'Count edges', 'Count vertices', 'Calculate degree'],
                correct: 0
            },
            {
                question: 'If a graph has 3 connected components, how many times will BFS/DFS start from the main loop?',
                options: ['1', '3', 'V', 'E'],
                correct: 1
            },
            {
                question: 'What does a single BFS/DFS traversal visit in a disconnected graph?',
                options: ['The entire graph', 'Only one connected component', 'Only the source node', 'All edges'],
                correct: 1
            }
        ]
    }
];

