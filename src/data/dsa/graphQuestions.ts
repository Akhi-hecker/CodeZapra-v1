
import type { CodingQuestionData } from '../../types/dsa';

export const codingQuestions: CodingQuestionData[] = [
    {
        id: 1,
        title: 'BFS Traversal',
        description: 'Implement BFS traversal of an undirected graph starting from node 0. Nodes are 0-indexed.\n\n**Input Format:**\nFirst line: V E\nNext E lines: u v (Edge between u and v)\n\n**Output:**\nSpace-separated BFS order starting from 0.',
        hint: 'Use a Queue. operations: Enqueue start, then loop (dequeue, visit, enqueue neighbors).',
        expectedLogicKeywords: ['queue', 'level', 'visit', 'neighbor', 'breadth'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read V and E
import sys
# Increase recursion depth just in case
sys.setrecursionlimit(2000)

def bfs(V, adj):
    # Write your BFS logic here
    # Start from node 0
    # Print nodes space-separated
    pass

# Read Input
input = sys.stdin.read
data = input().split()
iterator = iter(data)

try:
    V = int(next(iterator))
    E = int(next(iterator))
    adj = [[] for _ in range(V)]
    for _ in range(E):
        u = int(next(iterator))
        v = int(next(iterator))
        adj[u].append(v)
        adj[v].append(u) # Undirected
    
    bfs(V, adj)
except StopIteration:
    pass`,
            java: `import java.util.*;

public class Main {
    public static void bfs(int V, ArrayList<ArrayList<Integer>> adj) {
        // Write logic here
        // Print result
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNext()) return;
        int V = sc.nextInt();
        int E = sc.nextInt();
        
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for(int i=0; i<V; i++) adj.add(new ArrayList<>());
        
        for(int i=0; i<E; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        
        bfs(V, adj);
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void bfs(int V, vector<int> adj[]) {
    // Write logic here
}

int main() {
    int V, E;
    cin >> V >> E;
    vector<int> adj[V];
    
    for(int i=0; i<E; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    bfs(V, adj);
    return 0;
}`
        },
        testCases: [
            { input: '5 4\n0 1\n0 2\n0 3\n2 4', expectedOutput: '0 1 2 3 4', description: 'Simple star graph' },
            { input: '3 2\n0 1\n1 2', expectedOutput: '0 1 2', description: 'Line graph' },
            { input: '1 0', expectedOutput: '0', description: 'Single node', hidden: true },
            { input: '4 3\n0 1\n1 2\n1 3', expectedOutput: '0 1 2 3', description: 'Fork', hidden: true },
            { input: '3 3\n0 1\n1 2\n2 0', expectedOutput: '0 1 2', description: 'Cycle', hidden: true }
        ],
    },
    {
        id: 2,
        title: 'DFS Traversal',
        description: 'Implement DFS traversal of an undirected graph starting from node 0.\n\n**Input Format:**\nFirst line: V E\nNext E lines: u v\n\n**Output:**\nSpace-separated DFS order starting from 0.',
        hint: 'Use Recursion or a Stack. Mark visited to avoid cycles.',
        expectedLogicKeywords: ['recursive', 'stack', 'deep', 'visited', 'neighbor'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read V and E
import sys
sys.setrecursionlimit(2000)

def dfs(V, adj):
    # Write your DFS logic here
    pass

# Boilerplate input reading
input = sys.stdin.read
data = input().split()
iterator = iter(data)
try:
    V = int(next(iterator))
    E = int(next(iterator))
    adj = [[] for _ in range(V)]
    for _ in range(E):
        u = int(next(iterator))
        v = int(next(iterator))
        adj[u].append(v)
        adj[v].append(u)
    
    dfs(V, adj)
except: pass`,
            java: `import java.util.*;

public class Main {
    public static void dfs(int V, ArrayList<ArrayList<Integer>> adj) {
        // Write logic
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNext()) return;
        int V = sc.nextInt();
        int E = sc.nextInt();
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for(int i=0; i<V; i++) adj.add(new ArrayList<>());
        for(int i=0; i<E; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        dfs(V, adj);
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

void dfs(int V, vector<int> adj[]) {
    // Write logic
}

int main() {
    int V, E;
    cin >> V >> E;
    vector<int> adj[V];
    for(int i=0; i<E; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    dfs(V, adj);
    return 0;
}`
        },
        testCases: [
            { input: '5 4\n0 1\n1 2\n2 3\n3 4', expectedOutput: '0 1 2 3 4', description: 'Line graph' },
            { input: '3 2\n0 1\n0 2', expectedOutput: '0 1 2', description: 'Branching', hidden: true },
            // Note: Expected output for DFS/BFS can vary based on adjacency list order. Assuming standard sequential add => 0->1, 0->2 => DFS(0)->1... 
            // Correcting expectedOutput for public deterministic test cases is safe. 
            // For now, I'll use simple deterministic structures or update description.
            // Wait, JSON cannot have comments. I must remove them.
            // Also standard adjacency logic adds in order.
            { input: '3 2\n0 1\n0 2', expectedOutput: '0 1 2', description: 'Simple Branch' },
            { input: '1 0', expectedOutput: '0', description: 'Single node', hidden: true },
            { input: '4 3\n0 1\n1 2\n2 3', expectedOutput: '0 1 2 3', description: 'Line', hidden: true },
            { input: '3 3\n0 1\n1 2\n2 0', expectedOutput: '0 1 2', description: 'Cycle', hidden: true }
        ],
    },
    {
        id: 3,
        title: 'Number of Connected Components',
        description: 'Given an undirected graph, find the number of connected components.\n\n**Input Format:**\nV E\nEdges\n\n**Output:**\nInteger count',
        hint: 'Run BFS/DFS from every unvisited node. Increment count for each new traversal triggered.',
        expectedLogicKeywords: ['component', 'visit', 'loop', 'increment', 'bfs'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read V and E
import sys
# Increase recursion depth just in case
sys.setrecursionlimit(2000)

def countComponents(V, adj):
    count = 0
    # Write your logic here
    # Use BFS or DFS to find connected components
    return count

# Read Input
input = sys.stdin.read
data = input().split()
iterator = iter(data)

try:
    if not data: sys.exit(0)
    V = int(next(iterator))
    E = int(next(iterator))
    adj = [[] for _ in range(V)]
    for _ in range(E):
        u = int(next(iterator))
        v = int(next(iterator))
        adj[u].append(v)
        adj[v].append(u)
    
    print(countComponents(V, adj))
except StopIteration:
    pass`,
            java: `import java.util.*;

public class Main {
    public static int countComponents(int V, ArrayList<ArrayList<Integer>> adj) {
        // Write your logic here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNext()) return;
        
        int V = sc.nextInt();
        int E = sc.nextInt();
        
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for(int i=0; i<V; i++) adj.add(new ArrayList<>());
        
        for(int i=0; i<E; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        
        System.out.println(countComponents(V, adj));
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int countComponents(int V, vector<int> adj[]) {
    // Write your logic here
    return 0;
}

int main() {
    int V, E;
    if (!(cin >> V >> E)) return 0;
    
    vector<int> adj[V];
    
    for(int i=0; i<E; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    cout << countComponents(V, adj);
    return 0;
}`
        },
        testCases: [
            { input: '5 3\n0 1\n1 2\n3 4', expectedOutput: '2', description: 'Two components' },
            { input: '3 2\n0 1\n1 2', expectedOutput: '1', description: 'Connected' },
            { input: '3 0', expectedOutput: '3', description: 'Disconnected', hidden: true },
            { input: '1 0', expectedOutput: '1', description: 'Single isolated', hidden: true },
            { input: '4 2\n0 1\n2 3', expectedOutput: '2', description: 'Pairs', hidden: true }
        ],
    },
    {
        id: 4,
        title: 'Detect Cycle (Undirected)',
        description: 'Check if an undirected graph contains a cycle.\n\n**Input Format:**\nV E\nEdges\n\n**Output:**\n"true" or "false"',
        hint: 'During DFS/BFS, if you see a visited neighbor that is NOT your parent, cycle exists.',
        expectedLogicKeywords: ['cycle', 'parent', 'visited', 'neighbor', 'dfs'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read V and E
import sys
sys.setrecursionlimit(2000)

def hasCycle(V, adj):
    # Write your logic here
    # Return True if cycle exists, else False
    return False

# Read Input
input = sys.stdin.read
data = input().split()
iterator = iter(data)

try:
    if not data: sys.exit(0)
    V = int(next(iterator))
    E = int(next(iterator))
    adj = [[] for _ in range(V)]
    for _ in range(E):
        u = int(next(iterator))
        v = int(next(iterator))
        adj[u].append(v)
        adj[v].append(u)
    
    if hasCycle(V, adj):
        print("true")
    else:
        print("false")
except StopIteration:
    pass`,
            java: `import java.util.*;

public class Main {
    public static boolean hasCycle(int V, ArrayList<ArrayList<Integer>> adj) {
        // Write your logic here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNext()) return;
        
        int V = sc.nextInt();
        int E = sc.nextInt();
        
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for(int i=0; i<V; i++) adj.add(new ArrayList<>());
        
        for(int i=0; i<E; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        
        if (hasCycle(V, adj)) {
            System.out.println("true");
        } else {
            System.out.println("false");
        }
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

bool hasCycle(int V, vector<int> adj[]) {
    // Write your logic here
    return false;
}

int main() {
    int V, E;
    if (!(cin >> V >> E)) return 0;
    
    vector<int> adj[V];
    
    for(int i=0; i<E; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    if (hasCycle(V, adj)) {
        cout << "true";
    } else {
        cout << "false";
    }
    return 0;
}`
        },
        testCases: [
            { input: '3 3\n0 1\n1 2\n2 0', expectedOutput: 'true', description: 'Triangle cycle' },
            { input: '3 2\n0 1\n1 2', expectedOutput: 'false', description: 'Line (No cycle)' },
            { input: '4 4\n0 1\n1 2\n2 3\n3 0', expectedOutput: 'true', description: 'Square cycle', hidden: true },
            { input: '4 3\n0 1\n1 2\n1 3', expectedOutput: 'false', description: 'Tree', hidden: true },
            { input: '2 1\n0 1', expectedOutput: 'false', description: 'Edge', hidden: true }
        ],
    },
    {
        id: 5,
        title: 'Shortest Path (Unweighted)',
        description: 'Find the shortest path distance from Node 0 to Node (V-1) in an unweighted graph.\n\n**Output:**\nInteger distance (or -1 if unreachable)',
        hint: 'BFS guarantees shortest path in unweighted graphs.',
        expectedLogicKeywords: ['bfs', 'distance', 'shortest', 'queue', 'level'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read V and E
import sys
from collections import deque

def shortestPath(V, adj):
    # Write your BFS logic here
    # Start at node 0, target is V-1
    return -1

# Read Input
input = sys.stdin.read
data = input().split()
iterator = iter(data)

try:
    if not data: sys.exit(0)
    V = int(next(iterator))
    E = int(next(iterator))
    adj = [[] for _ in range(V)]
    for _ in range(E):
        u = int(next(iterator))
        v = int(next(iterator))
        adj[u].append(v)
        adj[v].append(u)
    
    print(shortestPath(V, adj))
except StopIteration:
    pass`,
            java: `import java.util.*;

public class Main {
    public static int shortestPath(int V, ArrayList<ArrayList<Integer>> adj) {
        // Write your logic here
        // Find shortest path from 0 to V-1
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if(!sc.hasNext()) return;
        
        int V = sc.nextInt();
        int E = sc.nextInt();
        
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for(int i=0; i<V; i++) adj.add(new ArrayList<>());
        
        for(int i=0; i<E; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        
        System.out.println(shortestPath(V, adj));
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int shortestPath(int V, vector<int> adj[]) {
    // Write your logic here
    // Find shortest path from 0 to V-1
    return -1;
}

int main() {
    int V, E;
    if (!(cin >> V >> E)) return 0;
    
    vector<int> adj[V];
    
    for(int i=0; i<E; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    cout << shortestPath(V, adj);
    return 0;
}`
        },
        testCases: [
            { input: '4 4\n0 1\n1 2\n2 3\n0 2', expectedOutput: '2', description: 'Shortest via 0-2-3 (if existing) or 0-1-2-3' },
            { input: '3 2\n0 1\n1 2', expectedOutput: '2', description: 'Line path 0->2' },
            { input: '2 0', expectedOutput: '-1', description: 'Unreachable', hidden: true },
            { input: '1 0', expectedOutput: '0', description: 'Zero distance', hidden: true },
            { input: '3 3\n0 1\n1 2\n0 2', expectedOutput: '1', description: 'Direct edge 0->2', hidden: true }
        ],
    },
];
