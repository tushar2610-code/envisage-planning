import React, { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const section = containerRef.current;
      
      gsap.fromTo(section.children,
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const inputClasses = "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300 font-body";

  return (
    <section id="contact" className="py-32 px-6 bg-gradient-to-br from-[#020617] via-[#0B1D3A] to-[#132F5B] relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div ref={containerRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Left Side: Info */}
        <div className="space-y-10">
          <div>
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] block mb-4">Get In Touch</span>
            <h2 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight uppercase">
              Let's Build <br/> <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text italic">The Future</span>
            </h2>
            <p className="text-white/50 leading-relaxed mt-6 text-lg max-w-md">
              Whether you have a vision to realize or need expert architectural consultation, our team is ready to assist.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Call Us</p>
                <p className="text-white font-medium text-lg">+91 9785998777</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Email Us</p>
                <p className="text-white font-medium text-lg">Envisageplanningindia@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Our Studio</p>
                <p className="text-white font-medium text-sm md:text-base">65 HOMELAND VATSALYA, JAISINGHPURA, JAIPUR, 302026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="glass-card p-10 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative">
          <form className="space-y-6">
            <h3 className="text-2xl font-heading font-bold text-white mb-8 border-b border-white/10 pb-4">
              Send a Message
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input type="text" placeholder="Your Name" className={inputClasses} required />
              </div>
              <div>
                <input type="tel" placeholder="Phone Number" className={inputClasses} required />
              </div>
            </div>
            
            <div>
              <input type="email" placeholder="Email Address" className={inputClasses} required />
            </div>
            
            <div>
              <textarea 
                placeholder="How can we help you?" 
                rows="4" 
                className={`${inputClasses} resize-none`} 
                required 
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:brightness-110 text-white font-bold rounded-lg uppercase tracking-widest transition-all duration-300 flex justify-center items-center gap-3 group shadow-[0_4px_14px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)] hover:-translate-y-1"
            >
              <span>Submit Inquiry</span>
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
