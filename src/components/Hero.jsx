import React, { useEffect, useRef } from 'react';
import { Landmark, MapPin } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonsRef = useRef(null);
  const addressRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Background slow zoom in (parallax effect)
      gsap.fromTo(bgRef.current, 
        { scale: 1 }, 
        { scale: 1.15, duration: 25, ease: 'none', repeat: -1, yoyo: true, force3D: true }
      );

      // Initial entrance animations
      tl.fromTo(headingRef.current, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2, force3D: true }
      )
      .fromTo(subheadingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', force3D: true },
        "-=0.6"
      )
      .fromTo(buttonsRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', force3D: true },
        "-=0.4"
      )
      .fromTo(addressRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', force3D: true },
        "-=0.2"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-32 pb-16">
      {/* Background Image with blur */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 blur-sm"
        style={{
          backgroundImage: 'url("/assets/hero-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dark blue gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#020617] via-[#0B1D3A]/90 to-[#132F5B]/80" />

      {/* Top Left Logo */}
      <div className="absolute top-8 left-8 z-30 flex items-center gap-2">
         <Landmark className="text-accent w-8 h-8" />
         <span className="text-2xl font-bold tracking-tighter font-heading text-white uppercase italic">
            Envisage <span className="text-accent font-light">Planning</span>
         </span>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl pt-10">
        <h1 
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-8xl font-black font-heading text-white leading-tight tracking-tight uppercase"
        >
          We Give Shape <br className="hidden md:block" /> To <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text italic">Dreams</span>
        </h1>
        
        <p 
          ref={subheadingRef}
          className="mt-8 text-xl md:text-2xl text-white/80 font-body max-w-2xl mx-auto tracking-wide leading-relaxed"
        >
          Innovative architecture and construction solutions for modern living.
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
          <button className="relative px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:brightness-110 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center">
            Explore Services
          </button>
          
          <button className="relative px-10 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white/90 font-semibold rounded-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center">
            Contact Us
          </button>
        </div>

        {/* Visit Our Office Card */}
        <div 
          ref={addressRef}
          className="mt-12 md:mt-16 mx-auto w-full max-w-lg glass-card backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-5 md:p-6 shadow-[0_8px_30px_rgba(59,130,246,0.1)] hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" strokeWidth={1.5} />
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#e2e8f0]">Visit Our Office</h3>
          </div>
          <p className="text-white/80 text-sm md:text-[15px] font-body text-center leading-relaxed">
            65 HOMELAND VATSALYA, JAISINGHPURA, BHANKROTA, JAIPUR, 302026
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
