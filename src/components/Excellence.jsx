import React, { useEffect, useRef } from 'react';
import { Building, Users, Smile } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Excellence = () => {
  const sectionRef = useRef(null);

  const points = [
    { id: 'projects', endValue: 300, suffix: '+', label: 'Projects Completed', icon: <Building className="w-8 h-8" /> },
    { id: 'engineers', endValue: 25, suffix: '+', label: 'Expert Engineers', icon: <Users className="w-8 h-8" /> },
    { id: 'clients', endValue: 100, suffix: '+', label: 'Happy Clients', icon: <Smile className="w-8 h-8" /> },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      
      // Animate heading in
      gsap.fromTo(section.querySelector('.heading'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          }
        }
      );

      // Animate items sliding up
      gsap.fromTo(section.querySelectorAll('.stat-item'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );

      // Animate counters
      const counters = section.querySelectorAll('.counter-val');
      
      counters.forEach((counter, i) => {
        const endValue = points[i].endValue;
        // Object to hold the value for GSAP to tween
        const counterObj = { val: 0 };
        
        gsap.to(counterObj, {
          val: endValue,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
          onUpdate: () => {
            counter.innerText = Math.floor(counterObj.val) + points[i].suffix;
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6 bg-[#08152a] relative overflow-hidden">
        {/* Glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 bg-accent/5 blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <h2 className="heading text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-white text-center mb-16 uppercase tracking-wider leading-tight">
          Driving <span className="text-accent italic">Excellence</span> <br className="hidden md:block" /> In Architecture
        </h2>

        <div className="glass-card w-full rounded-2xl flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6 border-white/5 py-12 px-8">
          {points.map((point, index) => (
            <div key={index} className="stat-item flex flex-col items-center text-center space-y-5 flex-1 w-full">
              <div className="text-accent p-4 rounded-xl bg-white/5 border border-white/10 group hover:bg-accent/10 hover:border-accent/40 transition-colors">
                {point.icon}
              </div>
              <div 
                className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white tracking-tighter counter-val drop-shadow-md"
              >
                0{point.suffix}
              </div>
              <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">
                {point.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Excellence;
