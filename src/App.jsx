import React, { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Excellence from './components/Excellence';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-[#020617] font-body selection:bg-blue-500/30 selection:text-white">
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <Excellence />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919785998777" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        
        {/* Ping Animation Indicator */}
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white border border-[#25D366]"></span>
        </span>
      </a>
    </div>
  );
}

export default App;
