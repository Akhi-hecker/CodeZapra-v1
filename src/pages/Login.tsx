import { useState, type FormEvent, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login, googleLogin, user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the original route user tried to access (if any)
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/courses";

    // Redirect if already authenticated
    useEffect(() => {
        if (!loading && user) {
            navigate(from, { replace: true });
        }
    }, [user, loading, navigate, from]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("All fields are required");
            return;
        }

        try {
            setIsLoading(true);
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.message.includes("user-not-found")) {
                    setError("No account found with this email");
                } else if (err.message.includes("wrong-password")) {
                    setError("Incorrect password");
                } else if (err.message.includes("invalid-email")) {
                    setError("Invalid email address");
                } else if (err.message.includes("too-many-requests")) {
                    setError("Too many failed attempts. Please try again later.");
                } else {
                    setError("Failed to log in. Please check your credentials.");
                }
            } else {
                setError("Failed to log in");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        try {
            setIsLoading(true);
            await googleLogin();
            navigate(from, { replace: true });
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.message.includes("popup-closed-by-user")) {
                    setError("Google sign-in was cancelled");
                } else {
                    setError("Failed to sign in with Google");
                }
            } else {
                setError("Failed to sign in with Google");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Show loading while checking auth state
    if (loading) {
        return (
            <div className="auth-loading">
                <div className="auth-spinner"></div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Log in to continue learning</p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="email" className="auth-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="auth-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password" className="auth-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="auth-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            disabled={isLoading}
                        />
                    </div>

                    <button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <div className="auth-divider">
                    <span>or</span>
                </div>

                <button
                    type="button"
                    className="auth-google-button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                >
                    <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Continue with Google
                </button>

                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/signup" className="auth-link">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
