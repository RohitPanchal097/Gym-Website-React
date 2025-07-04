import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP animations will be scoped to this context
    }, ref);

    return () => ctx.revert(); // cleanup
  }, []);

  return ref;
};

export { gsap, ScrollTrigger };