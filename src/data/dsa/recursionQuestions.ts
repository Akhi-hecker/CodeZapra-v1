
import type { CodingQuestionData } from '../../types/dsa';

export const codingQuestions: CodingQuestionData[] = [
    {
        id: 1,
        title: 'Factorial',
        description: 'Write a recursive program to calculate the factorial of a number N.\n\n**Input Format:**\nSingle line: N (integer)',
        hint: 'Factorial(N) = N * Factorial(N-1). Base case: Factorial(0) = 1.',
        expectedLogicKeywords: ['factorial', 'base', 'recursive', 'n', '*'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())

# Write your recursive function
def factorial(n):
    # Base case
    if n == 0:
        return 1
    # Recursive step
    return 1 # Change this

# Call function and print result
print(factorial(n))`,
            java: `import java.util.Scanner;

public class Main {
    // Write your recursive function
    public static int factorial(int n) {
        // Base case
        
        // Recursive step
        return 1; // Change this
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(factorial(n));
    }
}`,
            cpp: `#include <iostream>
using namespace std;

// Write your recursive function
int factorial(int n) {
    // Base case

    // Recursive step
    return 1; // Change this
}

int main() {
    int n;
    cin >> n;
    cout << factorial(n);
    return 0;
}`
        },
        testCases: [
            { input: '5', expectedOutput: '120', description: '5!' },
            { input: '0', expectedOutput: '1', description: '0!' },
            { input: '1', expectedOutput: '1', description: '1!', hidden: true },
            { input: '10', expectedOutput: '3628800', description: 'Large factorial', hidden: true },
            { input: '3', expectedOutput: '6', description: 'Small factorial', hidden: true }
        ],
    },
    {
        id: 2,
        title: 'Fibonacci Sequence',
        description: 'Write a recursive function to return the Nth Fibonacci number. (0, 1, 1, 2, 3, 5...)\n\n**Input Format:**\nSingle line: N (integer)',
        hint: 'Fib(N) = Fib(N-1) + Fib(N-2). Base cases: Fib(0)=0, Fib(1)=1.',
        expectedLogicKeywords: ['fibonacci', 'sum', 'previous', 'base', 'recursive'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())

# Write your recursive function
def fib(n):
    # Base cases
    
    # Recursive step
    return 0 # Change this

# Call function and print result
print(fib(n))`,
            java: `import java.util.Scanner;

public class Main {
    // Write your recursive function
    public static int fib(int n) {
        // Base cases
        
        // Recursive step
        return 0; // Change this
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(fib(n));
    }
}`,
            cpp: `#include <iostream>
using namespace std;

// Write your recursive function
int fib(int n) {
    // Base cases

    // Recursive step
    return 0; // Change this
}

int main() {
    int n;
    cin >> n;
    cout << fib(n);
    return 0;
}`
        },
        testCases: [
            { input: '6', expectedOutput: '8', description: '6th Fib' },
            { input: '10', expectedOutput: '55', description: '10th Fib' },
            { input: '0', expectedOutput: '0', description: '0th Fib', hidden: true },
            { input: '1', expectedOutput: '1', description: '1st Fib', hidden: true },
            { input: '15', expectedOutput: '610', description: '15th Fib', hidden: true }
        ],
    },
    {
        id: 3,
        title: 'Sum of Digits',
        description: 'Write a recursive function to sum the digits of a number. (e.g. 123 -> 6)\n\n**Input Format:**\nSingle line: N (integer)',
        hint: 'Return (n % 10) + sumOfDigits(n / 10).',
        expectedLogicKeywords: ['digit', 'modulo', 'divide', 'sum', 'recursive'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())

# Write your recursive function
def sum_digits(n):
    # Base case
    
    # Recursive step
    return 0 # Change this

# Call function and print result
print(sum_digits(n))`,
            java: `import java.util.Scanner;

public class Main {
    // Write your recursive function
    public static int sumDigits(int n) {
        // Base case
        
        // Recursive step
        return 0; // Change this
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(sumDigits(n));
    }
}`,
            cpp: `#include <iostream>
using namespace std;

// Write your recursive function
int sumDigits(int n) {
    // Base case

    // Recursive step
    return 0; // Change this
}

int main() {
    int n;
    cin >> n;
    cout << sumDigits(n);
    return 0;
}`
        },
        testCases: [
            { input: '1234', expectedOutput: '10', description: 'Sum of 1+2+3+4' },
            { input: '5', expectedOutput: '5', description: 'Single digit' },
            { input: '0', expectedOutput: '0', description: 'Zero', hidden: true },
            { input: '999', expectedOutput: '27', description: 'Multiple 9s', hidden: true },
            { input: '100', expectedOutput: '1', description: 'Powers of 10', hidden: true }
        ],
    },
    {
        id: 4,
        title: 'Print Numbers',
        description: 'Write a recursive function that prints numbers from 1 to N.\n\n**Input Format:**\nSingle line: N (integer)\n**Output:** Space-separated integers',
        hint: 'Call function for N-1 first, then print N. This gives 1 to N order.',
        expectedLogicKeywords: ['print', 'order', 'recursive', 'call', 'n'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())

# Write your recursive function
def print_numbers(n):
    # Base case
    pass
    
    # Recursive step

# Call function
print_numbers(n)`,
            java: `import java.util.Scanner;

public class Main {
    // Write your recursive function
    public static void printNumbers(int n) {
        // Base case
        
        // Recursive step
        // Print N at the end
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        printNumbers(n);
    }
}`,
            cpp: `#include <iostream>
using namespace std;

// Write your recursive function
void printNumbers(int n) {
    // Base case

    // Recursive step
    // Print N
}

int main() {
    int n;
    cin >> n;
    printNumbers(n);
    return 0;
}`
        },
        testCases: [
            { input: '5', expectedOutput: '1 2 3 4 5', description: 'Print 1 to 5' },
            { input: '1', expectedOutput: '1', description: 'Print 1' },
            { input: '3', expectedOutput: '1 2 3', description: 'Print 1 to 3', hidden: true },
            { input: '10', expectedOutput: '1 2 3 4 5 6 7 8 9 10', description: 'Print 1 to 10', hidden: true },
            { input: '2', expectedOutput: '1 2', description: 'Print 1 to 2', hidden: true }
        ],
    },
    {
        id: 5,
        title: 'Count Recursion Depth',
        description: 'Write a recursive function that returns the depth of the recursion for a given input N (i.e., how many times the function calls itself until base case). Visualizing the tree virtually.\n\n**Input Format:**\nSingle line: N (integer)',
        hint: 'Return 1 + recursiveCall(n-1).',
        expectedLogicKeywords: ['depth', 'count', 'stack', 'call', 'recursive'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input
n = int(input())

# Write your recursive function
def depth(n):
    # Base case
    if n == 0:
        return 0
    # Recursive step
    return 1 # Change this

# Call function and print result
print(depth(n))`,
            java: `import java.util.Scanner;

public class Main {
    // Write your recursive function
    public static int depth(int n) {
        // Base case
        
        // Recursive step
        return 1; // Change this
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(depth(n));
    }
}`,
            cpp: `#include <iostream>
using namespace std;

// Write your recursive function
int depth(int n) {
    // Base case

    // Recursive step
    return 1; // Change this
}

int main() {
    int n;
    cin >> n;
    cout << depth(n);
    return 0;
}`
        },
        testCases: [
            { input: '5', expectedOutput: '5', description: 'Depth 5' },
            { input: '1', expectedOutput: '1', description: 'Depth 1' },
            { input: '0', expectedOutput: '0', description: 'Depth 0', hidden: true },
            { input: '10', expectedOutput: '10', description: 'Depth 10', hidden: true },
            { input: '3', expectedOutput: '3', description: 'Depth 3', hidden: true }
        ],
    },
];
