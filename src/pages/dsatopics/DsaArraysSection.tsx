import { DsaSectionTemplate } from './DsaSectionTemplate.tsx';
import { sectionInfo, topics } from '../../data/dsa/arrays';
import { codingQuestions } from '../../data/dsa/arraysQuestions';

export const DsaArraysSection = () => {
    return <DsaSectionTemplate sectionId="arrays" sectionInfo={sectionInfo} topics={topics} codingQuestions={codingQuestions} />;
};
