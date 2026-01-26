
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SuccessPopup = ({ isOpen, onClose }: SuccessPopupProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="success-popup-backdrop"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="success-popup-content"
                    >
                        <div className="success-popup-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h3>Awesome!</h3>
                        <p>All hidden test cases passed successfully!</p>
                        <div className="popup-progress-bar">
                            <motion.div
                                className="popup-progress-fill"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                onAnimationComplete={onClose}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
            <style>{`
                .success-popup-backdrop {
                    position: fixed;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    background: rgba(0, 0, 0, 0.2);
                    backdrop-filter: blur(2px);
                }
                .success-popup-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 16px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    border: 1px solid #22c55e;
                    text-align: center;
                    min-width: 320px;
                    max-width: 90%;
                }
                .success-popup-icon {
                    width: 64px;
                    height: 64px;
                    background: #dcfce7;
                    color: #16a34a;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                }
                .success-popup-content h3 {
                    font-size: 1.5rem;
                    color: #111827;
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                }
                .success-popup-content p {
                    color: #4b5563;
                    margin-bottom: 1.5rem;
                }
                .popup-progress-bar {
                    height: 6px;
                    background: #f3f4f6;
                    border-radius: 3px;
                    overflow: hidden;
                    width: 100%;
                }
                .popup-progress-fill {
                    height: 100%;
                    background: #16a34a;
                    border-radius: 3px;
                }
            `}</style>
        </AnimatePresence>
    );
};
