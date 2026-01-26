import { DsaSectionTemplate } from './DsaSectionTemplate.tsx';
import { sectionInfo, topics } from '../../data/dsa/strings';
import { codingQuestions } from '../../data/dsa/stringsQuestions';

export const DsaStringsSection = () => {
    return <DsaSectionTemplate sectionId="strings" sectionInfo={sectionInfo} topics={topics} codingQuestions={codingQuestions} />;
};
