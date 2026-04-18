import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Landmark, LayoutDashboard, Image as ImageIcon } from 'lucide-react';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex font-body">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B1D3A]/50 border-r border-white/10 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Landmark className="text-blue-500 w-8 h-8" />
          <span className="text-xl font-bold font-heading uppercase italic">
            Envisage
          </span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 transition-all font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Projects
          </Link>
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium mt-auto">
            <ImageIcon className="w-5 h-5" />
            View Site
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
