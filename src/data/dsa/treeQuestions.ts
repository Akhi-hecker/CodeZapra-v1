
import type { CodingQuestionData } from '../../types/dsa';

export const codingQuestions: CodingQuestionData[] = [
    {
        id: 1,
        title: 'Binary Tree Inorder Traversal',
        description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.\n\n**Input Format:**\nSpace-separated values representing level-order traversal (use \'null\' or \'-1\' for empty nodes).\n\n**Output:**\nSpace-separated inorder values.',
        hint: 'Inorder: Left -> Root -> Right. Use recursion.',
        expectedLogicKeywords: ['inorder', 'left', 'right', 'root', 'recursive'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Helper to build tree from level order input
def build_tree(nodes):
    if not nodes or nodes[0] == -1: return None
    root = TreeNode(nodes[0])
    queue = [root]
    i = 1
    while i < len(nodes):
        curr = queue.pop(0)
        if i < len(nodes) and nodes[i] != -1:
            curr.left = TreeNode(nodes[i])
            queue.append(curr.left)
        i += 1
        if i < len(nodes) and nodes[i] != -1:
            curr.right = TreeNode(nodes[i])
            queue.append(curr.right)
        i += 1
    return root

# Read input
import sys
input_data = sys.stdin.read().split()
if not input_data: exit()
values = [int(x) if x != 'null' and x != '-1' else -1 for x in input_data]
root = build_tree(values)

# Write your Inorder Traversal function
def inorder(root):
    # Your logic here
    # Return list of values or print them
    return []

# Call and print
result = inorder(root)
print(*(result))`,
            java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

public class Main {
    // Write your inorder traversal
    public static List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        // Logic
        return res;
    }

    // Helper to build tree
    public static TreeNode buildTree(String[] nodes) {
        if (nodes.length == 0 || nodes[0].equals("-1") || nodes[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(nodes[0]));
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        int i = 1;
        while(i < nodes.length) {
            TreeNode curr = q.poll();
            if(i < nodes.length && !nodes[i].equals("-1") && !nodes[i].equals("null")) {
                curr.left = new TreeNode(Integer.parseInt(nodes[i]));
                q.add(curr.left);
            }
            i++;
            if(i < nodes.length && !nodes[i].equals("-1") && !nodes[i].equals("null")) {
                curr.right = new TreeNode(Integer.parseInt(nodes[i]));
                q.add(curr.right);
            }
            i++;
        }
        return root;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNext()) return;
        String[] parts = sc.nextLine().split(" ");
        TreeNode root = buildTree(parts);
        
        List<Integer> res = inorderTraversal(root);
        for(int x : res) System.out.print(x + " ");
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <sstream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// Write your inorder traversal
void inorder(TreeNode* root) {
    // Your logic
}

TreeNode* buildTree(vector<string>& parts) {
    if(parts.empty() || parts[0] == "-1" || parts[0] == "null") return NULL;
    TreeNode* root = new TreeNode(stoi(parts[0]));
    queue<TreeNode*> q;
    q.push(root);
    int i = 1;
    while(i < parts.size()) {
        TreeNode* curr = q.front(); q.pop();
        if(i < parts.size() && parts[i] != "-1" && parts[i] != "null") {
            curr->left = new TreeNode(stoi(parts[i]));
            q.push(curr->left);
        }
        i++;
        if(i < parts.size() && parts[i] != "-1" && parts[i] != "null") {
            curr->right = new TreeNode(stoi(parts[i]));
            q.push(curr->right);
        }
        i++;
    }
    return root;
}

int main() {
    string line, val;
    getline(cin, line);
    stringstream ss(line);
    vector<string> parts;
    while(ss >> val) parts.push_back(val);
    
    TreeNode* root = buildTree(parts);
    inorder(root);
    return 0;
}`
        },
        testCases: [
            { input: '1 -1 2 3', expectedOutput: '1 3 2', description: 'Right child only' },
            { input: '1 2 3', expectedOutput: '2 1 3', description: 'Full tree' },
            { input: '', expectedOutput: '', description: 'Empty', hidden: true },
            { input: '1', expectedOutput: '1', description: 'Single node', hidden: true },
            { input: '1 2 -1', expectedOutput: '2 1', description: 'Left child only', hidden: true }
        ],
    },
    {
        id: 2,
        title: 'Maximum Depth of Binary Tree',
        description: 'Given the root of a binary tree, return its maximum depth.\n\n**Input Format:**\nSpace-separated level order values.\n\n**Output:**\nInteger depth.',
        hint: 'Recursive: 1 + max(height(left), height(right)). Base case: root is null -> 0.',
        expectedLogicKeywords: ['max', 'height', 'depth', 'left', 'right'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Built-in TreeNode setup...
# Write logic

def maxDepth(root):
    # Your logic
    return 0

# Helper to read input and invoke logic...
# (Full template provided in background wrapper for real app, simplified here for user view)
# ... tree build logic similar to Q1 ...
print(maxDepth(root))`,
            java: `// Imports...
// TreeNode class...

public class Main {
    public static int maxDepth(TreeNode root) {
        // Your logic
        return 0;
    }
    
    public static void main(String[] args) {
        // Input parsing...
        // System.out.println(maxDepth(root));
    }
}`,
            cpp: `// Struct TreeNode...

int maxDepth(TreeNode* root) {
    // Your logic
    return 0;
}

int main() {
    // Input parsing...
    // cout << maxDepth(root);
}`
        },
        testCases: [
            { input: '3 9 20 -1 -1 15 7', expectedOutput: '3', description: 'Depth 3' },
            { input: '1 -1 2', expectedOutput: '2', description: 'Depth 2' },
            { input: '', expectedOutput: '0', description: 'Empty', hidden: true },
            { input: '1', expectedOutput: '1', description: 'Single node', hidden: true },
            { input: '1 2 3 4 5', expectedOutput: '3', description: 'Full tree depth 3', hidden: true }
        ],
    },
    {
        id: 3,
        title: 'Search in a BST',
        description: 'You are given the root of a binary search tree (BST) and an integer val. Find the node in the BST that the node\'s value equals val and return the subtree rooted with that node. If such a node does not exist, return null.\n\n**Input Format:**\nLevel order values\nTarget Value\n\n**Output:**\nLevel order of found subtree (or null)',
        hint: 'If val < root, search left. If val > root, search right.',
        expectedLogicKeywords: ['bst', 'search', 'less', 'greater', 'compare'],
        minLogicSentences: 1,
        starterCode: {
            python: `# TreeNode class...
# Read Tree Input
# Read Val Input

def searchBST(root, val):
    # Your logic
    return None

# Print result...`,
            java: `public class Main {
    public static TreeNode searchBST(TreeNode root, int val) {
        // Your logic
        return null;
    }
    // Main...
}`,
            cpp: `TreeNode* searchBST(TreeNode* root, int val) {
    // Your logic
    return NULL;
}
// Main...`
        },
        testCases: [
            { input: '4 2 7 1 3\n2', expectedOutput: '2 1 3', description: 'Found 2' },
            { input: '4 2 7 1 3\n5', expectedOutput: '', description: 'Not found (null implied)' },
            { input: '4 2 7\n4', expectedOutput: '4 2 7', description: 'Found root', hidden: true },
            { input: '4 2 7\n7', expectedOutput: '7', description: 'Found leaf', hidden: true },
            { input: '1\n1', expectedOutput: '1', description: 'Single node', hidden: true }
        ],
    },
    {
        id: 4,
        title: 'Same Tree',
        description: 'Given the roots of two binary trees p and q, write a function to check if they are the same or not.\n\n**Input Format:**\nLine 1: Tree P values\nLine 2: Tree Q values\n\n**Output:**\ntrue or false',
        hint: 'Recursively check if p.val == q.val and left subtrees are same and right subtrees are same.',
        expectedLogicKeywords: ['same', 'equal', 'left', 'right', 'recursive'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read two trees
# Write logic

def isSameTree(p, q):
    # Your logic
    return True`,
            java: `public class Main {
    public static boolean isSameTree(TreeNode p, TreeNode q) {
        // Your logic
        return true;
    }
}`,
            cpp: `bool isSameTree(TreeNode* p, TreeNode* q) {
    // Your logic
    return true;
}`
        },
        testCases: [
            { input: '1 2 3\n1 2 3', expectedOutput: 'true', description: 'Identical' },
            { input: '1 2\n1 -1 2', expectedOutput: 'false', description: 'Different structure' },
            { input: '1\n1', expectedOutput: 'true', description: 'Single node same', hidden: true },
            { input: '1\n2', expectedOutput: 'false', description: 'Single node diff value', hidden: true },
            { input: '\n', expectedOutput: 'true', description: 'Both empty', hidden: true }
        ],
    },
];
