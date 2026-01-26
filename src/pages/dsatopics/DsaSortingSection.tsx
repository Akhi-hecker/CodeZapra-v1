import React from 'react';
import { DsaSectionTemplate } from './DsaSectionTemplate';
import { sectionInfo, topics } from '../../data/dsa/sorting';
import { codingQuestions } from '../../data/dsa/sortingQuestions';

export const DsaSortingSection: React.FC = () => {
    return (
        <DsaSectionTemplate
            sectionId="sorting"
            sectionInfo={sectionInfo}
            topics={topics}
            codingQuestions={codingQuestions}
        />
    );
};
