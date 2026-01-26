import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { ConfirmationModal } from "../components/ui";
import { PYTHON_COURSE_DATA, DSA_COURSE_DATA, type Section } from "../data/courseData";

const TotalTopicsCount = (data: Section[]) => data.reduce((acc, section) => acc + section.topics.length, 0);

const Profile = () => {
    const { user, logout } = useAuth();
    const { progress, loading, resetSection, isTopicCompleted } = useProgress();
    const navigate = useNavigate();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [resetTarget, setResetTarget] = useState<{ courseId: string; sectionId: string; name: string } | null>(null);
    const [imgError, setImgError] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    // Toggle section expansion
    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
    };

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
    const handleResetPython = () => {
        setResetTarget({ courseId: 'python', sectionId: 'basics', name: 'Python Basics' });
        setIsResetModalOpen(true);
    };
    const handleResetDsa = () => {
        setResetTarget({ courseId: 'dsa', sectionId: 'all', name: 'DSA Course' });
        setIsResetModalOpen(true);
    };

    const confirmLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const confirmReset = async () => {
        if (!resetTarget) return;
        try {
            if (resetTarget.sectionId === 'all') {
                // Reset all sections for course
                const sections = resetTarget.courseId === 'dsa' ? DSA_COURSE_DATA : PYTHON_COURSE_DATA;
                const promises = sections.map(s => resetSection(resetTarget.courseId, s.id));
                await Promise.all(promises);
            } else {
                await resetSection(resetTarget.courseId, resetTarget.sectionId);
            }
            setIsResetModalOpen(false);
            setResetTarget(null);
        } catch (error) {
            console.error("Failed to reset section:", error);
        }
    };

    // Calculate full course completion percentage
    const calculateCourseProgress = (courseId: string, courseData: Section[]) => {
        if (!progress?.[courseId]) return 0;
        let completedCount = 0;
        const total = TotalTopicsCount(courseData);

        courseData.forEach(section => {
            let sectionCompletedTopics = new Set<string>();

            // 1. From Context
            section.topics.forEach(topic => {
                const key = topic.slug || String(topic.id);
                if (isTopicCompleted(courseId, section.id, key)) {
                    sectionCompletedTopics.add(key);
                }
            });

            // 2. From LocalStorage (DSA & Python)
            if (courseId === 'dsa' || courseId === 'python') {
                try {
                    // Use courseId as prefix (dsa_... or python_...)
                    const localKey = `${courseId}_${section.id}_completed`;
                    const saved = localStorage.getItem(localKey);
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        if (Array.isArray(parsed)) {
                            // Helper to map index to topic
                            parsed.forEach((localId: number) => {
                                // localId is 1-based index in the section topics array
                                const idx = localId - 1;
                                if (idx >= 0 && idx < section.topics.length) {
                                    const topic = section.topics[idx];
                                    const key = topic.slug || String(topic.id);
                                    sectionCompletedTopics.add(key);
                                }
                            });
                        }
                    }
                } catch (e) {
                    // ignore
                }
            }
            completedCount += sectionCompletedTopics.size;
        });

        return total > 0 ? Math.round((completedCount / total) * 100) : 0;
    };

    const pythonProgress = calculateCourseProgress('python', PYTHON_COURSE_DATA);
    const dsaProgress = calculateCourseProgress('dsa', DSA_COURSE_DATA);
    const totalProgress = Math.round((pythonProgress + dsaProgress) / 2);

    // Helpers for rendering
    // Render a hierarchical course card
    const renderCourseCard = (
        courseId: string,
        title: string,
        subtitle: string,
        iconUrl: string | React.ReactNode,
        courseData: Section[],
        currentProgress: number,
        resetHandler: () => void,
        colorTheme: string
    ) => {
        const checkTopicUnion = (cId: string, sId: string, topic: any) => {
            const key = topic.slug || String(topic.id);
            // 1. Context check
            if (isTopicCompleted(cId, sId, key)) return true;

            // 2. LocalStorage check (specifically for DSA/Python structure)
            if (cId === 'dsa' || cId === 'python') {
                try {
                    const localKey = `${cId}_${sId}_completed`;
                    const saved = localStorage.getItem(localKey);
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        if (Array.isArray(parsed)) {
                            return parsed.includes(Number(topic.id));
                        }
                    }
                } catch (e) {
                    // ignore
                }
            }
            return false;
        };

        const getCompletedTopicCount = (courseId: string, section: Section) => {
            return section.topics.filter(topic => checkTopicUnion(courseId, section.id, topic)).length;
        };

        return (
            <div className="active-course-section glass-panel" style={{ marginBottom: '2rem' }}>
                <div className="section-header">
                    <div className="course-title-group">
                        {typeof iconUrl === 'string' ? (
                            <img src={iconUrl} alt={title} className="course-icon-lg" />
                        ) : (
                            iconUrl
                        )}
                        <div>
                            <h2>{title}</h2>
                            <span className="course-subtitle">{subtitle}</span>
                        </div>
                    </div>
                    <button
                        className="action-link"
                        onClick={resetHandler}
                        disabled={currentProgress === 0}
                    >
                        Reset Progress
                    </button>
                </div>

                <div className="progress-container-lg">
                    <div className="progress-info">
                        <span>Course Completion</span>
                        <span>{currentProgress}%</span>
                    </div>
                    <div className="progress-track-lg">
                        <div
                            className="progress-fill-lg"
                            style={{
                                width: `${currentProgress}%`,
                                backgroundColor: colorTheme === 'green' ? '#22c55e' : 'var(--color-accent)'
                            }}
                        />
                    </div>
                </div>

                <div className="sections-list">
                    {courseData.map((section) => {
                        const completedCount = getCompletedTopicCount(courseId, section);
                        const totalTopics = section.topics.length;
                        const isCompleted = completedCount === totalTopics && totalTopics > 0;
                        const isExpanded = expandedSections[`${courseId}-${section.id}`];
                        const key = `${courseId}-${section.id}`;

                        return (
                            <div key={section.id} className={`section-item ${isCompleted ? 'completed' : ''}`}>
                                <div
                                    className="section-summary"
                                    onClick={() => toggleSection(key)}
                                >
                                    <div className="section-status-icon">
                                        {isCompleted ? (
                                            <div className="status-icon-check">✓</div>
                                        ) : (
                                            <div className="status-icon-circle">
                                                {/* Mini pie chart or just empty/partial */}
                                                {completedCount > 0 && (
                                                    <svg viewBox="0 0 36 36" className="circular-chart-mini">
                                                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                        <path className="circle"
                                                            strokeDasharray={`${(completedCount / totalTopics) * 100}, 100`}
                                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="section-info-text">
                                        <div className="section-title-row">
                                            <span className="section-title">{section.title}</span>
                                            <span className="section-progress-text">{completedCount}/{totalTopics}</span>
                                        </div>
                                    </div>
                                    <div className={`chevron ${isExpanded ? 'expanded' : ''}`}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="topics-list"
                                        >
                                            {section.topics.map(topic => {
                                                const topicCompleted = checkTopicUnion(courseId, section.id, topic);
                                                return (
                                                    <div key={topic.id} className="topic-item-row">
                                                        <div className={`topic-status-dot ${topicCompleted ? 'completed' : ''}`} />
                                                        <span className={`topic-name ${topicCompleted ? 'completed-text' : ''}`}>
                                                            {topic.title}
                                                        </span>
                                                        {topicCompleted && <span className="topic-check">✓</span>}
                                                    </div>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

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
                                    {user?.photoURL && !imgError ? (
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="banner-avatar"
                                            onError={() => setImgError(true)}
                                        />
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
                            <div className="stat-value">{totalProgress}%</div>
                            <div className="stat-footer">Average across courses</div>
                        </motion.div>

                        <motion.div
                            className="stat-box glass-panel"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="stat-header">
                                <span className="stat-label">Active Courses</span>
                                <div className="icon-box purple">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                                </div>
                            </div>
                            <div className="stat-value">2</div>
                            <div className="stat-footer">Python & DSA</div>
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

                    {/* Python Course Card */}
                    {renderCourseCard(
                        'python',
                        'Python Masterclass',
                        'Complete Course',
                        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
                        PYTHON_COURSE_DATA,
                        pythonProgress,
                        handleResetPython,
                        'blue'
                    )}

                    {/* DSA Course Card */}
                    {renderCourseCard(
                        'dsa',
                        'Data Structures & Algorithms',
                        'Complete Course',
                        <div style={{
                            width: '48px', height: '48px',
                            background: '#DCFCE7', color: '#166534',
                            borderRadius: '12px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            fontWeight: 'bold', fontSize: '14px'
                        }}>DSA</div>,
                        DSA_COURSE_DATA,
                        dsaProgress,
                        handleResetDsa,
                        'green'
                    )}

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
                title={`Reset ${resetTarget?.name || 'Course'} Progress`}
                message={`This will reset your progress in ${resetTarget?.name || 'this course'}. This action cannot be undone.`}
                confirmText="Reset Progress"
                cancelText="Cancel"
                isDangerous={true}
            />

            <style>{`
                /* ... (keeping previous generic styles, updating specific ones) */
                .profile-page {
                    min-height: calc(100vh - 64px);
                    background: #f8fafc;
                    padding: 2rem 1rem;
                    position: relative;
                }
                .profile-bg-glow {
                     position: absolute; top: 0; left: 0; right: 0; height: 300px;
                     background: linear-gradient(180deg, #eff6ff 0%, transparent 100%); z-index: 0;
                }
                .container { max-width: 1000px; margin: 0 auto; position: relative; z-index: 1; }
                .glass-panel { background: white; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border-radius: 16px; overflow: hidden; }

                /* Banner & Stats (simplified copy for brevity, same as before) */
                .profile-banner { padding: 2rem; margin-bottom: 1.5rem; background: white; border-bottom: 4px solid var(--color-accent); }
                .banner-content { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem; }
                .profile-identity { display: flex; align-items: center; gap: 1.5rem; }
                .banner-avatar { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                .banner-avatar-placeholder { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light)); color: white; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                .online-indicator { position: absolute; bottom: 2px; right: 2px; width: 16px; height: 16px; background: #22c55e; border: 2px solid white; border-radius: 50%; }
                .identity-text { display: flex; flex-direction: column; }
                .banner-name { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0; }
                .banner-email { color: #64748b; font-size: 0.95rem; margin: 0.25rem 0 0.5rem; }
                .account-badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; width: fit-content; }
                .account-badge.google { background: #e0f2fe; color: #0369a1; }
                .account-badge.email { background: #dcfce7; color: #15803d; }
                .btn-signout { padding: 0.75rem 1.5rem; border: 1px solid #e2e8f0; background: white; color: #64748b; font-weight: 600; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
                .btn-signout:hover { background: #f8fafc; color: #0f172a; border-color: #cbd5e1; }
                .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
                .stat-box { padding: 1.5rem; }
                .stat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
                .stat-label { color: #64748b; font-size: 0.9rem; font-weight: 500; }
                .icon-box { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
                .icon-box.blue { background: #eff6ff; color: #2563eb; }
                .icon-box.purple { background: #f3e8ff; color: #9333ea; }
                .icon-box.green { background: #dcfce7; color: #16a34a; }
                .stat-value { font-size: 1.75rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem; }
                .stat-footer { font-size: 0.85rem; color: #94a3b8; }

                /* Course Sections Hierarchical UI */
                .active-course-section { padding: 2rem; }
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
                .course-title-group { display: flex; align-items: center; gap: 1rem; }
                .course-icon-lg { width: 48px; height: 48px; }
                .course-title-group h2 { font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0; }
                .course-subtitle { color: #64748b; font-size: 0.9rem; }
                .action-link { background: none; border: none; color: #64748b; font-size: 0.9rem; text-decoration: underline; cursor: pointer; }
                .progress-container-lg { margin-bottom: 2.5rem; }
                .progress-info { display: flex; justify-content: space-between; font-size: 0.9rem; color: #475569; font-weight: 500; margin-bottom: 0.75rem; }
                .progress-track-lg { height: 12px; background: #f1f5f9; border-radius: 999px; overflow: hidden; }
                .progress-fill-lg { height: 100%; border-radius: 999px; transition: width 0.5s ease-out; }

                /* List UI */
                .sections-list { display: flex; flex-direction: column; gap: 1rem; }
                
                .section-item { 
                    border: 1px solid #f1f5f9; 
                    border-radius: 12px; 
                    background: #fff; 
                    overflow: hidden;
                    transition: border-color 0.2s;
                }
                .section-item.completed { border-color: #dcfce7; background: #f0fdf4; }

                .section-summary { 
                    display: flex; 
                    align-items: center; 
                    gap: 1rem; 
                    padding: 1rem; 
                    cursor: pointer; 
                    user-select: none;
                }
                .section-summary:hover { background-color: rgba(0,0,0,0.01); }

                .section-status-icon { flex-shrink: 0; }
                .status-icon-check { 
                    width: 24px; height: 24px; background: #22c55e; color: white; border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center; font-size: 14px; 
                }
                .status-icon-circle { width: 24px; height: 24px; position: relative; display: flex; align-items: center; justify-content: center; border: 2px solid #cbd5e1; border-radius: 50%; }
                .circular-chart-mini { width: 24px; height: 24px; transform: rotate(-90deg); }
                .circle-bg { fill: none; stroke: transparent; stroke-width: 4; }
                .circle { fill: none; stroke: var(--color-accent); stroke-width: 4; stroke-linecap: round; }

                .section-info-text { flex-grow: 1; }
                .section-title-row { display: flex; justify-content: space-between; align-items: center; }
                .section-title { font-weight: 600; color: #1e293b; font-size: 1rem; }
                .section-progress-text { font-size: 0.85rem; color: #64748b; font-weight: 500; }
                
                .chevron { color: #94a3b8; transition: transform 0.2s; }
                .chevron.expanded { transform: rotate(180deg); }

                .topics-list { 
                    background: #f8fafc; 
                    border-top: 1px solid #f1f5f9; 
                    padding: 0.5rem 0;
                }
                .topic-item-row { 
                    display: flex; align-items: center; gap: 0.75rem; 
                    padding: 0.75rem 1rem 0.75rem 3.5rem; 
                    font-size: 0.9rem; color: #475569;
                }
                .topic-status-dot { width: 8px; height: 8px; border-radius: 50%; background: #cbd5e1; }
                .topic-status-dot.completed { background: #22c55e; }
                .topic-name.completed-text { color: #0f172a; font-weight: 500; }
                .topic-check { margin-left: auto; color: #22c55e; font-size: 0.9rem; }

                /* Mobile */
                @media (max-width: 768px) {
                    .banner-content { flex-direction: column; align-items: flex-start; }
                    .banner-actions { width: 100%; }
                    .stats-grid { grid-template-columns: 1fr; }
                    .topic-item-row { padding-left: 1rem; }
                }
                
                .profile-loading { min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #f8fafc; }
                .profile-spinner { width: 40px; height: 40px; border: 3px solid #e2e8f0; border-top-color: var(--color-accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default Profile;
