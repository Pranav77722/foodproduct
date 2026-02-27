import React from 'react';
import { motion } from 'framer-motion';

const cx = (...classes) => classes.filter(Boolean).join(' ');

const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    className = '',
    icon
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap';

    const variants = {
        default: 'bg-brand-gray/50 text-brand-dark',
        success: 'bg-green-100 text-green-800 border border-green-200',
        warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        danger: 'bg-red-100 text-red-800 border border-red-200',
        brand: 'bg-brand-green/10 text-brand-green border border-brand-green/20'
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
    };

    return (
        <motion.span
            className={cx(
                baseStyles,
                variants[variant],
                sizes[size],
                className
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
        >
            {icon && <span className="mr-1.5 flex-shrink-0">{icon}</span>}
            {children}
        </motion.span>
    );
};

export default Badge;
