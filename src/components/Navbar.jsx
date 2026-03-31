import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Landmark } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = ['Home', 'Projects', 'Services', 'About', 'Contact'];
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.5, force3D: true }
      );
    }, navRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between glass px-8 py-3 rounded-2xl relative z-50 bg-primary-dark/80 md:bg-transparent">
          <div className="flex items-center gap-2">
            <Landmark className="text-accent w-8 h-8" />
            <span className="text-xl font-bold tracking-tighter font-heading text-white uppercase italic">
              Envisage <span className="text-accent font-light">Planning</span>
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/80 hover:text-accent transition-colors tracking-wide uppercase"
              >
                {item}
              </a>
            ))}
          </div>

          <button className="hidden md:block px-6 py-2 bg-accent/90 hover:bg-accent text-primary-dark font-bold rounded-lg transition-all text-sm uppercase tracking-wider">
            Enquire Now
          </button>

          {/* Mobile Toggle Button */}
          <button 
            className="md:hidden text-white hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-primary-dark/95 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8 translate-y-[-20%]">
          {navLinks.map((item, index) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-heading font-medium text-white hover:text-accent tracking-widest uppercase transition-colors"
              style={{
                transitionDelay: `${isOpen ? index * 100 : 0}ms`,
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0,
                transition: 'all 0.5s ease-out'
              }}
            >
              {item}
            </a>
          ))}
          
          <button className="mt-8 px-10 py-4 bg-accent text-primary-dark font-bold rounded-lg uppercase tracking-widest hover:scale-105 transition-transform"
            style={{
              transitionDelay: `${isOpen ? navLinks.length * 100 : 0}ms`,
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isOpen ? 1 : 0,
              transition: 'all 0.5s ease-out'
            }}
          >
            Enquire Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
