
export interface Topic {
    id: string | number; // This corresponds to the 'slug' in the page components
    slug?: string;
    title: string;
    description?: string;
}

export interface Section {
    id: string; // The sectionId used in page components (e.g., 'arrays', 'strings')
    title: string;
    description: string;
    topics: Topic[];
}

import { sectionInfo as pythonBasicsInfo, topics as pythonBasicsTopics } from './python/basics';

export const PYTHON_COURSE_DATA: Section[] = [
    {
        id: 'basics',
        title: pythonBasicsInfo.title,
        description: pythonBasicsInfo.description,
        topics: pythonBasicsTopics
    },
    // Add other Python sections as they are implemented/verified
];

import { sectionInfo as arraysInfo, topics as arraysTopics } from './dsa/arrays';
import { sectionInfo as stringsInfo, topics as stringsTopics } from './dsa/strings';
import { sectionInfo as searchingInfo, topics as searchingTopics } from './dsa/searching';
import { sectionInfo as sortingInfo, topics as sortingTopics } from './dsa/sorting';
import { sectionInfo as recursionInfo, topics as recursionTopics } from './dsa/recursion';
import { sectionInfo as stackInfo, topics as stackTopics } from './dsa/stack';
import { sectionInfo as queueInfo, topics as queueTopics } from './dsa/queue';
import { sectionInfo as linkedListInfo, topics as linkedListTopics } from './dsa/linkedList';
import { sectionInfo as treeInfo, topics as treeTopics } from './dsa/tree';
import { sectionInfo as graphInfo, topics as graphTopics } from './dsa/graph';

export const DSA_COURSE_DATA: Section[] = [
    {
        id: 'arrays',
        title: arraysInfo.title,
        description: arraysInfo.description,
        topics: arraysTopics
    },
    {
        id: 'strings',
        title: stringsInfo.title,
        description: stringsInfo.description,
        topics: stringsTopics
    },
    {
        id: 'searching',
        title: searchingInfo.title,
        description: searchingInfo.description,
        topics: searchingTopics
    },
    {
        id: 'sorting',
        title: sortingInfo.title,
        description: sortingInfo.description,
        topics: sortingTopics
    },
    {
        id: 'recursion',
        title: recursionInfo.title,
        description: recursionInfo.description,
        topics: recursionTopics
    },
    {
        id: 'stack',
        title: stackInfo.title,
        description: stackInfo.description,
        topics: stackTopics
    },
    {
        id: 'queue',
        title: queueInfo.title,
        description: queueInfo.description,
        topics: queueTopics
    },
    {
        id: 'linked-list',
        title: linkedListInfo.title,
        description: linkedListInfo.description,
        topics: linkedListTopics
    },
    {
        id: 'tree',
        title: treeInfo.title,
        description: treeInfo.description,
        topics: treeTopics
    },
    {
        id: 'graph',
        title: graphInfo.title,
        description: graphInfo.description,
        topics: graphTopics
    }
];
