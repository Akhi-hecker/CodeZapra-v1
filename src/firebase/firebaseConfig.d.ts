import { Auth, AuthProvider } from "firebase/auth";
import { Firestore } from "firebase/firestore";

export const auth: Auth;
export const db: Firestore;
export const googleProvider: AuthProvider;
