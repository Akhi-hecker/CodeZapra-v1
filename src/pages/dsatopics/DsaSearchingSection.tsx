import { DsaSectionTemplate } from './DsaSectionTemplate.tsx';
import { sectionInfo, topics } from '../../data/dsa/searching';
import { codingQuestions } from '../../data/dsa/searchingQuestions';

export const DsaSearchingSection = () => {
    return <DsaSectionTemplate sectionId="searching" sectionInfo={sectionInfo} topics={topics} codingQuestions={codingQuestions} />;
};
