
import type { CodingQuestionData } from '../../types/dsa';

export const codingQuestions: CodingQuestionData[] = [
    {
        id: 1,
        title: 'Bubble Sort',
        description: 'Implement Bubble Sort to sort an array. Bubble Sort works by repeatedly swapping the adjacent elements if they are in wrong order.\n\n**Input Format:**\nFirst line: N (size of array)\nSecond line: N space-separated integers',
        hint: 'Nested loops. Inner loop swaps adjacent elements. Outer loop repeats the process.',
        expectedLogicKeywords: ['swap', 'adjacent', 'bubble', 'order', 'loop'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())
arr = list(map(int, input().split()))

# Write your code here for Bubble Sort function
def bubble_sort(arr):
    pass # Implement logic

# Call function
bubble_sort(arr)

# Print sorted array
print(' '.join(map(str, arr)))`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();

        // Write your code here for Bubble Sort
        for (int i = 0; i < n - 1; i++) {
            // Inner loop logic
        }

        // Print sorted array
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
    for(int i=0; i<n; i++) cin >> arr[i];

    // Write your code here for Bubble Sort

    // Print sorted array
    for(int i=0; i<n; i++) {
        cout << arr[i] << (i < n - 1 ? " " : "");
    }
    return 0;
}`
        },
        testCases: [
            { input: '5\n5 3 8 4 2', expectedOutput: '2 3 4 5 8', description: 'Sort ascending' },
            { input: '3\n1 2 3', expectedOutput: '1 2 3', description: 'Already sorted' },
            { input: '5\n5 4 3 2 1', expectedOutput: '1 2 3 4 5', description: 'Reverse sorted', hidden: true },
            { input: '2\n-1 -5', expectedOutput: '-5 -1', description: 'Negative numbers', hidden: true },
            { input: '1\n100', expectedOutput: '100', description: 'Single element', hidden: true }
        ],
    },
    {
        id: 2,
        title: 'Selection Sort',
        description: 'Implement Selection Sort. It works by repeatedly finding the minimum element from unsorted part and putting it at the beginning.\n\n**Input Format:**\nFirst line: N\nSecond line: N space-separated integers',
        hint: 'Find the minimum element\'s index in the unsorted subarray and swap it with the first element of that subarray.',
        expectedLogicKeywords: ['minimum', 'select', 'swap', 'position', 'unsorted'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())
arr = list(map(int, input().split()))

# Write your code here for Selection Sort

# Print sorted array
print(' '.join(map(str, arr)))`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();

        // Write your code here for Selection Sort

        // Print sorted array
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
    for(int i=0; i<n; i++) cin >> arr[i];

    // Write your code here for Selection Sort

    // Print sorted array
    for(int i=0; i<n; i++) {
        cout << arr[i] << (i < n - 1 ? " " : "");
    }
    return 0;
}`
        },
        testCases: [
            { input: '5\n64 25 12 22 11', expectedOutput: '11 12 22 25 64', description: 'Standard sort' },
            { input: '3\n3 2 1', expectedOutput: '1 2 3', description: 'Reverse sorted' },
            { input: '4\n-1 -2 -3 -4', expectedOutput: '-4 -3 -2 -1', description: 'Negative numbers', hidden: true },
            { input: '2\n0 0', expectedOutput: '0 0', description: 'Duplicates', hidden: true },
            { input: '1\n42', expectedOutput: '42', description: 'Single element', hidden: true }
        ],
    },
    {
        id: 3,
        title: 'Insertion Sort',
        description: 'Implement Insertion Sort. It works by splitting the array into a sorted and unsorted part, picking values from unsorted and placing them correctly in sorted.\n\n**Input Format:**\nFirst line: N\nSecond line: N space-separated integers',
        hint: 'Iterate from the second element. Shift elements in the sorted part that are greater than the key.',
        expectedLogicKeywords: ['insert', 'shift', 'key', 'sorted', 'position'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())
arr = list(map(int, input().split()))

# Write your code here for Insertion Sort

# Print sorted array
print(' '.join(map(str, arr)))`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();

        // Write your code here for Insertion Sort

        // Print sorted array
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
    for(int i=0; i<n; i++) cin >> arr[i];

    // Write your code here for Insertion Sort

    // Print sorted array
    for(int i=0; i<n; i++) {
        cout << arr[i] << (i < n - 1 ? " " : "");
    }
    return 0;
}`
        },
        testCases: [
            { input: '5\n12 11 13 5 6', expectedOutput: '5 6 11 12 13', description: 'Standard sort' },
            { input: '2\n2 1', expectedOutput: '1 2', description: 'Small unsorted' },
            { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5', description: 'Already sorted', hidden: true },
            { input: '5\n5 4 3 2 1', expectedOutput: '1 2 3 4 5', description: 'Reverse sorted', hidden: true },
            { input: '3\n10 10 10', expectedOutput: '10 10 10', description: 'All distinct', hidden: true }
        ],
    },
    {
        id: 4,
        title: 'Merge Sort',
        description: 'Implement Merge Sort. Divide the array into halves, sort them, and merge them.\n\n**Input Format:**\nFirst line: N\nSecond line: N space-separated integers',
        hint: 'Recursively split array until size 1. Then use a "merge" function to combine sorted arrays.',
        expectedLogicKeywords: ['merge', 'split', 'divide', 'half', 'recursive'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())
arr = list(map(int, input().split()))

# Write your code here for Merge Sort

# Print sorted array
print(' '.join(map(str, arr)))`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();

        // Write your code here for Merge Sort

        // Print sorted array
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
    for(int i=0; i<n; i++) cin >> arr[i];

    // Write your code here for Merge Sort

    // Print sorted array
    for(int i=0; i<n; i++) {
        cout << arr[i] << (i < n - 1 ? " " : "");
    }
    return 0;
}`
        },
        testCases: [
            { input: '7\n38 27 43 3 9 82 10', expectedOutput: '3 9 10 27 38 43 82', description: 'Divide and conquer' },
            { input: '1\n5', expectedOutput: '5', description: 'Single element' },
            { input: '6\n5 4 3 2 1 0', expectedOutput: '0 1 2 3 4 5', description: 'Reverse sorted', hidden: true },
            { input: '4\n-5 -10 5 10', expectedOutput: '-10 -5 5 10', description: 'Mixed values', hidden: true },
            { input: '2\n0 0', expectedOutput: '0 0', description: 'Zeros', hidden: true }
        ],
    },
    {
        id: 5,
        title: 'Quick Sort',
        description: 'Implement Quick Sort. Pick a pivot element and partition the array around the picked pivot.\n\n**Input Format:**\nFirst line: N\nSecond line: N space-separated integers',
        hint: 'Partition function places pivot at correct position. Recursive calls on left and right partitions.',
        expectedLogicKeywords: ['pivot', 'partition', 'quick', 'recursive', 'sort'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())
arr = list(map(int, input().split()))

# Write your code here for Quick Sort

# Print sorted array
print(' '.join(map(str, arr)))`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();

        // Write your code here for Quick Sort

        // Print sorted array
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
    for(int i=0; i<n; i++) cin >> arr[i];

    // Write your code here for Quick Sort

    // Print sorted array
    for(int i=0; i<n; i++) {
        cout << arr[i] << (i < n - 1 ? " " : "");
    }
    return 0;
}`
        },
        testCases: [
            { input: '6\n10 7 8 9 1 5', expectedOutput: '1 5 7 8 9 10', description: 'Pivot based sort' },
            { input: '3\n1 2 3', expectedOutput: '1 2 3', description: 'Already sorted' },
            { input: '3\n3 2 1', expectedOutput: '1 2 3', description: 'Reverse sorted', hidden: true },
            { input: '5\n2 2 2 2 2', expectedOutput: '2 2 2 2 2', description: 'All duplicates', hidden: true },
            { input: '1\n-100', expectedOutput: '-100', description: 'Single negative', hidden: true }
        ],
    },
];
