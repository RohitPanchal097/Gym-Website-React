import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "JOHN MARTINEZ",
    title: "Premium Member",
    rating: 5,
    text: "IronForge transformed my life completely. The trainers are incredible and the equipment is top-notch. I've never felt stronger or more confident.",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    achievement: "Lost 40lbs in 4 months"
  },
  {
    name: "MARIA RODRIGUEZ",
    title: "Elite Member",
    rating: 5,
    text: "The personal training here is exceptional. My trainer helped me achieve goals I never thought possible. This place is a game-changer.",
    image: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400",
    achievement: "Increased strength by 75%"
  },
  {
    name: "DAVID CHEN",
    title: "Basic Member",
    rating: 5,
    text: "Even with the basic membership, I get access to amazing facilities and supportive community. Best investment I've made for my health.",
    image: "https://images.pexels.com/photos/1239289/pexels-photo-1239289.jpeg?auto=compress&cs=tinysrgb&w=400",
    achievement: "Completed first triathlon"
  },
  {
    name: "LISA THOMPSON",
    title: "Premium Member",
    rating: 5,
    text: "The atmosphere here is motivating and the results speak for themselves. I've achieved more in 6 months than I did in years at other gyms.",
    image: "https://images.pexels.com/photos/1239290/pexels-photo-1239290.jpeg?auto=compress&cs=tinysrgb&w=400",
    achievement: "Built lean muscle mass"
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background Image */}
      <motion.div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.2) contrast(1.1)',
          scale: 1.1
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/80" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <motion.span 
            className="text-red-500 font-bold text-sm tracking-widest uppercase mb-4 block"
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            transition={{ duration: 0.6 }}
          >
            Testimonials
          </motion.span>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight"
            whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SUCCESS
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              STORIES
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Real transformations from our IronForge community
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, x: 300, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -300, rotateY: -90 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  duration: 0.8 
                }}
                className="w-full"
              >
                <motion.div 
                  className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700"
                  whileHover={{ 
                    scale: 1.02,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                    <div className="relative mb-4 sm:mb-0">
                      <motion.img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name}
                        className="w-16 h-16 sm:w-20 lg:h-20 rounded-full object-cover border-2 border-red-500"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      />
                      <motion.div 
                        className="absolute -top-1 -right-1 sm:-top-2 lg:-right-2 w-8 h-8 sm:w-10 lg:h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <Quote className="w-4 h-4 sm:w-5 lg:h-5 text-white" />
                      </motion.div>
                    </div>
                    
                    <div className="sm:ml-6">
                      <motion.h4 
                        className="text-white font-bold text-lg sm:text-xl"
                        whileHover={{ color: "#ef4444" }}
                        transition={{ duration: 0.3 }}
                      >
                        {testimonials[currentIndex].name}
                      </motion.h4>
                      <p className="text-red-500 text-sm font-medium">
                        {testimonials[currentIndex].title}
                      </p>
                      <div className="flex items-center mt-1">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: i * 0.1,
                              type: "spring", 
                              stiffness: 400, 
                              damping: 10 
                            }}
                          >
                            <Star className="w-3 h-3 sm:w-4 lg:h-4 text-yellow-500 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <motion.blockquote 
                    className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    "{testimonials[currentIndex].text}"
                  </motion.blockquote>

                  <div className="flex justify-between items-center">
                    <motion.div 
                      className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-bold"
                      whileHover={{ 
                        scale: 1.05,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {testimonials[currentIndex].achievement}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-4">
            <motion.button 
              onClick={prevTestimonial}
              className="w-12 h-12 sm:w-14 lg:h-14 bg-black/70 backdrop-blur-sm border border-gray-600 rounded-full flex items-center justify-center text-gray-300"
              whileHover={{ 
                backgroundColor: "#ef4444",
                borderColor: "#ef4444",
                color: "#ffffff",
                scale: 1.1,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 lg:h-6" />
            </motion.button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-red-500 w-8 sm:w-10' 
                      : 'bg-gray-600 w-2 sm:w-3'
                  }`}
                  whileHover={{ 
                    backgroundColor: "#ef4444",
                    scale: 1.2
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
              ))}
            </div>

            <motion.button 
              onClick={nextTestimonial}
              className="w-12 h-12 sm:w-14 lg:h-14 bg-black/70 backdrop-blur-sm border border-gray-600 rounded-full flex items-center justify-center text-gray-300"
              whileHover={{ 
                backgroundColor: "#ef4444",
                borderColor: "#ef4444",
                color: "#ffffff",
                scale: 1.1,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 lg:h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};