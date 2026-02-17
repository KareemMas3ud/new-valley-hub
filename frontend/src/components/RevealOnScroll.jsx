import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * RevealOnScroll Component
 * 
 * Wraps content and animates it into view when scrolling.
 * Elements start shifted down and fade in as they enter viewport.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} props.delay - Animation delay in seconds (default: 0.2)
 * @param {number} props.duration - Animation duration in seconds (default: 0.5)
 * @param {number} props.yOffset - Initial Y offset in pixels (default: 75)
 */
const RevealOnScroll = ({
    children,
    delay = 0.2,
    duration = 0.5,
    yOffset = 75
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,      // Animate only once
        margin: "-100px" // Trigger slightly before entering viewport
    });

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                y: yOffset
            }}
            animate={isInView ? {
                opacity: 1,
                y: 0
            } : {
                opacity: 0,
                y: yOffset
            }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.4, 0, 0.2, 1] // Custom cubic-bezier for smooth easing
            }}
        >
            {children}
        </motion.div>
    );
};

export default RevealOnScroll;
