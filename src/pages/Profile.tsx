import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { ConfirmationModal } from "../components/ui";

// Python Basics topics for progress display (matches PythonBasicsSection)
const PYTHON_BASICS_TOPICS = [
    { id: "intro", name: "Introduction to Python" },
    { id: "variables", name: "Variables & Data Types" },
    { id: "operators", name: "Operators & Expressions" },
    { id: "strings", name: "Working with Strings" },
    { id: "input-output", name: "Input & Output" },
];

// All Python course sections for overall progress calculation
const PYTHON_COURSE_SECTIONS = [
    { id: 'basics', topics: 5 },
    { id: 'control-flow', topics: 4 },
    { id: 'functions', topics: 5 },
    { id: 'data-structures', topics: 4 },
    { id: 'problem-solving', topics: 3 },
];

const TOTAL_PYTHON_TOPICS = PYTHON_COURSE_SECTIONS.reduce((sum, s) => sum + s.topics, 0);

const Profile = () => {
    const { user, logout } = useAuth();
    const { progress, isTopicCompleted, resetSection, loading } = useProgress(); // Removed getSectionProgress as we calculate locally if needed
    const navigate = useNavigate();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

    // Determine account type
    const getAccountType = (): string => {
        if (!user) return "Unknown";
        const isGoogleUser = user.providerData.some(
            (provider) => provider.providerId === "google.com"
        );
        return isGoogleUser ? "Google" : "Email";
    };

    // Get display name
    const getDisplayName = (): string => {
        if (!user) return "";
        return user.displayName || user.email?.split("@")[0] || "User";
    };

    const handleLogout = () => setIsLogoutModalOpen(true);
    const handleResetSection = () => setIsResetModalOpen(true);

    const confirmLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const confirmReset = async () => {
        try {
            await resetSection("python", "basics");
            setIsResetModalOpen(false);
        } catch (error) {
            console.error("Failed to reset section:", error);
        }
    };

    // Calculate overall Python course progress
    const getPythonCourseProgress = (): number => {
        if (!progress?.python) return 0;
        let completedTopics = 0;
        for (const section of PYTHON_COURSE_SECTIONS) {
            const sectionProgress = progress.python[section.id];
            if (sectionProgress) {
                completedTopics += Object.values(sectionProgress).filter(
                    (t) => t.completed === true
                ).length;
            }
        }
        return TOTAL_PYTHON_TOPICS > 0 ? Math.round((completedTopics / TOTAL_PYTHON_TOPICS) * 100) : 0;
    };

    const pythonProgress = getPythonCourseProgress();

    if (loading) {
        return (
            <div className="profile-loading">
                <div className="profile-spinner"></div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-bg-glow" />

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Banner Header */}
                    <div className="profile-banner glass-panel">
                        <div className="banner-content">
                            <div className="profile-identity">
                                <div className="avatar-container">
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" className="banner-avatar" />
                                    ) : (
                                        <div className="banner-avatar-placeholder">
                                            {getDisplayName().charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div className="online-indicator" />
                                </div>
                                <div className="identity-text">
                                    <h1 className="banner-name">{getDisplayName()}</h1>
                                    <p className="banner-email">{user?.email}</p>
                                    <div className={`account-badge ${getAccountType().toLowerCase()}`}>
                                        {getAccountType()} Member
                                    </div>
                                </div>
                            </div>

                            <div className="banner-actions">
                                <button className="btn-signout" onClick={handleLogout}>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="stats-grid">
                        <motion.div
                            className="stat-box glass-panel"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="stat-header">
                                <span className="stat-label">Total Progress</span>
                                <div className="icon-box blue">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                </div>
                            </div>
                            <div className="stat-value">{pythonProgress}%</div>
                            <div className="stat-footer">Across all courses</div>
                        </motion.div>

                        <motion.div
                            className="stat-box glass-panel"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="stat-header">
                                <span className="stat-label">Active Course</span>
                                <div className="icon-box purple">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                                </div>
                            </div>
                            <div className="stat-value">Python</div>
                            <div className="stat-footer">Currently Learning</div>
                        </motion.div>

                        <motion.div
                            className="stat-box glass-panel"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="stat-header">
                                <span className="stat-label">Membership</span>
                                <div className="icon-box green">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </div>
                            </div>
                            <div className="stat-value">Active</div>
                            <div className="stat-footer">Full Access</div>
                        </motion.div>
                    </div>

                    {/* Active Course Card */}
                    <div className="active-course-section glass-panel">
                        <div className="section-header">
                            <div className="course-title-group">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" className="course-icon-lg" />
                                <div>
                                    <h2>Python Masterclass</h2>
                                    <span className="course-subtitle">Basics Module</span>
                                </div>
                            </div>
                            <button
                                className="action-link"
                                onClick={handleResetSection}
                                disabled={pythonProgress === 0}
                            >
                                Reset Progress
                            </button>
                        </div>

                        <div className="progress-container-lg">
                            <div className="progress-info">
                                <span>Course Completion</span>
                                <span>{pythonProgress}%</span>
                            </div>
                            <div className="progress-track-lg">
                                <div className="progress-fill-lg" style={{ width: `${pythonProgress}%` }} />
                            </div>
                        </div>

                        <div className="topics-flow">
                            {PYTHON_BASICS_TOPICS.map((topic) => {
                                const isCompleted = isTopicCompleted("python", "basics", topic.id);
                                return (
                                    <div key={topic.id} className={`flow-item ${isCompleted ? 'completed' : ''}`}>
                                        <div className="flow-status">
                                            {isCompleted ? (
                                                <div className="status-icon-check">✓</div>
                                            ) : (
                                                <div className="status-icon-circle" />
                                            )}
                                        </div>
                                        <div className="flow-content">
                                            <span className="topic-text">{topic.name}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>

            <ConfirmationModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={confirmLogout}
                title="Sign Out"
                message="Are you sure you want to sign out of your account?"
                confirmText="Sign Out"
                cancelText="Cancel"
                isDangerous={true}
            />

            <ConfirmationModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onConfirm={confirmReset}
                title="Reset Python Progress"
                message="This will reset all your progress in the Python Basics section. This action cannot be undone."
                confirmText="Reset Progress"
                cancelText="Cancel"
                isDangerous={true}
            />

            <style>{`
                .profile-page {
                    min-height: calc(100vh - 64px);
                    background: #f8fafc;
                    padding: 2rem 1rem;
                    position: relative;
                }

                .profile-bg-glow {
                    position: absolute;
                    top: 0; left: 0; right: 0; height: 300px;
                    background: linear-gradient(180deg, #eff6ff 0%, transparent 100%);
                    z-index: 0;
                }

                .container {
                    max-width: 1000px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                .glass-panel {
                    background: white;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                    border-radius: 16px;
                    overflow: hidden;
                }

                /* Banner */
                .profile-banner {
                    padding: 2rem;
                    margin-bottom: 1.5rem;
                    background: white;
                    border-bottom: 4px solid var(--color-accent);
                }

                .banner-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                }

                .profile-identity {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .avatar-container {
                    position: relative;
                }

                .banner-avatar {
                    width: 80px; height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid white;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                .banner-avatar-placeholder {
                    width: 80px; height: 80px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    font-weight: 700;
                    border: 3px solid white;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                .online-indicator {
                    position: absolute;
                    bottom: 2px; right: 2px;
                    width: 16px; height: 16px;
                    background: #22c55e;
                    border: 2px solid white;
                    border-radius: 50%;
                }

                .identity-text {
                    display: flex;
                    flex-direction: column;
                }

                .banner-name {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                    line-height: 1.2;
                }

                .banner-email {
                    color: #64748b;
                    font-size: 0.95rem;
                    margin: 0.25rem 0 0.5rem;
                }

                .account-badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    border-radius: 999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    width: fit-content;
                }
                .account-badge.google { background: #e0f2fe; color: #0369a1; }
                .account-badge.email { background: #dcfce7; color: #15803d; }

                .btn-signout {
                    padding: 0.75rem 1.5rem;
                    border: 1px solid #e2e8f0;
                    background: white;
                    color: #64748b;
                    font-weight: 600;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-signout:hover {
                    border-color: #cbd5e1;
                    background: #f8fafc;
                    color: #0f172a;
                }

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .stat-box {
                    padding: 1.5rem;
                }

                .stat-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .stat-label {
                    color: #64748b;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .icon-box {
                    width: 36px; height: 36px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .icon-box.blue { background: #eff6ff; color: #2563eb; }
                .icon-box.purple { background: #f3e8ff; color: #9333ea; }
                .icon-box.green { background: #dcfce7; color: #16a34a; }

                .stat-value {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 0.25rem;
                }

                .stat-footer {
                    font-size: 0.85rem;
                    color: #94a3b8;
                }

                /* Active Course */
                .active-course-section {
                    padding: 2rem;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .course-title-group {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .course-icon-lg {
                    width: 48px; height: 48px;
                }

                .course-title-group h2 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                }

                .course-subtitle {
                    color: #64748b;
                    font-size: 0.9rem;
                }

                .action-link {
                    background: none;
                    border: none;
                    color: #64748b;
                    font-size: 0.9rem;
                    text-decoration: underline;
                    cursor: pointer;
                }
                .action-link:hover { color: var(--color-accent); }
                .action-link:disabled { opacity: 0.5; cursor: not-allowed; }

                .progress-container-lg {
                    margin-bottom: 2.5rem;
                }

                .progress-info {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.9rem;
                    color: #475569;
                    font-weight: 500;
                    margin-bottom: 0.75rem;
                }

                .progress-track-lg {
                    height: 12px;
                    background: #f1f5f9;
                    border-radius: 999px;
                    overflow: hidden;
                }

                .progress-fill-lg {
                    height: 100%;
                    background: var(--color-accent);
                    border-radius: 999px;
                    transition: width 0.5s ease-out;
                }

                .topics-flow {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: 1rem;
                }

                .flow-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem;
                    border-radius: 8px;
                    background: #f8fafc;
                    border: 1px solid #f1f5f9;
                }
                .flow-item.completed {
                    background: #f0fdf4;
                    border-color: #dcfce7;
                }

                .status-icon-check {
                    width: 20px; height: 20px;
                    background: #22c55e;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                }

                .status-icon-circle {
                    width: 20px; height: 20px;
                    border: 2px solid #cbd5e1;
                    border-radius: 50%;
                }

                .topic-text {
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: #334155;
                }

                @media (max-width: 768px) {
                    .banner-content { flex-direction: column; align-items: flex-start; }
                    .banner-actions { width: 100%; }
                    .btn-signout { width: 100%; text-align: center; }
                    .stats-grid { grid-template-columns: 1fr; }
                    .section-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
                }

                /* Loading */
                .profile-loading {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f8fafc;
                }
                .profile-spinner {
                    width: 40px; height: 40px;
                    border: 3px solid #e2e8f0;
                    border-top-color: var(--color-accent);
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default Profile;
