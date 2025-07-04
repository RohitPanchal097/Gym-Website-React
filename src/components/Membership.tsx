import { useEffect, useRef } from 'react';
import { Check, Dumbbell, Crown, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "BASIC",
    price: 39,
    icon: Dumbbell,
    color: "from-gray-600 to-gray-700",
    popular: false,
    features: [
      "24/7 Gym Access",
      "Basic Equipment",
      "Locker Room Access",
      "Group Classes",
      "Mobile App"
    ]
  },
  {
    name: "PREMIUM",
    price: 79,
    icon: Crown,
    color: "from-red-500 to-red-600",
    popular: true,
    features: [
      "Everything in Basic",
      "Personal Training Sessions",
      "Nutrition Consultation",
      "Advanced Equipment",
      "Recovery Room Access",
      "Priority Booking"
    ]
  },
  {
    name: "ELITE",
    price: 149,
    icon: Trophy,
    color: "from-orange-500 to-yellow-500",
    popular: false,
    features: [
      "Everything in Premium",
      "Unlimited Personal Training",
      "Custom Meal Plans",
      "VIP Lounge Access",
      "Massage Therapy",
      "Competition Coaching"
    ]
  }
];

export const Membership = () => {
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

      // Cards morphing animation
      gsap.fromTo(cardsRef.current?.children || [],
        {
          scale: 0.5,
          opacity: 0,
          rotationY: 180,
          z: -300
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          z: 0,
          duration: 1.2,
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
          backgroundImage: `url('https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')`,
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
            Membership Plans
          </motion.span>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight"
            whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            CHOOSE YOUR
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              MEMBERSHIP
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Find the perfect plan to match your fitness goals and lifestyle
          </motion.p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              className={`group relative bg-black/70 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-500 ${
                plan.popular 
                  ? 'border-red-500 md:scale-105' 
                  : 'border-gray-700'
              }`}
              whileHover={{ 
                scale: plan.popular ? 1.1 : 1.05,
                rotateY: 5,
                z: 100
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ perspective: 1000 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div 
                  className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold z-20"
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  MOST POPULAR
                </motion.div>
              )}
              
              <div className="relative p-6 sm:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <motion.div 
                    className={`w-16 h-16 sm:w-20 lg:h-20 bg-gradient-to-r ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 10,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <plan.icon className="w-8 h-8 sm:w-10 lg:h-10 text-white" />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold text-white mb-2"
                    whileHover={{ color: "#ef4444" }}
                    transition={{ duration: 0.3 }}
                  >
                    {plan.name}
                  </motion.h3>
                  
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <motion.span 
                      className="text-4xl sm:text-5xl lg:text-6xl font-black text-white"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      ${plan.price}
                    </motion.span>
                    <span className="text-gray-400 ml-2 text-sm sm:text-base">/month</span>
                  </div>
                  
                  <p className="text-gray-300 text-xs sm:text-sm">
                    No contracts, cancel anytime
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <motion.div 
                        className="w-5 h-5 sm:w-6 lg:h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Check className="w-2.5 h-2.5 sm:w-3 lg:h-3 text-white" />
                      </motion.div>
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button 
                  className={`w-full py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                      : 'bg-transparent border-2 border-gray-600 text-gray-300'
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: plan.popular ? undefined : "#ef4444",
                    borderColor: plan.popular ? undefined : "#ef4444",
                    color: "#ffffff"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {plan.popular ? 'GET STARTED' : 'CHOOSE PLAN'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12 sm:mt-16"
          whileInView={{ opacity: [0, 1], y: [30, 0] }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-gray-400 mb-4 text-sm sm:text-base">
            All plans include our 30-day money-back guarantee
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-gray-500">
            <motion.span 
              whileHover={{ color: "#ef4444", scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ✓ No setup fees
            </motion.span>
            <motion.span 
              whileHover={{ color: "#ef4444", scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ✓ Cancel anytime
            </motion.span>
            <motion.span 
              whileHover={{ color: "#ef4444", scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ✓ 24/7 support
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};