import { Header, Footer } from '../components/ui';
import {
    Hero,
    HowItWorks,
    LogicFirstDemo,
    Courses,
    WhyThisPlatform,
    CallToAction,
} from '../components/sections';

export const HomePage = () => {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <HowItWorks />
                <LogicFirstDemo />
                <Courses />
                <WhyThisPlatform />
                <CallToAction />
            </main>
            <Footer />
        </>
    );
};

export default HomePage;
