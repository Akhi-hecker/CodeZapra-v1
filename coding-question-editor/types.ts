export interface TestCase {
  id: number;
  label: string;
  inputs: {
    [key: string]: string;
  };
}

export interface Example {
  id: number;
  input: string;
  output: string;
  explanation?: string;
}

export interface QuestionData {
  id: number;
  title: string;
  description: string;
  examples: Example[];
  constraints: string[];
}
