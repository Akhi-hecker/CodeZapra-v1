"use client";
import { memo, useMemo } from "react";

export const RainbowBackground = memo(
    ({ className }: { className?: string }) => {

        // Configuration constants
        const PURPLE = "rgba(232, 121, 249, 0.3)";
        const BLUE = "rgba(96, 165, 250, 0.3)";
        const GREEN = "rgba(94, 234, 212, 0.3)";
        const ANIMATION_TIME = 45; // seconds
        const LENGTH = 10;

        // Generate stable values for the 10 beams using deterministic seeding
        const beams = useMemo(() => {
            // Seeded pseudo-random function for deterministic results
            const seededRandom = (seed: number) => {
                const x = Math.sin(seed * 9999) * 10000;
                return x - Math.floor(x);
            };

            return Array.from({ length: LENGTH }, (_, i) => {
                const index = i + 1; // 1-based index to match SCSS logic

                // Deterministic color permutation based on index (1-6)
                const r = Math.floor(seededRandom(index) * 6) + 1;
                let colors = [PURPLE, BLUE, GREEN];

                switch (r) {
                    case 1: colors = [PURPLE, BLUE, GREEN]; break;
                    case 2: colors = [PURPLE, GREEN, BLUE]; break;
                    case 3: colors = [GREEN, PURPLE, BLUE]; break;
                    case 4: colors = [GREEN, BLUE, PURPLE]; break;
                    case 5: colors = [BLUE, GREEN, PURPLE]; break;
                    case 6: colors = [BLUE, PURPLE, GREEN]; break;
                }

                // Animation duration calculation matching SCSS:
                // #{$animationtime - $animationtime / $length / 2 * $i}
                const duration = ANIMATION_TIME - (ANIMATION_TIME / LENGTH / 2 * index);

                // Animation delay calculation matching SCSS:
                // -#{$i / $length * $animationtime}
                const delay = -1 * (index / LENGTH * ANIMATION_TIME);

                return {
                    id: i,
                    colors,
                    duration,
                    delay
                };
            });
        }, []);

        return (
            <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ''}`}>
                <style>
                    {`
            @keyframes slide {
              from {
                transform: translateX(25vw) rotate(10deg);
              }
              to {
                transform: translateX(-125vw) rotate(10deg);
              }
            }
          `}
                </style>

                {/* The Rainbow Beams */}
                {beams.map((beam) => (
                    <div
                        key={beam.id}
                        className="absolute top-0 right-0 w-0 h-screen"
                        style={{
                            transformOrigin: "top right",
                            willChange: "transform",
                            backfaceVisibility: "hidden",
                            perspective: 1000,
                            boxShadow: `
                -130px 0 80px 40px white,
                -50px 0 50px 25px ${beam.colors[0]},
                0 0 50px 25px ${beam.colors[1]},
                50px 0 50px 25px ${beam.colors[2]},
                130px 0 80px 40px white
              `,
                            animation: `${beam.duration}s linear infinite slide`,
                            animationDelay: `${beam.delay}s`,
                        }}
                    />
                ))}

                {/* The .h overlay (horizontal white fade) */}
                <div
                    className="absolute bottom-0 left-0 w-screen h-0"
                    style={{ boxShadow: "0 0 50vh 40vh white" }}
                />

                {/* The .v overlay (vertical white fade) */}
                <div
                    className="absolute bottom-0 left-0 w-0 h-screen"
                    style={{ boxShadow: "0 0 35vw 25vw white" }}
                />
            </div>
        );
    }
);

RainbowBackground.displayName = "RainbowBackground";
export default RainbowBackground;
