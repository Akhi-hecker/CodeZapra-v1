import React from 'react';
import { DsaSectionTemplate } from './DsaSectionTemplate';
import { sectionInfo, topics } from '../../data/dsa/stack';
import { codingQuestions } from '../../data/dsa/stackQuestions';

export const DsaStackSection: React.FC = () => {
    return (
        <DsaSectionTemplate
            sectionId="stack"
            sectionInfo={sectionInfo}
            topics={topics}
            codingQuestions={codingQuestions}
        />
    );
};
