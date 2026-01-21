import { useState, useEffect } from 'react';

interface TypingAnimationProps {
    text: string;
    speed?: number;
    className?: string;
    delay?: number;
    repeat?: boolean;
}

const TypingAnimation = ({
    text,
    speed = 100,
    className = '',
    delay = 0,
    repeat = true
}: TypingAnimationProps) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setIsStarted(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!isStarted) return;

        let intervalId: ReturnType<typeof setInterval> | null = null;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const runLoop = () => {
            let currentIndex = 0;
            setDisplayedText(''); // Reset text

            intervalId = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    if (intervalId) clearInterval(intervalId);
                    if (repeat) {
                        timeoutId = setTimeout(runLoop, 2000); // 2s pause before repeating
                    }
                }
            }, speed);
        };

        runLoop();

        return () => {
            if (intervalId) clearInterval(intervalId);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [text, speed, isStarted, repeat]);

    return (
        <span className={className}>
            {displayedText}
            <span className="cursor-blink">|</span>
            <style>{`
        .cursor-blink {
          animation: blink 1s step-end infinite;
          font-weight: 400;
          margin-left: 2px;
          background: linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          opacity: 1;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </span>
    );
};

export default TypingAnimation;
