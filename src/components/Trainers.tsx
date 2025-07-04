import { useEffect, useRef } from 'react';
import { Star, Award, Target, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const trainers = [
  {
    name: "MIKE STEEL",
    title: "Head Strength Coach",
    specialties: ["Powerlifting", "Olympic Lifting", "Strength Training"],
    rating: 5.0,
    image: "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400",
    accent: "from-red-500 to-red-600"
  },
  {
    name: "SARAH IRON",
    title: "HIIT Specialist",
    specialties: ["HIIT Training", "Cardio", "Weight Loss"],
    rating: 4.9,
    image: "https://images.pexels.com/photos/1431283/pexels-photo-1431283.jpeg?auto=compress&cs=tinysrgb&w=400",
    accent: "from-orange-500 to-red-500"
  },
  {
    name: "ALEX FORGE",
    title: "Functional Training Expert",
    specialties: ["Functional Fitness", "Athletic Performance", "Injury Prevention"],
    rating: 4.8,
    image: "https://images.pexels.com/photos/1431284/pexels-photo-1431284.jpeg?auto=compress&cs=tinysrgb&w=400",
    accent: "from-yellow-500 to-orange-500"
  },
  {
    name: "JESSICA POWER",
    title: "Competition Coach",
    specialties: ["Bodybuilding", "Competition Prep", "Nutrition"],
    rating: 5.0,
    image: "https://images.pexels.com/photos/1431285/pexels-photo-1431285.jpeg?auto=compress&cs=tinysrgb&w=400",
    accent: "from-red-600 to-orange-600"
  }
];

export const Trainers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(backgroundRef.current, {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Title reveal animation
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

      // Cards 3D flip animation
      gsap.fromTo(cardsRef.current?.children || [],
        {
          rotationY: 90,
          opacity: 0,
          z: -200
        },
        {
          rotationY: 0,
          opacity: 1,
          z: 0,
          duration: 1,
          stagger: 0.2,
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
          backgroundImage: `url('https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.25) contrast(1.1)',
          scale: 1.1
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/75" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <motion.span 
            className="text-red-500 font-bold text-sm tracking-widest uppercase mb-4 block"
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            transition={{ duration: 0.6 }}
          >
            Expert Trainers
          </motion.span>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight"
            whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            MEET THE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              EXPERTS
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Our certified trainers bring years of experience and proven results
          </motion.p>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trainers.map((trainer, index) => (
            <motion.div 
              key={trainer.name}
              className="group relative bg-black/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700"
              whileHover={{ 
                scale: 1.05,
                rotateY: 10,
                z: 100
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ perspective: 1000 }}
            >
              <div className="relative">
                {/* Trainer Image */}
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <motion.img 
                    src={trainer.image} 
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Rating Badge */}
                  <motion.div 
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/70 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 flex items-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Star className="w-3 h-3 sm:w-4 lg:h-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-white font-bold text-xs sm:text-sm">{trainer.rating}</span>
                  </motion.div>

                  {/* Floating Icons */}
                  <motion.div 
                    className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0, rotate: -180 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Award className="w-5 h-5 sm:w-6 lg:h-6 text-red-500" />
                  </motion.div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <motion.h3 
                    className="text-lg sm:text-xl font-black text-white mb-2 group-hover:text-red-400 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {trainer.name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-red-500 font-bold text-xs sm:text-sm mb-3 sm:mb-4 tracking-wide"
                    whileHover={{ color: "#f97316" }}
                    transition={{ duration: 0.3 }}
                  >
                    {trainer.title}
                  </motion.p>
                  
                  <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                    {trainer.specialties.map((specialty, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center text-xs sm:text-sm text-gray-300"
                        whileHover={{ x: 10, color: "#ffffff" }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <motion.div 
                          className="w-1.5 h-1.5 sm:w-2 lg:h-2 bg-red-500 rounded-full mr-2 opacity-70"
                          whileHover={{ scale: 1.5, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        />
                        {specialty}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <motion.button 
                      className="flex-1 py-2 sm:py-3 bg-transparent border border-gray-600 text-gray-300 font-bold text-xs sm:text-sm rounded-lg"
                      whileHover={{ 
                        backgroundColor: "#ef4444",
                        borderColor: "#ef4444",
                        color: "#ffffff",
                        scale: 1.05
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      VIEW PROFILE
                    </motion.button>
                    
                    <motion.button 
                      className={`w-10 h-10 sm:w-12 lg:h-12 bg-gradient-to-r ${trainer.accent} rounded-lg flex items-center justify-center`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 10,
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Trophy className="w-4 h-4 sm:w-6 lg:h-6 text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};