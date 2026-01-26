
export interface Topic {
    id: number;
    slug?: string; // Stable ID for progress tracking
    title: string;
    concept: string;
    video: {
        title: string;
        duration: string;
        src: string;
    };
    pdf: {
        filename: string;
        src: string;
        contents: string[];
    };
    quiz: {
        question: string;
        options: string[];
        correct: number;
    }[];
}

export type Language = 'python' | 'java' | 'cpp';

export interface CodingQuestionData {
    id: number;
    title: string;
    description: string;
    hint: string;
    expectedLogicKeywords: string[];
    minLogicSentences: number;
    starterCode: string | Record<Language, string>; // Backwards compatible string (JS) or map
    testCases: {
        input: string;
        expectedOutput: string;
        description: string;
        inputArgs?: any[]; // For local JS execution
        hidden?: boolean; // For backend submission tests
    }[];
}

export interface SectionInfo {
    title: string;
    description: string;
    totalTopics: number;
}
