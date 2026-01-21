import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import type { User, UserCredential } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase/firebaseConfig";

// Define the shape of our context
interface AuthContextType {
    user: User | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    googleLogin: () => Promise<UserCredential>;
    logout: () => Promise<void>;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to create user document in Firestore
// Only called on first signup or first Google login
const createUserDocument = async (user: User): Promise<void> => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // Only create if document doesn't already exist
    if (!userSnap.exists()) {
        try {
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                createdAt: serverTimestamp(),
                progress: {}, // Empty object for future learning progress
            });
            // User document created in Firestore
        } catch (error) {
            console.error("Error creating user document:", error);
        }
    }
};

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Signup with email/password - creates Firestore document
    const signup = async (email: string, password: string): Promise<UserCredential> => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await createUserDocument(res.user);
        return res;
    };

    // Login with email/password - does NOT create Firestore document
    const login = (email: string, password: string): Promise<UserCredential> => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Login with Google - creates Firestore document on first login
    const googleLogin = async (): Promise<UserCredential> => {
        const res = await signInWithPopup(auth, googleProvider);
        await createUserDocument(res.user);
        return res;
    };

    // Logout
    const logout = (): Promise<void> => {
        return signOut(auth);
    };

    // Subscribe to auth state changes
    // ONLY sets user and loading state - no Firestore writes here
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value: AuthContextType = {
        user,
        loading,
        signup,
        login,
        googleLogin,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
