import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Urban Skyline",
    category: "Master Planning",
    image: "/assets/hero-bg.png",
  },
  {
    title: "Corporate Hub",
    category: "Commercial Architecture",
    image: "/assets/project-commercial.png",
  },
  {
    title: "Modern Villa",
    category: "Residential Architecture",
    image: "/assets/project-residential.png",
  }
];

const Projects = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const section = containerRef.current;
      
      // Cards slide up when visible
      gsap.fromTo(section.querySelectorAll('.project-card'), 
        { y: 150, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="projects" className="py-32 px-6 bg-gradient-to-br from-[#020617] via-[#0B1D3A] to-[#132F5B]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-20 max-w-3xl mx-auto">
          <span className="text-blue-500 text-xs font-bold uppercase tracking-[0.3em]">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight uppercase">
            Recent <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text italic">Projects</span>
          </h2>
          <p className="text-white/40 leading-relaxed text-lg">
            Discover our latest architectural achievements, shaping the future of urban and residential living.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card relative rounded-2xl overflow-hidden group cursor-pointer aspect-[4/5] md:aspect-[3/4]"
            >
              {/* Background Image with Hover Zoom */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out xl:group-hover:scale-[1.05]"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A] via-[#0B1D3A]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Overlay Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block mb-2 drop-shadow-md">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-bold font-heading text-white drop-shadow-lg">
                    {project.title}
                  </h3>
                  
                  {/* Subtle divider line that expands on hover */}
                  <div className="w-12 h-[2px] bg-blue-500/50 mt-6 mb-2 group-hover:w-full group-hover:bg-blue-500 transition-all duration-500" />
                  
                  {/* Explore Text */}
                  <div className="flex items-center gap-2 text-white/70 overflow-hidden h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:pt-2 transition-all duration-300 delay-100">
                    <span className="text-xs uppercase tracking-widest font-medium">View Project</span>
                    <span className="text-blue-400">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
