import type { FC, CSSProperties, ReactNode } from "react";
import "./AnimatedShinyText.css";

export interface AnimatedShinyTextProps {
    children: ReactNode;
    className?: string;
    shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
    children,
    className = "",
    shimmerWidth = 100,
}) => {
    return (
        <span
            style={
                {
                    "--shiny-width": `${shimmerWidth}px`,
                } as CSSProperties
            }
            className={`animated-shiny-text ${className}`}
        >
            {children}
        </span>
    );
};

export default AnimatedShinyText;
