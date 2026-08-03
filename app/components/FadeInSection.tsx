'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  scrollIntoView?: boolean;
};

const FadeInSection = ({ children, scrollIntoView }: Props) => {
  const [isVisible, setVisible] = useState(true);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollIntoView) {
      setVisible(true);
      return;
    }

    setVisible(false);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });

    const node = domRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [scrollIntoView]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 visible'
          : 'opacity-0 translate-y-24 invisible'
      }`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
