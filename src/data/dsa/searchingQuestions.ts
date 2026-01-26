
import type { CodingQuestionData } from '../../types/dsa';

export const codingQuestions: CodingQuestionData[] = [
    {
        id: 1,
        title: 'Linear Search',
        description: 'Implement a function to find the index of a target element in an array using Linear Search. Return -1 if not found.\n\n**Input Format:**\nFirst line: N (size of array)\nSecond line: N space-separated integers\nThird line: target element',
        hint: 'Iterate through the array and compare each element with the target.',
        expectedLogicKeywords: ['loop', 'compare', 'equal', 'found', 'return'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())
arr = list(map(int, input().split()))
target = int(input())

# Write your code here for Linear Search

# Print index or -1`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        int target = sc.nextInt();

        // Write your code here
        
        // Print result
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cin >> target;

    // Write your code here

    return 0;
}`
        },
        testCases: [
            { input: '3\n10 20 30\n20', expectedOutput: '1', description: 'Found' },
            { input: '2\n1 2\n3', expectedOutput: '-1', description: 'Not found' },
            { input: '5\n1 2 3 4 5\n1', expectedOutput: '0', description: 'Found first', hidden: true },
            { input: '5\n1 2 3 4 5\n5', expectedOutput: '4', description: 'Found last', hidden: true },
            { input: '1\n10\n10', expectedOutput: '0', description: 'Single element found', hidden: true }
        ],
    },
    {
        id: 2,
        title: 'Binary Search',
        description: 'Implement Binary Search on a sorted array. Return index of target, or -1 if not found.\n\n**Input Format:**\nFirst line: N (size of array)\nSecond line: N sorted integers\nThird line: target element',
        hint: 'Use two pointers, low and high. Find mid and adjust pointers based on comparison.',
        expectedLogicKeywords: ['binary', 'mid', 'low', 'high', 'divided'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())
arr = list(map(int, input().split()))
target = int(input())

# Write your code here for Binary Search

# Print index or -1`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();
        int target = sc.nextInt();

        // Write your code here for Binary Search
        
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    cin >> n;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    cin >> target;

    // Write your code here for Binary Search

    return 0;
}`
        },
        testCases: [
            { input: '5\n1 3 5 7 9\n5', expectedOutput: '2', description: 'Found middle' },
            { input: '3\n1 3 5\n2', expectedOutput: '-1', description: 'Not found' },
            { input: '2\n1 2\n1', expectedOutput: '0', description: 'Found start', hidden: true },
            { input: '2\n1 2\n2', expectedOutput: '1', description: 'Found end', hidden: true },
            { input: '1\n10\n10', expectedOutput: '0', description: 'Single element found', hidden: true }
        ],
    },
    {
        id: 3,
        title: 'First & Last Occurrence',
        description: 'Given a sorted array with duplicates, find the starting and ending position of a given target value.\n\n**Input Format:**\nFirst line: N (size of array)\nSecond line: N sorted integers\nThird line: target element\n\n**Output:** Print "first last" space-separated.',
        hint: 'Run binary search twice: once to find the first occurrence (bias left), once for the last (bias right).',
        expectedLogicKeywords: ['occurrence', 'first', 'last', 'index', 'binary'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())
nums = list(map(int, input().split()))
target = int(input())

# Write your code here

# Print "first last"`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for(int i=0; i<n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();

        // Write your code here
        
        // System.out.println(first + " " + last);
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    cin >> n;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];
    cin >> target;

    // Write your code here

    return 0;
}`
        },
        testCases: [
            { input: '6\n5 7 7 8 8 10\n8', expectedOutput: '3 4', description: 'Two occurrences' },
            { input: '6\n5 7 7 8 8 10\n6', expectedOutput: '-1 -1', description: 'Not found' },
            { input: '2\n2 2\n2', expectedOutput: '0 1', description: 'All same', hidden: true },
            { input: '1\n1\n1', expectedOutput: '0 0', description: 'Single element', hidden: true },
            { input: '5\n1 2 3 4 5\n3', expectedOutput: '2 2', description: 'Unique element', hidden: true }
        ],
    },
    {
        id: 4,
        title: 'Search in Sorted Array',
        description: 'Given a sorted array of distinct integers and a target value, return the index if found. If not, return the index where it would be if it were inserted in order.\n\n**Input Format:**\nFirst line: N\nSecond line: N sorted integers\nThird line: target',
        hint: 'Standard binary search, but return "low" if target not found.',
        expectedLogicKeywords: ['insert', 'position', 'sorted', 'index', 'low'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())
nums = list(map(int, input().split()))
target = int(input())

# Write your code here to find index or insert position

# Print result`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for(int i=0; i<n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();

        // Write your code here
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    cin >> n;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];
    cin >> target;

    // Write your code here

    return 0;
}`
        },
        testCases: [
            { input: '4\n1 3 5 6\n5', expectedOutput: '2', description: 'Found' },
            { input: '4\n1 3 5 6\n2', expectedOutput: '1', description: 'Insert position' },
            { input: '4\n1 3 5 6\n7', expectedOutput: '4', description: 'Insert at end', hidden: true },
            { input: '4\n1 3 5 6\n0', expectedOutput: '0', description: 'Insert at start', hidden: true },
            { input: '1\n1\n0', expectedOutput: '0', description: 'Single element insert', hidden: true }
        ],
    },
    {
        id: 5,
        title: 'Search in Rotated Array',
        description: 'There is an integer array nums sorted in ascending order (with distinct values) that is rotated at an unknown pivot index. Given the array nums and an integer target, return the index of target if it is in nums, or -1 if it is not.\n\n**Input Format:**\nFirst line: N\nSecond line: N rotated sorted integers\nThird line: target',
        hint: 'Determine which half is sorted. If target lies in the sorted half, search there; otherwise search the other half.',
        expectedLogicKeywords: ['rotated', 'pivot', 'half', 'sorted', 'compare'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())
nums = list(map(int, input().split()))
target = int(input())

# Write your code here

# Print index or -1`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for(int i=0; i<n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();

        // Write your code here
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    cin >> n;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];
    cin >> target;

    // Write your code here

    return 0;
}`
        },
        testCases: [
            { input: '7\n4 5 6 7 0 1 2\n0', expectedOutput: '4', description: 'Found in second half' },
            { input: '7\n4 5 6 7 0 1 2\n3', expectedOutput: '-1', description: 'Not found' },
            { input: '4\n4 5 6 7\n5', expectedOutput: '1', description: 'Not rotated', hidden: true },
            { input: '5\n5 1 2 3 4\n1', expectedOutput: '1', description: 'Pivot search', hidden: true },
            { input: '3\n3 1 2\n3', expectedOutput: '0', description: 'Pivot start', hidden: true }
        ],
    },
    {
        id: 6,
        title: 'Missing Number',
        description: 'Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.\n\n**Input Format:**\nFirst line: N (size of array input - actually represents range 0..N, so size is N)\nSecond line: N space-separated integers',
        hint: 'Sum of 0 to n minus sum of array elements gives the missing number.',
        expectedLogicKeywords: ['sum', 'missing', 'n', 'subtract', 'edge'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input()) # The array has n elements, range is 0..n thus n+1 numbers expected
nums = list(map(int, input().split()))

# Write your code here

# Print missing number`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for(int i=0; i<n; i++) nums[i] = sc.nextInt();

        // Write your code here
    }
}`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];

    // Write your code here

    return 0;
}`
        },
        testCases: [
            { input: '3\n3 0 1', expectedOutput: '2', description: 'Missing 2' },
            { input: '2\n0 1', expectedOutput: '2', description: 'Missing n' },
            { input: '2\n2 0', expectedOutput: '1', description: 'Missing 1', hidden: true },
            { input: '1\n1', expectedOutput: '0', description: 'Missing 0', hidden: true },
            { input: '1\n0', expectedOutput: '1', description: 'Missing 1 single', hidden: true }
        ],
    },
];
