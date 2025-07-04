import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Send, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
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

      // Contact info slide in from left
      gsap.fromTo(contactInfoRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Form slide in from right
      gsap.fromTo(formRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactItems = [
    {
      icon: MapPin,
      title: "Location",
      content: "123 Fitness Street, Muscle City, MC 12345",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) IRON-GYM",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@ironforge.gym",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Clock,
      title: "Hours",
      content: "24/7 Access Available",
      color: "from-red-600 to-orange-600"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background Image */}
      <motion.div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1552108/pexels-photo-1552108.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')`,
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
            Contact
          </motion.span>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight"
            whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            START YOUR
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              JOURNEY
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to transform your life? Get in touch with our team and begin your fitness journey today.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <motion.div 
              className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700"
              whileHover={{ 
                scale: 1.02,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Get in Touch</h3>
              
              <div className="space-y-4 sm:space-y-6">
                {contactItems.map((item, index) => (
                  <motion.div 
                    key={item.title}
                    className="flex items-start sm:items-center group"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div 
                      className={`w-12 h-12 sm:w-14 lg:h-14 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 10,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <item.icon className="w-6 h-6 sm:w-7 lg:h-7 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="text-white font-bold group-hover:text-red-400 transition-colors duration-300 text-sm sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.div 
                className="bg-black/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700 text-center"
                whileHover={{ 
                  scale: 1.05,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="w-6 h-6 sm:w-8 lg:h-8 text-red-500 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-white">5000+</div>
                <div className="text-gray-300 text-xs sm:text-sm">Active Members</div>
              </motion.div>
              
              <motion.div 
                className="bg-black/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700 text-center"
                whileHover={{ 
                  scale: 1.05,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Clock className="w-6 h-6 sm:w-8 lg:h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-white">24/7</div>
                <div className="text-gray-300 text-xs sm:text-sm">Access Available</div>
              </motion.div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            ref={formRef}
            className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700 order-1 lg:order-2"
            whileHover={{ 
              scale: 1.01,
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Full Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-sm sm:text-base"
                    placeholder="Enter your name"
                    whileFocus={{ 
                      scale: 1.02,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-sm sm:text-base"
                    placeholder="Enter your email"
                    whileFocus={{ 
                      scale: 1.02,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  Phone Number
                </label>
                <motion.input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-sm sm:text-base"
                  placeholder="Enter your phone number"
                  whileFocus={{ 
                    scale: 1.02,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 resize-none text-sm sm:text-base"
                  placeholder="Tell us about your fitness goals..."
                  whileFocus={{ 
                    scale: 1.02,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-base sm:text-lg rounded-lg flex items-center justify-center"
                whileHover={{ 
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Send className="w-4 h-4 sm:w-5 lg:h-5 mr-2" />
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};