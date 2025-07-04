import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

export const ScrollAnimationWrapper = ({ 
  children, 
  animation = "fade-up",
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale-up";
  delay?: number;
  className?: string;
}) => {
  const { ref, isVisible } = useScrollAnimation();

  const getAnimationClasses = () => {
    const base = "transition-all duration-1000 ease-out";
    
    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return `${base} opacity-0 translate-y-20`;
        case "fade-left":
          return `${base} opacity-0 translate-x-20`;
        case "fade-right":
          return `${base} opacity-0 -translate-x-20`;
        case "scale-up":
          return `${base} opacity-0 scale-90`;
        default:
          return `${base} opacity-0 translate-y-20`;
      }
    }

    return `${base} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div 
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};