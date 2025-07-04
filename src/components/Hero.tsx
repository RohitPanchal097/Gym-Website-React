import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Play, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline();
      
      // Background zoom and fade in
      tl.fromTo(backgroundRef.current, 
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      )
      // Title animation with stagger
      .fromTo(titleRef.current?.children || [], 
        { y: 100, opacity: 0, rotationX: 90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.1, ease: "back.out(1.7)" },
        "-=1.5"
      )
      // Subtitle slide up
      .fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      )
      // Buttons scale in
      .fromTo(buttonsRef.current?.children || [],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" },
        "-=0.4"
      );

      // Parallax scroll effect
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(backgroundRef.current, {
            y: progress * 200,
            scale: 1 + progress * 0.2,
            duration: 0.3,
            ease: "none"
          });
          gsap.to(titleRef.current, {
            y: progress * -100,
            opacity: 1 - progress * 1.5,
            duration: 0.3,
            ease: "none"
          });
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden bg-black">
      {/* Dynamic Background with Mouse Parallax */}
      <motion.div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4) contrast(1.1)',
        }}
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />
      
      {/* Dark Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, 
            rgba(0,0,0,0.3) 0%, 
            rgba(0,0,0,0.7) 70%, 
            rgba(0,0,0,0.9) 100%)`
        }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div 
            className="flex items-center justify-center mb-4 sm:mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Dumbbell className="w-8 h-8 sm:w-10 md:w-12 lg:h-12 text-red-500 mr-2 sm:mr-3" />
            </motion.div>
            <span className="text-red-500 font-black text-lg sm:text-xl md:text-2xl tracking-widest">IRONFORGE</span>
          </motion.div>
          
          <div ref={titleRef} className="overflow-hidden">
            <motion.h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-4 sm:mb-6 leading-tight">
              <div>FORGE YOUR</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                STRENGTH
              </div>
            </motion.h1>
          </div>
          
          <motion.p 
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-light px-4"
          >
            Where iron meets determination. Transform your body, transform your life.
          </motion.p>
        </motion.div>

        <motion.div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none px-4 justify-center items-center mx-auto"
        >
          <motion.button 
            className="group relative px-6 sm:px-8 lg:px-10 py-4 sm:py-5 bg-gradient-to-r from-red-600 to-red-500 text-white font-black text-lg sm:text-xl rounded-lg overflow-hidden w-full sm:w-auto"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.span 
              className="relative z-10"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              START YOUR JOURNEY
            </motion.span>
          </motion.button>
          
          <motion.button 
            className="group flex items-center justify-center px-6 sm:px-8 lg:px-10 py-4 sm:py-5 border-2 border-gray-400 text-gray-300 font-black text-lg sm:text-xl rounded-lg backdrop-blur-sm w-full sm:w-auto"
            whileHover={{ 
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "#ffffff",
              color: "#ffffff",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <Play className="w-5 h-5 sm:w-6 lg:h-6 mr-2 sm:mr-3" />
            </motion.div>
            VIRTUAL TOUR
          </motion.button>
        </motion.div>

        <motion.div 
          className="animate-bounce"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 sm:w-10 lg:h-10 text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
};