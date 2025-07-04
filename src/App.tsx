import React from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Programs } from './components/Programs';
import { Trainers } from './components/Trainers';
import { Membership } from './components/Membership';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Hero />
      <About />
      <Programs />
      <Trainers />
      <Membership />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;