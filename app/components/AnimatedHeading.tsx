"use client";

import { motion, Variants } from "framer-motion";
import React, { ReactElement, ReactNode } from "react";

interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ children, className = "" }) => {
  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const wordVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const letterVariant: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const animateText = (nodes: ReactNode): ReactNode => {
    return React.Children.map(nodes, (child) => {
      if (typeof child === "string") {
        return child.split(" ").map((word, i) => (
          <motion.span key={i} variants={wordVariant} className="inline-block">
            {word.split("").map((char, j) => (
              <motion.span key={j} variants={letterVariant} className="inline-block">
                {char}
              </motion.span>
            ))}
            &nbsp;
          </motion.span>
        ));
      }

      if (React.isValidElement(child)) {
        const element = child as ReactElement<{ children?: ReactNode }>;
        return React.cloneElement(element, {
          children: animateText(element.props.children),
        });
      }

      return child;
    });
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {animateText(children)}
    </motion.div>
  );
};

export default AnimatedHeading;
