import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage, CoursesPage, HowItWorksPage, AboutPage, PythonCoursePage, TopicLearningPage, PythonBasicsSection, ComingSoonPage, Login, Signup, Profile, ExperiencePage } from './pages';
import { Header, Footer } from './components/ui';

import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // defined behavior 'instant' to override CSS smooth scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

import { Box } from '@chakra-ui/react';

// Layout wrapper for pages with Header and Footer
const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <Box pt="120px" minH="100vh" bg="#f9fafb">
      {children}
    </Box>
    <Footer />
  </>
);

// Smooth cursor disabled due to Chrome compatibility issues
// import GlobalCursorOverride from './components/ui/GlobalCursorOverride';

function App() {
  return (
    <BrowserRouter>
      {/* <GlobalCursorOverride /> */}
      <ScrollToTop />
      {/* <SmoothCursor /> */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/how-it-works"
          element={
            <PageLayout>
              <HowItWorksPage />
            </PageLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PageLayout>
              <AboutPage />
            </PageLayout>
          }
        />

        {/* Protected routes - require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/courses"
            element={
              <PageLayout>
                <CoursesPage />
              </PageLayout>
            }
          />
          <Route
            path="/courses/python"
            element={
              <PageLayout>
                <PythonCoursePage />
              </PageLayout>
            }
          />
          <Route
            path="/courses/python/topic/:topicId"
            element={
              <PageLayout>
                <TopicLearningPage />
              </PageLayout>
            }
          />
          <Route
            path="/courses/python/section/basics"
            element={
              <PageLayout>
                <PythonBasicsSection />
              </PageLayout>
            }
          />
          {/* Coming Soon courses */}
          <Route
            path="/courses/:courseId"
            element={
              <PageLayout>
                <ComingSoonPage />
              </PageLayout>
            }
          />
          {/* Profile page */}
          <Route
            path="/profile"
            element={
              <PageLayout>
                <Profile />
              </PageLayout>
            }
          />
          <Route
            path="/experience/:type"
            element={
              <PageLayout>
                <ExperiencePage />
              </PageLayout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
