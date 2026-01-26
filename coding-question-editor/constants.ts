import { QuestionData, TestCase } from "./types";

export const QUESTION_DATA: QuestionData = {
  id: 1,
  title: "1. Two Sum",
  description: `Given an array of integers <code class="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400 font-mono">nums</code> and an integer <code class="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400 font-mono">target</code>, return indices of the two numbers such that they add up to <code class="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400 font-mono">target</code>.
  
  You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
  
  You can return the answer in any order.`,
  examples: [
    {
      id: 1,
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      id: 2,
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]"
    }
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists."
  ]
};

export const DEFAULT_TEST_CASES: TestCase[] = [
  {
    id: 1,
    label: "Case 1",
    inputs: {
      nums: "[2,7,11,15]",
      target: "9"
    }
  },
  {
    id: 2,
    label: "Case 2",
    inputs: {
      nums: "[3,2,4]",
      target: "6"
    }
  },
  {
    id: 3,
    label: "Case 3",
    inputs: {
      nums: "[3,3]",
      target: "6"
    }
  }
];

export const INITIAL_CODE_JS = `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Initialize a map to store number and its index
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
};`;
