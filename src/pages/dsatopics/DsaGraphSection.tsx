import React from 'react';
import { DsaSectionTemplate } from './DsaSectionTemplate';
import { sectionInfo, topics } from '../../data/dsa/graph';
import { codingQuestions } from '../../data/dsa/graphQuestions';

export const DsaGraphSection: React.FC = () => {
    return (
        <DsaSectionTemplate
            sectionId="graph"
            sectionInfo={sectionInfo}
            topics={topics}
            codingQuestions={codingQuestions}
        />
    );
};
