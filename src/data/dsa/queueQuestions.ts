
import type { CodingQuestionData } from '../../types/dsa';

export const codingQuestions: CodingQuestionData[] = [
    {
        id: 1,
        title: 'Queue Operations',
        description: 'Perform basic Queue operations (Enqueue, Dequeue, Peek) to process a series of queries.\n\n**Input Format:**\nFirst line: Q (number of queries)\nEach query: "1 X" (Enqueue X), "2" (Dequeue), "3" (Peek)\n\n**Output:**\nFor Dequeue/Peek: Print result (or -1 if empty)',
        hint: 'Use a dynamic array, list, or built-in queue class. Enqueue adds to rear, Dequeue removes from front.',
        expectedLogicKeywords: ['enqueue', 'dequeue', 'front', 'rear', 'fifo'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read Q
Q = int(input())
queue = []

for _ in range(Q):
    query = list(map(str, input().split()))
    type = int(query[0])
    
    # query[1] has value for Enqueue (Type 1)
    # Implement logic`,
            java: `import java.util.Scanner;
import java.util.LinkedList;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int Q = sc.nextInt();
        Queue<Integer> queue = new LinkedList<>();
        
        while(Q-- > 0) {
            int type = sc.nextInt();
            // Implement logic
        }
    }
}`,
            cpp: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int Q;
    cin >> Q;
    queue<int> q;
    
    while(Q--) {
        int type;
        cin >> type;
        // Implement logic
    }
    return 0;
}`
        },
        testCases: [
            { input: '5\n1 10\n1 20\n3\n2\n3', expectedOutput: '10\n10\n20', description: 'Enq 10, Enq 20, Peek(10), Deq(10), Peek(20)' },
            { input: '2\n2\n3', expectedOutput: '-1\n-1', description: 'Empty operations' },
            { input: '3\n1 5\n2\n2', expectedOutput: '5\n-1', description: 'Pop until empty', hidden: true },
            { input: '2\n1 1\n1 2', expectedOutput: '', description: 'Enqueue only', hidden: true },
            { input: '4\n1 1\n2\n1 2\n3', expectedOutput: '1\n2', description: 'Mixed ops', hidden: true }
        ],
    },
    {
        id: 2,
        title: 'Circular Queue Design',
        description: 'Simulate a Circular Queue of size K. Support Enqueue and Dequeue.\n\n**Input Format:**\nFirst line: K (Size), Q (Queries)\nQueries: "1 X" (Enqueue), "2" (Dequeue)\n\n**Output:**\nEnqueue: Print "true" if successful, "false" if full\nDequeue: Print popped element, or -1 if empty',
        hint: 'Use modulo operator % to wrap around indices (index = (index + 1) % K).',
        expectedLogicKeywords: ['circular', 'modulo', 'wrap', 'implementation', 'pointer'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read K and Q
k, q = map(int, input().split())
queue = [0] * k
# Initialize pointers

for _ in range(q):
    query = list(map(str, input().split()))
    type = int(query[0])
    
    # Implement logic`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int k = sc.nextInt();
        int q = sc.nextInt();
        int[] queue = new int[k];
        
        while(q-- > 0) {
            int type = sc.nextInt();
            // Implement logic
        }
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int k, q;
    cin >> k >> q;
    vector<int> queue(k);
    
    while(q--) {
        int type;
        cin >> type;
        // Implement logic
    }
    return 0;
}`
        },
        testCases: [
            { input: '3 5\n1 10\n1 20\n1 30\n1 40\n2', expectedOutput: 'true\ntrue\ntrue\nfalse\n10', description: 'Fill queue, try overflow, then dequeue' },
            { input: '2 2\n1 5\n2', expectedOutput: 'true\n5', description: 'Basic op', hidden: true },
            { input: '2 3\n1 1\n1 2\n1 3', expectedOutput: 'true\ntrue\nfalse', description: 'Full', hidden: true },
            { input: '2 2\n2\n2', expectedOutput: '-1\n-1', description: 'Empty', hidden: true },
            { input: '3 4\n1 1\n1 2\n2\n1 3', expectedOutput: 'true\ntrue\n1\ntrue', description: 'Circular wrap', hidden: true }
        ],
    },
    {
        id: 3,
        title: 'Generate Binary Numbers',
        description: 'Generate binary numbers from 1 to N using a Queue.\n\n**Input Format:**\nN (integer)\n\n**Output:**\nN space-separated binary strings (1, 10, 11, etc.)',
        hint: 'Start with "1" in queue. Dequeue "1", append "0" ("10") and "1" ("11") then enqueue them back.',
        expectedLogicKeywords: ['binary', 'generate', 'append', 'enqueue', 'dequeue'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read N
n = int(input())

# Use queue to generate binary numbers
# Print result space-separated`,
            java: `import java.util.Scanner;
import java.util.LinkedList;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        // Logic here
    }
}`,
            cpp: `#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Logic here
    
    return 0;
}`
        },
        testCases: [
            { input: '5', expectedOutput: '1 10 11 100 101', description: 'Up to 5' },
            { input: '1', expectedOutput: '1', description: 'Up to 1', hidden: true },
            { input: '2', expectedOutput: '1 10', description: 'Up to 2', hidden: true },
            { input: '10', expectedOutput: '1 10 11 100 101 110 111 1000 1001 1010', description: 'Up to 10', hidden: true },
            { input: '3', expectedOutput: '1 10 11', description: 'Up to 3', hidden: true }
        ],
    },
    {
        id: 4,
        title: 'Queue using Stacks',
        description: 'Implement a Queue using Stacks. Support Enqueue (1 X) and Dequeue (2).\n\n**Input Format:**\nQ queries. "1 X", "2".\n\n**Output:**\nPrint dequeued elements.',
        hint: 'Use two stacks: inputStack and outputStack. Transfer elements when outputStack is empty.',
        expectedLogicKeywords: ['stack', 'two', 'transfer', 'reverse', 'amortized'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read Q
Q = int(input())
stack1 = []
stack2 = []

for _ in range(Q):
    query = list(map(str, input().split()))
    type = int(query[0])
    
    # Implement logic`,
            java: `import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int Q = sc.nextInt();
        Stack<Integer> s1 = new Stack<>();
        Stack<Integer> s2 = new Stack<>();
        
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
    stack<int> s1, s2;
    
    while(Q--) {
        int type;
        cin >> type;
        // Implement logic
    }
    return 0;
}`
        },
        testCases: [
            { input: '5\n1 1\n1 2\n2\n1 3\n2', expectedOutput: '1\n2', description: 'FIFO check' },
            { input: '2\n1 10\n2', expectedOutput: '10', description: 'Enq Deq', hidden: true },
            { input: '1\n1 5', expectedOutput: '', description: 'Enq only', hidden: true },
            { input: '3\n1 1\n2\n1 2', expectedOutput: '1', description: 'Mixed', hidden: true },
            { input: '4\n1 1\n1 2\n2\n2', expectedOutput: '1\n2', description: 'Multiple Deq', hidden: true }
        ],
    },
    {
        id: 5,
        title: 'Reverse First K Elements',
        description: 'Given a queue and an integer K, reverse the first K elements of the queue while leaving the rest in the same relative order.\n\n**Input Format:**\nN K\nN space-separated integers\n\n**Output:**\nModified queue space-separated',
        hint: 'Dequeue K elements into a stack, then enqueue them back. Move remaining (N-K) elements to rear.',
        expectedLogicKeywords: ['reverse', 'k', 'stack', 'enqueue', 'dequeue'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n, k = map(int, input().split())
arr = list(map(int, input().split()))
queue = arr # Treat list as queue

# Write logic here

# Print result`,
            java: `import java.util.Scanner;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        Queue<Integer> q = new LinkedList<>();
        for(int i=0; i<n; i++) q.add(sc.nextInt());
        
        // Write logic here
        
        // Print result
        while(!q.isEmpty()) {
            System.out.print(q.poll() + (q.isEmpty() ? "" : " "));
        }
    }
}`,
            cpp: `#include <iostream>
#include <queue>
#include <stack>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    queue<int> q;
    for(int i=0; i<n; i++) {
        int x; cin >> x; q.push(x);
    }
    
    // Write logic here
    
    // Print result
    while(!q.empty()) {
        cout << q.front() << (q.size() > 1 ? " " : "");
        q.pop();
    }
    return 0;
}`
        },
        testCases: [
            { input: '5 3\n1 2 3 4 5', expectedOutput: '3 2 1 4 5', description: 'Reverse first 3' },
            { input: '2 2\n1 2', expectedOutput: '2 1', description: 'Full reverse', hidden: true },
            { input: '5 0\n1 2 3 4 5', expectedOutput: '1 2 3 4 5', description: 'Zero K', hidden: true },
            { input: '5 5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1', description: 'K = N', hidden: true },
            { input: '4 2\n10 20 30 40', expectedOutput: '20 10 30 40', description: 'K = 2', hidden: true }
        ],
    },
];
