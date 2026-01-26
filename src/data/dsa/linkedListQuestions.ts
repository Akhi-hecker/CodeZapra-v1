
import type { CodingQuestionData } from '../../types/dsa';

export const codingQuestions: CodingQuestionData[] = [
    {
        id: 1,
        title: 'Traverse and Print',
        description: 'Given an array converted to a linked list, traverse it and print the data of each node space-separated.\n\n**Input Format:**\nN\nN space-separated integers\n\n**Output:**\nSpace-separated values',
        hint: 'Use a current pointer starting at head, move it via curr.next until null.',
        expectedLogicKeywords: ['current', 'next', 'loop', 'head', 'null'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Node class
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Helper to create list
def create_list(arr):
    if not arr: return None
    head = Node(arr[0])
    curr = head
    for i in range(1, len(arr)):
        curr.next = Node(arr[i])
        curr = curr.next
    return head

# Read input
n = int(input())
if n > 0:
    arr = list(map(int, input().split()))
    head = create_list(arr)
else:
    head = None

# Write your traversal function
def traverse(head):
    # Your logic here
    pass

# Call function
traverse(head)`,
            java: `import java.util.Scanner;

class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}

public class Main {
    // Write your traversal function
    public static void traverse(Node head) {
        // Your logic here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n == 0) return;
        
        Node head = new Node(sc.nextInt());
        Node curr = head;
        for(int i=1; i<n; i++) {
            curr.next = new Node(sc.nextInt());
            curr = curr.next;
        }
        
        traverse(head);
    }
}`,
            cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

// Write your traversal function
void traverse(Node* head) {
    // Your logic here
}

int main() {
    int n;
    cin >> n;
    if (n == 0) return 0;
    
    int val;
    cin >> val;
    Node* head = new Node(val);
    Node* curr = head;
    
    for(int i=1; i<n; i++) {
        cin >> val;
        curr->next = new Node(val);
        curr = curr->next;
    }
    
    traverse(head);
    return 0;
}`
        },
        testCases: [
            { input: '3\n1 2 3', expectedOutput: '1 2 3', description: 'Print all' },
            { input: '1\n5', expectedOutput: '5', description: 'Single Node' },
            { input: '0', expectedOutput: '', description: 'Empty List', hidden: true },
            { input: '4\n1 2 3 4', expectedOutput: '1 2 3 4', description: 'Four nodes', hidden: true },
            { input: '2\n10 20', expectedOutput: '10 20', description: 'Two nodes', hidden: true }
        ],
    },
    {
        id: 2,
        title: 'Insert at Head',
        description: 'Given a linked list and a value, insert the value at the head and print the new list.\n\n**Input Format:**\nN\nN space-separated integers (List)\nValue to Insert',
        hint: 'Create new node, set new.next = head, update head to new node.',
        expectedLogicKeywords: ['new', 'node', 'head', 'next', 'pointer'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Node definition provided...
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def create_list(arr):
    if not arr: return None
    head = Node(arr[0])
    curr = head
    for x in arr[1:]:
        curr.next = Node(x)
        curr = curr.next
    return head

def print_list(head):
    curr = head
    while curr:
        print(curr.data, end=" ")
        curr = curr.next
    print()

# Read input
n = int(input())
if n > 0:
    arr = list(map(int, input().split()))
    head = create_list(arr)
else:
    head = None
val = int(input())

# Write insert function (returns new head)
def insert_head(head, val):
    # Your logic
    return head

# Call and print
new_head = insert_head(head, val)
print_list(new_head)`,
            java: `import java.util.Scanner;

class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}

public class Main {
    // Write insert function
    public static Node insertHead(Node head, int val) {
        // Your logic
        return head; // Change this
    }

    public static void printList(Node head) {
        while(head != null) {
            System.out.print(head.data + " ");
            head = head.next;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Node head = null;
        if(n > 0) {
            head = new Node(sc.nextInt());
            Node curr = head;
            for(int i=1; i<n; i++) {
                curr.next = new Node(sc.nextInt());
                curr = curr.next;
            }
        }
        int val = sc.nextInt();
        
        Node newHead = insertHead(head, val);
        printList(newHead);
    }
}`,
            cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

// Write insert function
Node* insertHead(Node* head, int val) {
    // Your logic
    return head;
}

void printList(Node* head) {
    while(head) {
        cout << head->data << " ";
        head = head->next;
    }
}

int main() {
    int n, val;
    cin >> n;
    Node* head = nullptr;
    if (n > 0) {
        cin >> val;
        head = new Node(val);
        Node* curr = head;
        for(int i=1; i<n; i++) {
            cin >> val;
            curr->next = new Node(val);
            curr = curr->next;
        }
    }
    cin >> val;
    
    Node* newHead = insertHead(head, val);
    printList(newHead);
    return 0;
}`
        },
        testCases: [
            { input: '1\n2\n1', expectedOutput: '1 2', description: 'Insert 1 before 2' },
            { input: '0\n5', expectedOutput: '5', description: 'Insert to empty' },
            { input: '2\n2 3\n1', expectedOutput: '1 2 3', description: 'Insert at head of 2', hidden: true },
            { input: '1\n5\n1', expectedOutput: '1 5', description: 'Insert before single', hidden: true },
            { input: '3\n2 3 4\n1', expectedOutput: '1 2 3 4', description: 'Insert before 3', hidden: true }
        ],
    },
    {
        id: 3,
        title: 'Delete Node by Value',
        description: 'Delete the first occurrence of a key in the linked list.\n\n**Input Format:**\nN\nN integers\nKey to delete',
        hint: 'Keep track of previous node. When current node matches key, set prev.next = current.next.',
        expectedLogicKeywords: ['delete', 'previous', 'current', 'link', 'remove'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Node setup...
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def create_list(arr):
    head = Node(arr[0])
    curr = head
    for x in arr[1:]:
        curr.next = Node(x)
        curr = curr.next
    return head

def print_list(head):
    while head:
        print(head.data, end=" ")
        head = head.next

# Input
n = int(input())
arr = list(map(int, input().split()))
head = create_list(arr)
key = int(input())

# Write delete function
def delete_node(head, key):
    # Your logic
    return head

new_head = delete_node(head, key)
print_list(new_head)`,
            java: `import java.util.Scanner;

class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}

public class Main {
    public static Node deleteNode(Node head, int key) {
        // Your logic here
        return head;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Node head = new Node(sc.nextInt());
        Node curr = head;
        for(int i=1; i<n; i++) {
            curr.next = new Node(sc.nextInt());
            curr = curr.next;
        }
        int key = sc.nextInt();
        
        Node newHead = deleteNode(head, key);
        while(newHead != null) {
            System.out.print(newHead.data + " ");
            newHead = newHead.next;
        }
    }
}`,
            cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

Node* deleteNode(Node* head, int key) {
    // Your logic
    return head;
}

int main() {
    int n, val;
    cin >> n;
    cin >> val;
    Node* head = new Node(val);
    Node* curr = head;
    for(int i=1; i<n; i++) {
        cin >> val;
        curr->next = new Node(val);
        curr = curr->next;
    }
    int key; cin >> key;
    
    Node* newHead = deleteNode(head, key);
    while(newHead) {
        cout << newHead->data << " ";
        newHead = newHead->next;
    }
    return 0;
}`
        },
        testCases: [
            { input: '3\n1 2 3\n2', expectedOutput: '1 3', description: 'Delete middle' },
            { input: '3\n1 2 3\n1', expectedOutput: '2 3', description: 'Delete head' },
            { input: '3\n1 2 3\n3', expectedOutput: '1 2', description: 'Delete tail', hidden: true },
            { input: '3\n1 2 3\n4', expectedOutput: '1 2 3', description: 'Delete non-existent', hidden: true },
            { input: '1\n1\n1', expectedOutput: '', description: 'Delete single', hidden: true }
        ],
    },
    {
        id: 4,
        title: 'Reverse Linked List',
        description: 'Reverse a singly linked list.\n\n**Input Format:**\nN\nN integers',
        hint: 'Use three pointers: prev, curr, next. Rotate links as you iterate.',
        expectedLogicKeywords: ['reverse', 'prev', 'next', 'curr', 'pointer'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Input reading hidden for brevity (assume standard setup)
# Write logic for reverse

def reverse_list(head):
    # Your logic
    return None

# Boilerplate provided to run logic...
import sys
input = sys.stdin.read
data = input().split()
n = int(data[0])
if n==0: exit()
values = map(int, data[1:n+1])

class Node:
    def __init__(self, d): self.data=d; self.next=None

head = Node(int(data[1]))
curr = head
for i in range(2, n+1):
    curr.next = Node(int(data[i]))
    curr = curr.next

head = reverse_list(head)
while head:
    print(head.data, end=" ")
    head = head.next`,
            java: `import java.util.Scanner;

class Node { int data; Node next; Node(int d){data=d;} }

public class Main {
    public static Node reverse(Node head) {
        // Your logic
        return null;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if(n==0) return;
        Node head = new Node(sc.nextInt());
        Node curr = head;
        for(int i=1; i<n; i++) {
            curr.next = new Node(sc.nextInt());
            curr = curr.next;
        }
        head = reverse(head);
        while(head!=null) {
            System.out.print(head.data + " ");
            head = head.next;
        }
    }
}`,
            cpp: `#include <iostream>
using namespace std;

struct Node { int data; Node* next; Node(int d):data(d),next(nullptr){} };

Node* reverse(Node* head) {
    // Your logic
    return nullptr;
}

int main() {
    int n, val; cin >> n;
    if(n==0) return 0;
    cin >> val;
    Node* head = new Node(val);
    Node* curr = head;
    for(int i=1; i<n; i++) {
        cin >> val;
        curr->next = new Node(val);
        curr = curr->next;
    }
    head = reverse(head);
    while(head) {
        cout << head->data << " ";
        head = head->next;
    }
    return 0;
}`
        },
        testCases: [
            { input: '3\n1 2 3', expectedOutput: '3 2 1', description: 'Reverse' },
            { input: '1\n1', expectedOutput: '1', description: 'Single node', hidden: true },
            { input: '2\n1 2', expectedOutput: '2 1', description: 'Two nodes', hidden: true },
            { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1', description: 'Long list', hidden: true },
            { input: '4\n1 1 1 1', expectedOutput: '1 1 1 1', description: 'Identical values', hidden: true }
        ],
    },
    {
        id: 5,
        title: 'Find Middle Node',
        description: 'Find the middle node of a linked list.\n\n**Input Format:**\nN\nN integers\n\n**Output:**\nData at middle node',
        hint: 'Use "Tortoise and Hare" algorithm. Slow moves 1 step, Fast moves 2 steps.',
        expectedLogicKeywords: ['slow', 'fast', 'pointer', 'middle', 'half'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Boilerplate to create list...
# Write logic

def find_middle(head):
    # Return list starting from middle
    # Or just return data
    return head

# Output middle data...
`,
            java: `import java.util.Scanner;
class Node { int data; Node next; Node(int d){data=d;} }

public class Main {
    public static Node findMiddle(Node head) {
        // Your logic
        return head;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Node head = new Node(sc.nextInt());
        Node curr = head;
        for(int i=1; i<n; i++) { curr.next = new Node(sc.nextInt()); curr = curr.next; }
        
        Node mid = findMiddle(head);
        if(mid!=null) System.out.print(mid.data);
    }
}`,
            cpp: `#include <iostream>
using namespace std;
struct Node { int data; Node* next; Node(int d):data(d),next(nullptr){} };

Node* findMiddle(Node* head) {
    // Your logic
    return head;
}

int main() {
    int n, val; cin >> n;
    cin >> val;
    Node* head = new Node(val);
    Node* curr = head;
    for(int i=1; i<n; i++) { cin >> val; curr->next = new Node(val); curr = curr->next; }
    
    Node* mid = findMiddle(head);
    if(mid) cout << mid->data;
    return 0;
}`
        },
        testCases: [
            { input: '5\n1 2 3 4 5', expectedOutput: '3', description: 'Odd length' },
            { input: '4\n1 2 3 4', expectedOutput: '3', description: 'Even length (2nd mid)' },
            { input: '1\n1', expectedOutput: '1', description: 'Single node', hidden: true },
            { input: '2\n1 2', expectedOutput: '2', description: 'Two nodes', hidden: true },
            { input: '3\n1 2 3', expectedOutput: '2', description: 'Three nodes', hidden: true }
        ],
    },
];
