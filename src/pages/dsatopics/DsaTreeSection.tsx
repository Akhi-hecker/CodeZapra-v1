import React from 'react';
import { DsaSectionTemplate } from './DsaSectionTemplate';
import { sectionInfo, topics } from '../../data/dsa/tree';
import { codingQuestions } from '../../data/dsa/treeQuestions';

export const DsaTreeSection: React.FC = () => {
    return (
        <DsaSectionTemplate
            sectionId="tree"
            sectionInfo={sectionInfo}
            topics={topics}
            codingQuestions={codingQuestions}
        />
    );
};
