import React from 'react';
import { DsaSectionTemplate } from './DsaSectionTemplate';
import { sectionInfo, topics } from '../../data/dsa/recursion';
import { codingQuestions } from '../../data/dsa/recursionQuestions';

export const DsaRecursionSection: React.FC = () => {
    return (
        <DsaSectionTemplate
            sectionId="recursion"
            sectionInfo={sectionInfo}
            topics={topics}
            codingQuestions={codingQuestions}
        />
    );
};
