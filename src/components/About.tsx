import { useEffect, useRef } from 'react';
import { Target, Zap, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background effect
      gsap.to(backgroundRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Content reveal animation
      gsap.fromTo(contentRef.current?.children || [], 
        { 
          y: 100, 
          opacity: 0,
          rotationX: 45
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats counter animation
      gsap.fromTo(statsRef.current?.querySelectorAll('.stat-number') || [],
        { innerText: 0 },
        {
          innerText: (i, target) => target.getAttribute('data-value'),
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Target,
      title: "Precision Training",
      description: "Targeted workouts designed for maximum results",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Zap,
      title: "High Intensity", 
      description: "Push your limits with our intense training programs",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: Trophy,
      title: "Proven Results",
      description: "Track record of transforming lives and bodies",
      color: "from-yellow-500 to-red-500"
    }
  ];

  const stats = [
    { value: 5000, suffix: "+", label: "Members" },
    { value: 24, suffix: "/7", label: "Access" },
    { value: 15, suffix: "+", label: "Years Experience" },
    { value: 98, suffix: "%", label: "Success Rate" }
  ];

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 lg:py-32 bg-black overflow-hidden">
      {/* Background Image */}
      <motion.div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1544494/pexels-photo-1544494.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3) contrast(1.2)',
          scale: 1.2
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/60" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div 
            ref={contentRef}
            initial={{ opacity: 0 }}
            className="space-y-6 sm:space-y-8 order-2 lg:order-1"
          >
            <div>
              <motion.span 
                className="text-red-500 font-bold text-sm tracking-widest uppercase mb-4 block"
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.6 }}
              >
                About IronForge
              </motion.span>
              
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight"
                whileInView={{ opacity: [0, 1], y: [50, 0] }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                BUILT FOR
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  CHAMPIONS
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6 sm:mb-8"
                whileInView={{ opacity: [0, 1], y: [30, 0] }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                For over 15 years, IronForge has been the premier destination for serious athletes 
                and fitness enthusiasts. Our state-of-the-art facility and expert trainers 
                provide everything you need to achieve your goals.
              </motion.p>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  className="flex items-start sm:items-center group"
                  whileInView={{ opacity: [0, 1], x: [-50, 0] }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div 
                    className={`w-12 h-12 sm:w-16 lg:h-16 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mr-4 sm:mr-6 flex-shrink-0`}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <feature.icon className="w-6 h-6 sm:w-8 lg:h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl group-hover:text-red-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            ref={statsRef}
            className="relative order-1 lg:order-2"
            whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative bg-black/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700">
              <div className="grid grid-cols-2 gap-6 sm:gap-8 text-center">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    whileHover={{ 
                      scale: 1.1,
                      y: -10
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-500 mb-2">
                      <span 
                        className="stat-number"
                        data-value={stat.value}
                      >
                        0
                      </span>
                      {stat.suffix}
                    </div>
                    <div className="text-gray-300 font-medium text-sm sm:text-base">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};