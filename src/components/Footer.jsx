import React from 'react';
import { Landmark, Globe, Mail, MessageSquare, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-32 pb-12 px-6 bg-[#08152a] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 pb-20 border-b border-white/5">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-2">
              <Landmark className="text-accent w-10 h-10" />
              <span className="text-3xl font-bold tracking-tighter font-heading text-white uppercase italic">
                Envisage <span className="text-accent font-light">Planning</span>
              </span>
            </div>
            <p className="text-white/40 text-lg max-w-md leading-relaxed">
              Synthesizing futuristic vision with corporate excellence to redefine the urban architectural landscape.
            </p>
            <div className="flex items-center gap-6">
              {[Globe, Mail, MessageSquare].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-bold font-heading uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Projects', 'Services', 'Insights', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-bold font-heading uppercase tracking-widest text-sm">Newsletter</h4>
            <p className="text-white/40 text-sm leading-relaxed">
              Stay updated with our latest architectural insights and projects.
            </p>
            <div className="flex items-center border-b border-white/10 pb-2 group">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none outline-none text-white text-sm w-full py-2 placeholder:text-white/20"
              />
              <button className="text-white/40 group-hover:text-accent transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-white/20 text-xs tracking-widest uppercase">
            © 2026 Envisage Planning. All Rights Reserved.
          </p>
          <div className="flex gap-10 text-white/20 text-xs tracking-widest uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
