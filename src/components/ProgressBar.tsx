import "./ProgressBar.css";

interface ProgressBarProps {
    /** Percentage value (0-100) */
    value: number;
    /** Optional label to display */
    label?: string;
    /** Show percentage text */
    showPercentage?: boolean;
    /** Size variant */
    size?: "sm" | "md" | "lg";
}

/**
 * Reusable ProgressBar component
 * Displays a horizontal progress indicator with optional label
 */
const ProgressBar = ({
    value,
    label,
    showPercentage = true,
    size = "md",
}: ProgressBarProps) => {
    // Clamp value between 0 and 100
    const percentage = Math.min(100, Math.max(0, Math.round(value)));

    return (
        <div className={`progress-bar-wrapper progress-bar-${size}`}>
            {(label || showPercentage) && (
                <div className="progress-bar-header">
                    {label && <span className="progress-bar-label">{label}</span>}
                    {showPercentage && (
                        <span className="progress-bar-percentage">{percentage}%</span>
                    )}
                </div>
            )}
            <div className="progress-bar-track">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
