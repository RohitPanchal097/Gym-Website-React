import { Dumbbell, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  const socialIcons = [
    { icon: Instagram, color: "from-red-500 to-orange-500" },
    { icon: Twitter, color: "from-orange-500 to-yellow-500" },
    { icon: Facebook, color: "from-yellow-500 to-red-500" },
    { icon: Youtube, color: "from-red-600 to-orange-600" }
  ];

  const footerLinks = [
    {
      title: "Programs",
      links: ["Strength Training", "HIIT Workouts", "Cardio Training", "Functional Fitness", "Group Classes"]
    },
    {
      title: "Support", 
      links: ["Help Center", "Contact Us", "Member Portal", "FAQ", "Hours"]
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Trainers", "Privacy Policy", "Terms of Service"]
    }
  ];

  return (
    <footer className="bg-black py-12 sm:py-16 border-t border-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          style={{
            backgroundImage: `linear-gradient(45deg, rgba(239,68,68,0.1) 25%, transparent 25%),
                             linear-gradient(-45deg, rgba(249,115,22,0.1) 25%, transparent 25%),
                             linear-gradient(45deg, transparent 75%, rgba(239,68,68,0.1) 75%),
                             linear-gradient(-45deg, transparent 75%, rgba(249,115,22,0.1) 75%)`,
            backgroundSize: "50px 50px"
          }}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand */}
          <motion.div
            className="sm:col-span-2 lg:col-span-1"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Dumbbell className="w-8 h-8 sm:w-10 lg:h-10 text-red-500 mr-2 sm:mr-3" />
              </motion.div>
              <span className="text-white font-black text-xl sm:text-2xl">IRONFORGE</span>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base"
              whileHover={{ color: "#ffffff" }}
              transition={{ duration: 0.3 }}
            >
              Forging strength, building champions. Your journey to peak fitness starts here.
            </motion.p>
            
            <div className="flex space-x-3 sm:space-x-4">
              {socialIcons.map((social, index) => (
                <motion.div
                  key={index}
                  className={`w-10 h-10 sm:w-12 lg:h-12 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center cursor-pointer`}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 10,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <social.icon className="w-5 h-5 sm:w-6 lg:h-6 text-white" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              whileInView={{ opacity: [0, 1], y: [30, 0] }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              <h4 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4">{section.title}</h4>
              <ul className="space-y-1 sm:space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    className="text-gray-400 cursor-pointer text-sm sm:text-base"
                    whileHover={{ 
                      color: "#ef4444",
                      x: 10
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {link}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div 
          className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.p 
            className="text-gray-400 text-xs sm:text-sm text-center md:text-left"
            whileHover={{ color: "#ffffff" }}
            transition={{ duration: 0.3 }}
          >
            © 2024 IronForge Gym. All rights reserved. Built for champions.
          </motion.p>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <motion.div 
              className="w-2 h-2 sm:w-3 lg:h-3 bg-red-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span 
              className="text-gray-400 text-xs sm:text-sm"
              whileHover={{ color: "#ef4444" }}
              transition={{ duration: 0.3 }}
            >
              Open 24/7
            </motion.span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};