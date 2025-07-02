import { motion, easeOut } from 'framer-motion';
import React from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0.2,
  duration = 0.8,
  y = 40,
  className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration, ease: easeOut }}
    className={className}
  >
    {children}
  </motion.div>
);

// New: HeroStaggerFadeIn for staggered hero section
export const heroStaggerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

export const heroChildVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

export const HeroStaggerFadeIn: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    variants={heroStaggerVariants}
    initial="hidden"
    animate="show"
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeIn; 