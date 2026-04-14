import React, { useEffect, useRef } from 'react';
import { 
  Grid3X3, 
  HardHat, 
  Compass, 
  MapPin, 
  Building2, 
  Wrench, 
  Box, 
  Paintbrush, 
  ClipboardSignature 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    icon: <Grid3X3 className="w-8 h-8" />,
    title: "Floor Planning",
    desc: "Optimized layouts blending spatial efficiency with aesthetic elegance."
  },
  {
    icon: <HardHat className="w-8 h-8" />,
    title: "Construction",
    desc: "End-to-end building execution with uncompromised quality standards."
  },
  {
    icon: <Compass className="w-8 h-8" />,
    title: "Vastu Consultation",
    desc: "Harmonizing spaces with traditional principles for positive energy flow."
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Site Visit",
    desc: "Comprehensive terrain analysis and preliminary project feasibility checks."
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Structural Design",
    desc: "Engineered frameworks ensuring maximum longevity and safety."
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Steel Detailing",
    desc: "Precision drafting for complex steel fabrication and assembly."
  },
  {
    icon: <Box className="w-8 h-8" />,
    title: "3D Elevation",
    desc: "Photorealistic exterior renders bringing your facade concepts to life."
  },
  {
    icon: <Paintbrush className="w-8 h-8" />,
    title: "Renovation",
    desc: "Transforming obsolete spaces into modern, functional environments."
  },
  {
    icon: <ClipboardSignature className="w-8 h-8" />,
    title: "Construction Agreement",
    desc: "Transparent contracting and legal documentation for your peace of mind."
  }
];

const Services = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const section = containerRef.current;
      
      // Header animation
      gsap.fromTo(headerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        }
      );

      // Cards staggered animation
      gsap.fromTo(section.querySelectorAll('.service-card'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="py-32 px-6 bg-[#020617]/90">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.3em]">Our Expertise</span>
          <h2 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight uppercase">
            Comprehensive <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text italic">Solutions</span>
          </h2>
          <p className="text-white/40 leading-relaxed text-lg">
            From initial site analysis to final construction agreements, we provide a full spectrum of architectural services tailored to your needs.
          </p>
        </div>

        {/* Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className="service-card glass-card p-10 rounded-2xl flex flex-col gap-6 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-300">
                {service.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-heading text-white uppercase group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
