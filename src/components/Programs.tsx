import { useEffect, useRef } from 'react';
import { Dumbbell, Zap, Heart, Users, Trophy, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    icon: Dumbbell,
    title: "STRENGTH TRAINING",
    description: "Build raw power with our comprehensive strength programs",
    color: "from-red-500 to-red-600",
    image: "https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    icon: Zap,
    title: "HIIT WORKOUTS",
    description: "High-intensity interval training for maximum fat burn",
    color: "from-orange-500 to-red-500",
    image: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    icon: Heart,
    title: "CARDIO TRAINING",
    description: "Improve endurance and cardiovascular health",
    color: "from-yellow-500 to-orange-500",
    image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    icon: Target,
    title: "FUNCTIONAL FITNESS",
    description: "Real-world movement patterns for everyday strength",
    color: "from-red-600 to-orange-600",
    image: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    icon: Users,
    title: "GROUP CLASSES",
    description: "Train together and push each other to new heights",
    color: "from-orange-600 to-yellow-600",
    image: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    icon: Trophy,
    title: "COMPETITION PREP",
    description: "Elite training for competitive athletes",
    color: "from-yellow-600 to-red-600",
    image: "https://images.pexels.com/photos/1552108/pexels-photo-1552108.jpeg?auto=compress&cs=tinysrgb&w=500"
  }
];

export const Programs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(backgroundRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Title animation
      gsap.fromTo(titleRef.current?.children || [],
        { 
          y: 100, 
          opacity: 0,
          rotationX: 90
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo(cardsRef.current?.children || [],
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationY: 45
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background Image */}
      <motion.div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.2) contrast(1.1)',
          scale: 1.1
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/70" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <motion.span 
            className="text-red-500 font-bold text-sm tracking-widest uppercase mb-4 block"
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            transition={{ duration: 0.6 }}
          >
            Training Programs
          </motion.span>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight"
            whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            CHOOSE YOUR
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              PROGRAM
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Specialized training programs designed to help you reach your fitness goals
          </motion.p>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programs.map((program, index) => (
            <motion.div 
              key={program.title}
              className="group relative bg-black/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Background Image */}
              <motion.div 
                className="absolute inset-0 opacity-30"
                whileHover={{ 
                  scale: 1.1,
                  opacity: 0.5
                }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="relative p-6 sm:p-8 h-full flex flex-col min-h-[300px] sm:min-h-[350px]">
                <motion.div 
                  className={`w-16 h-16 sm:w-20 lg:h-20 bg-gradient-to-r ${program.color} rounded-lg flex items-center justify-center mb-4 sm:mb-6`}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 10,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <program.icon className="w-8 h-8 sm:w-10 lg:h-10 text-white" />
                </motion.div>
                
                <motion.h3 
                  className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-red-400 transition-colors duration-300"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {program.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-300 leading-relaxed mb-4 sm:mb-6 flex-grow text-sm sm:text-base"
                  whileHover={{ color: "#ffffff" }}
                  transition={{ duration: 0.3 }}
                >
                  {program.description}
                </motion.p>
                
                <motion.button 
                  className="w-full py-3 sm:py-4 bg-transparent border-2 border-gray-600 text-gray-300 font-bold rounded-lg transition-all duration-300 text-sm sm:text-base"
                  whileHover={{ 
                    backgroundColor: "#ef4444",
                    borderColor: "#ef4444",
                    color: "#ffffff",
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  LEARN MORE
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};