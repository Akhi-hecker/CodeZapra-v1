
import type { CodingQuestionData } from '../../types/dsa';

export const codingQuestions: CodingQuestionData[] = [
    {
        id: 1,
        title: 'Stack Operations',
        description: 'Perform basic stack operations (Push, Pop, Peek). Given a series of queries, process them using a stack.\n\n**Input Format:**\nFirst line: Q (number of queries)\nEach query line: "1 X" (Push X), "2" (Pop), "3" (Peek/Top)\n\n**Output:**\nFor Pop: Print popped element (or -1 if empty)\nFor Peek: Print top element (or -1 if empty)',
        hint: 'Use a dynamic array or built-in stack class. Check for empty stack before pop/peek.',
        expectedLogicKeywords: ['push', 'pop', 'peek', 'top', 'array'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read number of queries
Q = int(input())

stack = []

# Process queries
for _ in range(Q):
    query = list(map(str, input().split()))
    type = int(query[0])
    
    if type == 1:
        # Push query[1]
        pass
    elif type == 2:
        # Pop and print
        pass
    elif type == 3:
        # Peek and print
        pass`,
            java: `import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int Q = sc.nextInt();
        Stack<Integer> stack = new Stack<>();
        
        while(Q-- > 0) {
            int type = sc.nextInt();
            if (type == 1) {
                int x = sc.nextInt();
                // Push logic
            } else if (type == 2) {
                // Pop logic
            } else {
                // Peek logic
            }
        }
    }
}`,
            cpp: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int Q;
    cin >> Q;
    stack<int> s;
    
    while(Q--) {
        int type;
        cin >> type;
        if (type == 1) {
            int x;
            cin >> x;
            // Push logic
        } else if (type == 2) {
            // Pop logic
        } else {
            // Peek logic
        }
    }
    return 0;
}`
        },
        testCases: [
            { input: '5\n1 10\n1 20\n3\n2\n3', expectedOutput: '20\n20\n10', description: 'Push 10, Push 20, Peek(20), Pop(20), Peek(10)' },
            { input: '2\n2\n3', expectedOutput: '-1\n-1', description: 'Empty stack operations' },
            { input: '3\n1 5\n2\n2', expectedOutput: '5\n-1', description: 'Pop until empty', hidden: true },
            { input: '1\n1 100', expectedOutput: '', description: 'Push only', hidden: true },
            { input: '4\n1 1\n1 2\n1 3\n3', expectedOutput: '3', description: 'Push multiple Peek', hidden: true }
        ],
    },
    {
        id: 2,
        title: 'Valid Parentheses',
        description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.\n\n**Input Format:**\nSingle string S\n\n**Output:**\n"true" or "false"',
        hint: 'Use a stack to store opening brackets. Pop when closing matches top.',
        expectedLogicKeywords: ['match', 'balance', 'open', 'close', 'stack'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input string
s = input()

# Write your logic here using a stack

# Print "true" or "false"`,
            java: `import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        
        // Write your logic here
        
        // System.out.println("true" or "false");
    }
}`,
            cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    // Write your logic here

    return 0;
}`
        },
        testCases: [
            { input: '()[]{}', expectedOutput: 'true', description: 'Valid' },
            { input: '(]', expectedOutput: 'false', description: 'Invalid' },
            { input: '((', expectedOutput: 'false', description: 'Unclosed', hidden: true },
            { input: '))', expectedOutput: 'false', description: 'Extra close', hidden: true },
            { input: '{[]}', expectedOutput: 'true', description: 'Nested', hidden: true }
        ],
    },
    {
        id: 3,
        title: 'Reverse String',
        description: 'Reverse a given string using a stack.\n\n**Input Format:**\nSingle string S\n\n**Output:**\nReversed string',
        hint: 'Push all characters to stack, then pop them all to form new string.',
        expectedLogicKeywords: ['reverse', 'lifo', 'push', 'pop', 'order'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input string
s = input()

# Write your logic here to reverse using stack

# Print result`,
            java: `import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        
        // Write your logic here
        
        // Print result
    }
}`,
            cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    // Write your logic here

    return 0;
}`
        },
        testCases: [
            { input: 'hello', expectedOutput: 'olleh', description: 'Reverse' },
            { input: 'a', expectedOutput: 'a', description: 'Single char', hidden: true },
            { input: 'abcd', expectedOutput: 'dcba', description: 'Simple', hidden: true },
            { input: 'racecar', expectedOutput: 'racecar', description: 'Palindrome', hidden: true },
            { input: '12345', expectedOutput: '54321', description: 'Numbers', hidden: true }
        ],
    },
    {
        id: 4,
        title: 'Next Greater Element',
        description: 'For each element in an array, find the next greater element to its right. If none exists, output -1.\n\n**Input Format:**\nFirst line: N\nSecond line: N space-separated integers\n\n**Output:**\nSpace-separated NGEs',
        hint: 'Use a stack to keep track of elements for which we haven\'t found the NGE yet. (Monotonic Stack)',
        expectedLogicKeywords: ['greater', 'next', 'monotonic', 'stack', 'right'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())
nums = list(map(int, input().split()))

# Write your logic here (Monotonic Stack recommended)

# Print result space-separated`,
            java: `import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for(int i=0; i<n; i++) nums[i] = sc.nextInt();
        
        // Write your logic here
        
        // Print result
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];
    
    // Write your logic here

    return 0;
}`
        },
        testCases: [
            { input: '4\n4 5 2 25', expectedOutput: '5 25 25 -1', description: 'NGE' },
            { input: '3\n3 2 1', expectedOutput: '-1 -1 -1', description: 'Decreasing array' },
            { input: '3\n1 2 3', expectedOutput: '2 3 -1', description: 'Ascending array', hidden: true },
            { input: '2\n1 1', expectedOutput: '-1 -1', description: 'Equal elements', hidden: true },
            { input: '1\n10', expectedOutput: '-1', description: 'Single element', hidden: true }
        ],
    },
    {
        id: 5,
        title: 'Min Stack Concept',
        description: 'Design a stack that supports push, pop, top, and checking the minimum element in constant time O(1).\n\n**Input Format:**\nQ queries. "1 X" (Push), "2" (Pop), "3" (Top), "4" (GetMin)\n\n**Output:**\nPrint result for Pop, Top, GetMin.',
        hint: 'Use an auxiliary stack to keep track of minimums at each state.',
        expectedLogicKeywords: ['min', 'auxiliary', 'constant', 'time', 'stack'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read queries
Q = int(input())

# Initialize stacks
stack = []
min_stack = []

for _ in range(Q):
    query = list(map(str, input().split()))
    type = int(query[0])
    
    # Implement logic for Push(1), Pop(2), Top(3), GetMin(4)`,
            java: `import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int Q = sc.nextInt();
        
        Stack<Integer> stack = new Stack<>();
        Stack<Integer> minStack = new Stack<>();
        
        while(Q-- > 0) {
            int type = sc.nextInt();
            // Implement logic
        }
    }
}`,
            cpp: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int Q;
    cin >> Q;
    stack<int> s;
    stack<int> minStack;
    
    while(Q--) {
        int type;
        cin >> type;
        // Implement logic
    }
    return 0;
}`
        },
        testCases: [
            { input: '5\n1 5\n1 3\n4\n2\n4', expectedOutput: '3\n3\n5', description: 'Push 5, Push 3, GetMin(3), Pop(3), GetMin(5)' },
            { input: '2\n1 10\n4', expectedOutput: '10', description: 'Single push min', hidden: true },
            { input: '5\n1 2\n1 1\n4\n2\n4', expectedOutput: '1\n1\n2', description: 'Min update', hidden: true },
            { input: '3\n1 -1\n4\n3', expectedOutput: '-1\n-1', description: 'Negative min', hidden: true },
            { input: '2\n1 5\n3', expectedOutput: '5', description: 'Top vs Min', hidden: true }
        ],
    },
];
