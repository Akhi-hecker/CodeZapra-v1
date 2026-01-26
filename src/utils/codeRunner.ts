
import type { Language } from '../types/dsa';
import { executeCodePiston } from './execution/piston';

interface ExecutionResult {
    passed: boolean;
    results: {
        passed: boolean;
        input: string;
        expected: string;
        actual: string;
        description: string;
    }[];
    error?: string;
}

// Map languages to standard command line input format if needed
// For simplicity, we assume test cases are passed via stdin for Piston languages
// or integrated into the code itself if we wanted to be fancy.
// For now, we'll try injecting the input into stdin and expecting output on stdout.

export const executeCode = async (
    language: Language,
    userCode: string,
    testCases: any[]
): Promise<ExecutionResult> => {
    // All languages use Piston remote execution
    return await executeRemotePiston(language, userCode, testCases);
};

const executeRemotePiston = async (
    language: Language,
    code: string,
    testCases: any[]
): Promise<ExecutionResult> => {
    const results: any[] = [];
    let allPassed = true;

    for (const tc of testCases) {
        try {
            // For Piston, we pass input via stdin
            // We use the raw 'input' string which is formatted as text (e.g. "3 1 2 3")
            // inputArgs is reserved for direct function calls in JS
            const stdin = tc.input;

            const response = await executeCodePiston(language, code, String(stdin));

            if (response.run.code !== 0) {
                // Runtime error
                results.push({
                    passed: false,
                    input: tc.input,
                    expected: tc.expectedOutput,
                    actual: `Runtime Error: ${response.run.stderr || response.run.stdout}`,
                    description: tc.description
                });
                allPassed = false;
                continue;
            }

            const actualOutput = response.run.stdout.trim();
            const expectedOutput = String(tc.expectedOutput).trim();

            // Loose comparison (ignore varying whitespace)
            const cleanActual = actualOutput.replace(/\s+/g, '');
            const cleanExpected = expectedOutput.replace(/\s+/g, '');

            const passed = cleanActual === cleanExpected;
            if (!passed) allPassed = false;

            results.push({
                passed,
                input: tc.input,
                expected: tc.expectedOutput,
                actual: actualOutput,
                description: tc.description
            });

        } catch (error: any) {
            results.push({
                passed: false,
                input: tc.input,
                expected: tc.expectedOutput,
                actual: `Execution Error: ${error.message}`,
                description: tc.description
            });
            allPassed = false;
        }
    }

    return {
        passed: allPassed,
        results
    };
};
