import { createContext, useContext, useEffect, useState, type ReactNode, useCallback } from "react";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "./AuthContext";

// -----------------------------
// Type Definitions
// -----------------------------

// Progress data for a single topic
interface TopicProgress {
    completed: boolean;
    completedAt?: string;
    quizScore?: number;
    codingCompleted?: boolean;
}

// Progress for a section (collection of topics)
interface SectionProgress {
    [topicId: string]: TopicProgress;
}

// Progress for a course (collection of sections)
interface CourseProgress {
    [sectionId: string]: SectionProgress;
}

// Full user progress (all courses)
interface UserProgress {
    [courseId: string]: CourseProgress;
}

// Context type
interface ProgressContextType {
    progress: UserProgress;
    loading: boolean;
    // Mark a topic as completed
    markTopicComplete: (courseId: string, sectionId: string, topicId: string) => Promise<void>;
    // Save quiz score for a topic
    saveQuizScore: (courseId: string, sectionId: string, topicId: string, score: number) => Promise<void>;
    // Mark coding exercise as completed
    markCodingComplete: (courseId: string, sectionId: string, topicId: string) => Promise<void>;
    // Save arbitrary progress data
    saveProgress: (courseId: string, sectionId: string, data: SectionProgress) => Promise<void>;
    // Reset a section's progress
    resetSection: (courseId: string, sectionId: string) => Promise<void>;
    // Check if a topic is completed
    isTopicCompleted: (courseId: string, sectionId: string, topicId: string) => boolean;
    // Get section completion percentage
    getSectionProgress: (courseId: string, sectionId: string, totalTopics: number) => number;
}

// Create context
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// -----------------------------
// Provider Component
// -----------------------------

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
    const [progress, setProgress] = useState<UserProgress>({});
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Load progress from Firestore when user logs in
    useEffect(() => {
        const loadProgress = async () => {
            if (!user) {
                setProgress({});
                setLoading(false);
                return;
            }

            try {
                const progressRef = doc(db, "users", user.uid);
                const progressSnap = await getDoc(progressRef);

                if (progressSnap.exists()) {
                    const data = progressSnap.data();
                    setProgress(data.progress || {});
                } else {
                    setProgress({});
                }
            } catch (error) {
                console.error("Error loading progress:", error);
                setProgress({});
            } finally {
                setLoading(false);
            }
        };

        loadProgress();
    }, [user]);

    // Helper to save progress to Firestore
    const saveToFirestore = useCallback(async (newProgress: UserProgress) => {
        if (!user) return;

        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { progress: newProgress });
        } catch (error) {
            console.error("Error saving progress:", error);
            throw error;
        }
    }, [user]);

    // Mark a topic as completed
    const markTopicComplete = useCallback(async (
        courseId: string,
        sectionId: string,
        topicId: string
    ) => {
        const newProgress = { ...progress };

        // Initialize nested objects if they don't exist
        if (!newProgress[courseId]) newProgress[courseId] = {};
        if (!newProgress[courseId][sectionId]) newProgress[courseId][sectionId] = {};

        newProgress[courseId][sectionId][topicId] = {
            ...newProgress[courseId][sectionId][topicId],
            completed: true,
            completedAt: new Date().toISOString(),
        };

        setProgress(newProgress);
        await saveToFirestore(newProgress);
    }, [progress, saveToFirestore]);

    // Save quiz score
    const saveQuizScore = useCallback(async (
        courseId: string,
        sectionId: string,
        topicId: string,
        score: number
    ) => {
        const newProgress = { ...progress };

        if (!newProgress[courseId]) newProgress[courseId] = {};
        if (!newProgress[courseId][sectionId]) newProgress[courseId][sectionId] = {};

        newProgress[courseId][sectionId][topicId] = {
            ...newProgress[courseId][sectionId][topicId],
            quizScore: score,
        };

        setProgress(newProgress);
        await saveToFirestore(newProgress);
    }, [progress, saveToFirestore]);

    // Mark coding exercise as completed
    const markCodingComplete = useCallback(async (
        courseId: string,
        sectionId: string,
        topicId: string
    ) => {
        const newProgress = { ...progress };

        if (!newProgress[courseId]) newProgress[courseId] = {};
        if (!newProgress[courseId][sectionId]) newProgress[courseId][sectionId] = {};

        newProgress[courseId][sectionId][topicId] = {
            ...newProgress[courseId][sectionId][topicId],
            codingCompleted: true,
        };

        setProgress(newProgress);
        await saveToFirestore(newProgress);
    }, [progress, saveToFirestore]);

    // Save arbitrary progress data for a section
    const saveProgress = useCallback(async (
        courseId: string,
        sectionId: string,
        data: SectionProgress
    ) => {
        const newProgress = { ...progress };

        if (!newProgress[courseId]) newProgress[courseId] = {};
        newProgress[courseId][sectionId] = {
            ...newProgress[courseId][sectionId],
            ...data,
        };

        setProgress(newProgress);
        await saveToFirestore(newProgress);
    }, [progress, saveToFirestore]);

    // Reset a section's progress
    const resetSection = useCallback(async (courseId: string, sectionId: string) => {
        if (!user) return;

        const newProgress = { ...progress };

        if (newProgress[courseId] && newProgress[courseId][sectionId]) {
            delete newProgress[courseId][sectionId];

            // If course is empty, remove it too
            if (Object.keys(newProgress[courseId]).length === 0) {
                delete newProgress[courseId];
            }
        }

        setProgress(newProgress);

        // Update Firestore
        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                [`progress.${courseId}.${sectionId}`]: deleteField(),
            });
        } catch (error) {
            console.error("Error resetting section:", error);
            throw error;
        }
    }, [progress, user]);

    // Check if a topic is completed
    const isTopicCompleted = useCallback((
        courseId: string,
        sectionId: string,
        topicId: string
    ): boolean => {
        return progress[courseId]?.[sectionId]?.[topicId]?.completed || false;
    }, [progress]);

    // Get section completion percentage
    const getSectionProgress = useCallback((
        courseId: string,
        sectionId: string,
        totalTopics: number
    ): number => {
        if (totalTopics === 0) return 0;

        const section = progress[courseId]?.[sectionId];
        if (!section) return 0;

        const completedTopics = Object.values(section).filter(t => t.completed).length;
        return Math.round((completedTopics / totalTopics) * 100);
    }, [progress]);

    const value: ProgressContextType = {
        progress,
        loading,
        markTopicComplete,
        saveQuizScore,
        markCodingComplete,
        saveProgress,
        resetSection,
        isTopicCompleted,
        getSectionProgress,
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};

// -----------------------------
// Custom Hook
// -----------------------------

// eslint-disable-next-line react-refresh/only-export-components
export const useProgress = (): ProgressContextType => {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error("useProgress must be used within a ProgressProvider");
    }
    return context;
};
