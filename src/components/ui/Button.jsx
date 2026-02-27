import React from 'react';
import { motion } from 'framer-motion';

const cx = (...classes) => classes.filter(Boolean).join(' ');

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    isLoading = false,
    icon,
    iconPosition = 'left',
    className = '',
    onClick,
    type = 'button',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]';

    const variants = {
        primary: 'bg-brand-green text-white hover:bg-brand-lightGreen shadow-soft hover:shadow-premium focus-visible:ring-brand-green',
        secondary: 'bg-brand-orange text-white hover:bg-brand-mutedOrange shadow-soft hover:shadow-premium focus-visible:ring-brand-orange',
        outline: 'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white focus-visible:ring-brand-green',
        ghost: 'text-brand-dark/80 hover:text-brand-green hover:bg-brand-green/10 focus-visible:ring-brand-green',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            type={type}
            className={cx(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth ? 'w-full' : '',
                className
            )}
            disabled={disabled || isLoading}
            onClick={onClick}
            whileTap={!disabled && !isLoading ? { scale: 0.97 } : undefined}
            whileHover={!disabled && !isLoading ? { scale: 1.01 } : undefined}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Processing...
                </>
            ) : (
                <>
                    {icon && iconPosition === 'left' && <span className="mr-2 flex-shrink-0">{icon}</span>}
                    {children}
                    {icon && iconPosition === 'right' && <span className="ml-2 flex-shrink-0">{icon}</span>}
                </>
            )}
        </motion.button>
    );
};

export default Button;
