import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const presets = {
    fadeUp: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
    fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    scaleIn: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
    slideRight: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    slideLeft: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
};

const AnimateIn = ({
    children,
    preset = 'fadeUp',
    delay = 0,
    duration = 0.5,
    className = '',
    once = true,
    amount = 0.15,
    as = 'div',
}) => {
    const shouldReduce = useReducedMotion();

    const variants = presets[preset] || presets.fadeUp;
    const MotionTag = motion[as] || motion.div;

    if (shouldReduce) {
        const Tag = as;
        return <Tag className={className}>{children}</Tag>;
    }

    return (
        <MotionTag
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={variants}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </MotionTag>
    );
};

export default AnimateIn;
