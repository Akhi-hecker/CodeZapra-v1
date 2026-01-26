import React from 'react';
import { DsaSectionTemplate } from './DsaSectionTemplate';
import { sectionInfo, topics } from '../../data/dsa/linkedList';
import { codingQuestions } from '../../data/dsa/linkedListQuestions';

export const DsaLinkedListSection: React.FC = () => {
    return (
        <DsaSectionTemplate
            sectionId="linked-list"
            sectionInfo={sectionInfo}
            topics={topics}
            codingQuestions={codingQuestions}
        />
    );
};
