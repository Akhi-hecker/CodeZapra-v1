import React from 'react';
import { DsaSectionTemplate } from './DsaSectionTemplate';
import { sectionInfo, topics } from '../../data/dsa/queue';
import { codingQuestions } from '../../data/dsa/queueQuestions';

export const DsaQueueSection: React.FC = () => {
    return (
        <DsaSectionTemplate
            sectionId="queue"
            sectionInfo={sectionInfo}
            topics={topics}
            codingQuestions={codingQuestions}
        />
    );
};
