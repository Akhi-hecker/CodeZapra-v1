
import type { Language } from '../../types/dsa';

const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';

export interface PistonResponse {
    language: string;
    version: string;
    run: {
        stdout: string;
        stderr: string;
        output: string;
        code: number;
        signal: string | null;
    };
}

const LANGUAGE_VERSIONS: Record<string, string> = {
    python: '3.10.0',
    java: '15.0.2',
    cpp: '10.2.0',
};

const LANGUAGE_ALIASES: Record<Language, string> = {
    python: 'python',
    java: 'java',
    cpp: 'c++',
};

export const executeCodePiston = async (
    language: Language,
    sourceCode: string,
    stdin: string = ''
): Promise<PistonResponse> => {
    try {
        const response = await fetch(PISTON_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: LANGUAGE_ALIASES[language],
                version: LANGUAGE_VERSIONS[language] || '*',
                files: [
                    {
                        content: sourceCode,
                    },
                ],
                stdin: stdin,
            }),
        });

        if (!response.ok) {
            throw new Error(`Piston API Error: ${response.statusText}`);
        }

        const data: PistonResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Piston Execution Failed:', error);
        throw error;
    }
};
