
import type { CodingQuestionData } from '../../types/dsa';

export const codingQuestions: CodingQuestionData[] = [
    {
        id: 1,
        title: 'Reverse a String',
        description: 'Write a program to reverse a given string.\n\n**Input Format:**\nA single line containing the string S.\n\n**Output Format:**\nPrint the reversed string.',
        hint: 'Use string slicing [::-1] in Python or a loop.',
        expectedLogicKeywords: ['reverse', 'pointer', 'swap', 'start', 'end'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input string
s = input()

# Write your code here to reverse the string

# Print the result
print(result)`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        
        // Write your code here to reverse the string
        
        // System.out.println(result);
    }
}`,
            cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    // Write your code here to reverse the string
    
    // cout << result << endl;
    return 0;
}`
        },
        testCases: [
            { input: 'hello', expectedOutput: 'olleh', description: 'Basic string', hidden: false },
            { input: 'Hank', expectedOutput: 'knaH', description: 'Mixed case', hidden: false },
            { input: 'racecar', expectedOutput: 'racecar', description: 'Palindrome', hidden: true },
            { input: '123', expectedOutput: '321', description: 'Numbers', hidden: true },
            { input: 'A B C', expectedOutput: 'C B A', description: 'Spaces', hidden: true }
        ],
    },
    {
        id: 2,
        title: 'Palindrome Check',
        description: 'Check if a given string is a palindrome.\n\n**Input Format:**\nA single line containing the string S.\n\n**Output Format:**\nPrint "true" if it is a palindrome, otherwise "false".',
        hint: 'Compare string with its reverse.',
        expectedLogicKeywords: ['palindrome', 'compare', 'match', 'reverse'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input string
s = input()

# Write your logic here
is_palindrome = False

# Print true or false
print("true" if is_palindrome else "false")`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        
        // Write your logic here
        boolean isPalindrome = false;
        
        System.out.println(isPalindrome ? "true" : "false");
    }
}`,
            cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    // Write your logic here
    bool isPalindrome = false;
    
    if(isPalindrome) cout << "true" << endl;
    else cout << "false" << endl;
    return 0;
}`
        },
        testCases: [
            { input: 'racecar', expectedOutput: 'true', description: 'Simple palindrome', hidden: false },
            { input: 'hello', expectedOutput: 'false', description: 'Not a palindrome', hidden: false },
            { input: 'madam', expectedOutput: 'true', description: 'Palindrome word', hidden: true },
            { input: '121', expectedOutput: 'true', description: 'Numeric palindrome', hidden: true },
            { input: 'ab', expectedOutput: 'false', description: 'Short non-palindrome', hidden: true }
        ],
    },
    {
        id: 3,
        title: 'Count Vowels',
        description: 'Count the number of vowels (a, e, i, o, u) in a string (case-insensitive).\n\n**Input Format:**\nA single string S.\n\n**Output Format:**\nPrint the integer count.',
        hint: 'Iterate and check against a set of vowels.',
        expectedLogicKeywords: ['count', 'vowel', 'loop', 'check'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input string
s = input()

# Write your code here to count vowels

print(count)`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        
        // Write your code here
        int count = 0;
        
        System.out.println(count);
    }
}`,
            cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    // Write your code here
    int count = 0;
    
    cout << count << endl;
    return 0;
}`
        },
        testCases: [
            { input: 'hello', expectedOutput: '2', description: 'Basic word', hidden: false },
            { input: 'sky', expectedOutput: '0', description: 'No vowels', hidden: false },
            { input: 'AEIOU', expectedOutput: '5', description: 'All uppercase vowels', hidden: true },
            { input: 'aeiou', expectedOutput: '5', description: 'All lowercase vowels', hidden: true },
            { input: '123', expectedOutput: '0', description: 'No letters', hidden: true }
        ],
    },
    {
        id: 4,
        title: 'String Substrings',
        description: 'Print all substrings of a given string, separated by spaces.\n\n**Input Format:**\nA single string S.\n\n**Output Format:**\nSpace-separated substrings.',
        hint: 'Nested loops: outer for start, inner for end.',
        expectedLogicKeywords: ['loop', 'substring', 'nested', 'print'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input string
s = input()

# Write your code here
substrings = []

# Print space-separated result
print(' '.join(substrings))`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        
        // Write your code here
        
        // Print with spaces
    }
}`,
            cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    // Write your code here
    
    return 0;
}`
        },
        testCases: [
            { input: 'abc', expectedOutput: 'a ab abc b bc c', description: 'Substrings of abc', hidden: false },
            { input: 'a', expectedOutput: 'a', description: 'Single char', hidden: false },
            { input: 'ab', expectedOutput: 'a ab b', description: 'Two chars', hidden: true },
            { input: 'abcd', expectedOutput: 'a ab abc abcd b bc bcd c cd d', description: 'Four chars', hidden: true },
            { input: '1', expectedOutput: '1', description: 'Numeric', hidden: true }
        ],
    },
    {
        id: 5,
        title: 'Remove Duplicates',
        description: 'Remove duplicate characters from a string, keeping the first occurrence.\n\n**Input Format:**\nA single string S.\n\n**Output Format:**\nPrint the modified string.',
        hint: 'Use a set to track seen characters.',
        expectedLogicKeywords: ['set', 'unique', 'seen', 'check'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read input string
s = input()

# Write your code here
result = ""

print(result)`,
            java: `import java.util.Scanner;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        
        // Write your code here
        
        // System.out.println(result);
    }
}`,
            cpp: `#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    // Write your code here
    
    // cout << result << endl;
    return 0;
}`
        },
        testCases: [
            { input: 'banana', expectedOutput: 'ban', description: 'Duplicates', hidden: false },
            { input: 'abc', expectedOutput: 'abc', description: 'No duplicates', hidden: false },
            { input: 'aaaaa', expectedOutput: 'a', description: 'All same', hidden: true },
            { input: 'aabbcc', expectedOutput: 'abc', description: 'Pairs', hidden: true },
            { input: '1212', expectedOutput: '12', description: 'Numeric duplicates', hidden: true }
        ],
    },
    {
        id: 6,
        title: 'Longest Common Prefix',
        description: 'Find longest common prefix.\n\n**Input Format:**\nFirst line N.\nSecond line N space-separated strings.\n\n**Output Format:**\nPrint the prefix.',
        hint: 'Sort and compare first/last.',
        expectedLogicKeywords: ['prefix', 'common', 'compare'],
        minLogicSentences: 1,
        starterCode: {
            python: `# Read N
n = int(input())
# Read strings
strs = input().split()

# Write your code here

# Print result`,
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String[] strs = new String[n];
        for(int i=0; i<n; i++) strs[i] = sc.next();
        
        // Write your code here
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> strs(n);
    for(int i=0; i<n; i++) cin >> strs[i];
    
    // Write your code here
    
    return 0;
}`
        },
        testCases: [
            { input: '3\nflower flow flight', expectedOutput: 'fl', description: 'Common prefix', hidden: false },
            { input: '3\ndog racecar car', expectedOutput: '', description: 'No prefix', hidden: false },
            { input: '2\na ab', expectedOutput: 'a', description: 'Short prefix', hidden: true },
            { input: '2\napple apple', expectedOutput: 'apple', description: 'Identical strings', hidden: true },
            { input: '1\nalone', expectedOutput: 'alone', description: 'Single string', hidden: true }
        ],
    },
];
