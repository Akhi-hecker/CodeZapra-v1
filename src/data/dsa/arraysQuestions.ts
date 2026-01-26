
import type { CodingQuestionData } from '../../types/dsa';

export const codingQuestions: CodingQuestionData[] = [
    {
        id: 1,
        title: 'Array Traversal',
        description: 'Write a program to traverse an array and print each element on a new line.\n\n**Input Format:**\nThe first line contains N (size of array).\nThe second line contains N space-separated integers.',
        hint: 'Use a simple for loop to iterate through the array.',
        expectedLogicKeywords: ['loop', 'print', 'iterate', 'each', 'element'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read number of elements
n = int(input())
# Read array elements
arr = list(map(int, input().split()))

# Write your code here to traverse and print each element

`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        // Write your code here to traverse and print each element
        
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Write your code here to traverse and print each element
    
    return 0;
}`
        },
        testCases: [
            { input: '3\n1 2 3', expectedOutput: '1\n2\n3', description: 'Simple array' },
            { input: '1\n10', expectedOutput: '10', description: 'Single element' },
            { input: '5\n10 20 30 40 50', expectedOutput: '10\n20\n30\n40\n50', description: 'Large elements', hidden: true },
            { input: '4\n-1 -2 -3 -4', expectedOutput: '-1\n-2\n-3\n-4', description: 'Negative numbers', hidden: true },
            { input: '2\n0 0', expectedOutput: '0\n0', description: 'Zeros', hidden: true }
        ],
    },
    {
        id: 2,
        title: 'Insert Element at Index',
        description: 'Given an array, insert an element at a specific index.\n\n**Input Format:**\nFirst line: N (size of array)\nSecond line: N space-separated integers\nThird line: index position\nFourth line: element to insert\n\n**Output:** Print the modified array space-separated.',
        hint: 'Shift elements to the right from the insertion point.',
        expectedLogicKeywords: ['insert', 'shift', 'index', 'position'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read array
n = int(input())
arr = list(map(int, input().split()))
index = int(input())
element = int(input())

# Write your code here to insert element at index

# Print the modified array
print(' '.join(map(str, arr)))
`,
            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> arr = new ArrayList<>();
        
        for (int i = 0; i < n; i++) {
            arr.add(sc.nextInt());
        }
        
        int index = sc.nextInt();
        int element = sc.nextInt();
        
        // Write your code here to insert element at index
        
        // Print the modified array
        for (int i = 0; i < arr.size(); i++) {
            System.out.print(arr.get(i) + (i < arr.size() - 1 ? " " : ""));
        }
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    int index, element;
    cin >> index >> element;
    
    // Write your code here to insert element at index
    
    // Print the modified array
    for (int i = 0; i < arr.size(); i++) {
        cout << arr[i] << (i < arr.size() - 1 ? " " : "");
    }
    
    return 0;
}`
        },
        testCases: [
            { input: '3\n1 2 3\n1\n5', expectedOutput: '1 5 2 3', description: 'Insert in middle' },
            { input: '3\n1 2 3\n0\n0', expectedOutput: '0 1 2 3', description: 'Insert at start' },
            { input: '2\n1 2\n2\n3', expectedOutput: '1 2 3', description: 'Insert at end', hidden: true },
            { input: '1\n10\n0\n5', expectedOutput: '5 10', description: 'Insert at start single', hidden: true },
            { input: '4\n1 3 5 7\n1\n2', expectedOutput: '1 2 3 5 7', description: 'Insert in sorted', hidden: true }
        ],
    },
    {
        id: 3,
        title: 'Find Min and Max',
        description: 'Given an array of numbers, find the minimum and maximum values.\n\n**Input Format:**\nFirst line: N (size of array)\nSecond line: N space-separated integers\n\n**Output:** Print min and max on separate lines.',
        hint: 'Initialize min and max with the first element, then compare with rest.',
        expectedLogicKeywords: ['min', 'max', 'compare', 'loop', 'update'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read array
n = int(input())
arr = list(map(int, input().split()))

# Write your code here to find min and max

# Print min and max
print(min_val)
print(max_val)
`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        // Write your code here to find min and max
        int minVal = arr[0];
        int maxVal = arr[0];
        
        // Your logic here
        
        System.out.println(minVal);
        System.out.println(maxVal);
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Write your code here to find min and max
    int minVal = arr[0];
    int maxVal = arr[0];
    
    // Your logic here
    
    cout << minVal << endl;
    cout << maxVal << endl;
    
    return 0;
}`
        },
        testCases: [
            { input: '5\n3 1 4 1 5', expectedOutput: '1\n5', description: 'Standard array' },
            { input: '1\n100', expectedOutput: '100\n100', description: 'Single element' },
            { input: '4\n-5 -1 -10 -3', expectedOutput: '-10\n-1', description: 'Negative numbers', hidden: true },
            { input: '3\n0 0 0', expectedOutput: '0\n0', description: 'All zeros', hidden: true },
            { input: '5\n10 20 30 40 50', expectedOutput: '10\n50', description: 'Sorted input', hidden: true }
        ],
    },
    {
        id: 4,
        title: 'Prefix Sum Array',
        description: 'Given an array, calculate the prefix sum array where the i-th element is the sum of all elements from index 0 to i.\n\n**Input Format:**\nFirst line: N (size of array)\nSecond line: N space-separated integers\n\n**Output:** Print prefix sum array space-separated.',
        hint: 'result[i] = result[i-1] + arr[i] for i > 0',
        expectedLogicKeywords: ['sum', 'previous', 'add', 'loop', 'cumulative'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read array
n = int(input())
arr = list(map(int, input().split()))

# Write your code here to calculate prefix sum
prefix = []

# Your logic here

# Print prefix sum array
print(' '.join(map(str, prefix)))
`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        int[] prefix = new int[n];
        
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        // Write your code here to calculate prefix sum
        
        // Print prefix sum array
        for (int i = 0; i < n; i++) {
            System.out.print(prefix[i] + (i < n - 1 ? " " : ""));
        }
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    vector<int> prefix(n);
    
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Write your code here to calculate prefix sum
    
    // Print prefix sum array
    for (int i = 0; i < n; i++) {
        cout << prefix[i] << (i < n - 1 ? " " : "");
    }
    
    return 0;
}`
        },
        testCases: [
            { input: '4\n1 2 3 4', expectedOutput: '1 3 6 10', description: 'Standard sequence' },
            { input: '3\n1 1 1', expectedOutput: '1 2 3', description: 'Uniform values' },
            { input: '5\n5 0 0 5 0', expectedOutput: '5 5 5 10 10', description: 'With zeros', hidden: true },
            { input: '2\n-1 -1', expectedOutput: '-1 -2', description: 'Negative values', hidden: true },
            { input: '1\n42', expectedOutput: '42', description: 'Single element', hidden: true }
        ],
    },
    {
        id: 5,
        title: 'Rotate Array',
        description: 'Rotate an array to the right by K steps, where K is non-negative.\n\n**Input Format:**\nFirst line: N K (size and rotation count)\nSecond line: N space-separated integers\n\n**Output:** Print rotated array space-separated.',
        hint: 'Use modulo to handle K > N. Can reverse sections or use extra space.',
        expectedLogicKeywords: ['rotate', 'reverse', 'modulo', 'shift'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n, k = map(int, input().split())
arr = list(map(int, input().split()))

# Write your code here to rotate array right by k steps

# Print rotated array
print(' '.join(map(str, arr)))
`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] arr = new int[n];
        
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        // Write your code here to rotate array right by k steps
        
        // Print rotated array
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + (i < n - 1 ? " " : ""));
        }
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> arr(n);
    
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Write your code here to rotate array right by k steps
    
    // Print rotated array
    for (int i = 0; i < n; i++) {
        cout << arr[i] << (i < n - 1 ? " " : "");
    }
    
    return 0;
}`
        },
        testCases: [
            { input: '5 2\n1 2 3 4 5', expectedOutput: '4 5 1 2 3', description: 'Rotate by 2' },
            { input: '2 3\n1 2', expectedOutput: '2 1', description: 'Rotate > length' },
            { input: '4 0\n1 2 3 4', expectedOutput: '1 2 3 4', description: 'No rotation', hidden: true },
            { input: '4 4\n1 2 3 4', expectedOutput: '1 2 3 4', description: 'Full rotation', hidden: true },
            { input: '1 5\n10', expectedOutput: '10', description: 'Single element', hidden: true }
        ],
    },
    {
        id: 6,
        title: 'Move Zeros to End',
        description: 'Given an integer array, move all 0s to the end of it while maintaining the relative order of the non-zero elements.\n\n**Input Format:**\nFirst line: N (size of array)\nSecond line: N space-separated integers\n\n**Output:** Print modified array space-separated.',
        hint: 'Use two-pointer technique: one for current position, one for next non-zero.',
        expectedLogicKeywords: ['pointer', 'swap', 'non-zero', 'loop', 'order'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read array
n = int(input())
arr = list(map(int, input().split()))

# Write your code here to move zeros to end

# Print modified array
print(' '.join(map(str, arr)))
`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        // Write your code here to move zeros to end
        
        // Print modified array
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + (i < n - 1 ? " " : ""));
        }
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Write your code here to move zeros to end
    
    // Print modified array
    for (int i = 0; i < n; i++) {
        cout << arr[i] << (i < n - 1 ? " " : "");
    }
    
    return 0;
}`
        },
        testCases: [
            { input: '5\n0 1 0 3 12', expectedOutput: '1 3 12 0 0', description: 'Standard case' },
            { input: '3\n0 0 1', expectedOutput: '1 0 0', description: 'Zeros at start' },
            { input: '4\n1 2 3 4', expectedOutput: '1 2 3 4', description: 'No zeros', hidden: true },
            { input: '2\n0 0', expectedOutput: '0 0', description: 'All zeros', hidden: true },
            { input: '3\n4 0 5', expectedOutput: '4 5 0', description: 'Zeros in middle', hidden: true }
        ],
    },
];
