import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2, Plus, Trash2, Edit2, Upload, X } from 'lucide-react';

const API_URL = "http://localhost:8080/api/projects";

const AdminProjects = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    thumbnailUrl: '',
    mediaList: []
  });

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await axios.get(API_URL);
      return res.data;
    }
  });

  const saveProjectMutation = useMutation({
    mutationFn: async (project) => {
      if (project.id) {
        return axios.put(`${API_URL}/${project.id}`, project);
      }
      return axios.post(API_URL, project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsFormOpen(false);
      setFormData({
        title: '', category: '', location: '', thumbnailUrl: '', mediaList: []
      });
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id) => {
      return axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await axios.post(`${API_URL}/upload`, uploadData);
      
      setFormData(prev => ({
        ...prev,
        thumbnailUrl: res.data.secure_url
      }));
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload thumbnail");
    } finally {
      setUploading(false);
    }
  };

  const handleMediaUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    try {
      setUploading(true);
      
      const uploadPromises = files.map(file => {
        const uploadData = new FormData();
        uploadData.append("file", file);
        return axios.post(`${API_URL}/upload`, uploadData);
      });

      const responses = await Promise.all(uploadPromises);
      const newUrls = responses.map(res => res.data.secure_url);

      setFormData(prev => ({
        ...prev,
        mediaList: [...prev.mediaList, ...newUrls]
      }));
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload media");
    } finally {
      setUploading(false);
    }
  };

  const removeMedia = (index) => {
    setFormData(prev => ({
      ...prev,
      mediaList: prev.mediaList.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProjectMutation.mutate(formData);
  };

  const inputClasses = "w-full bg-[#0B1D3A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading uppercase text-white">Project Management</h1>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          {isFormOpen ? 'Cancel' : <><Plus className="w-5 h-5"/> Add Project</>}
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-[#0B1D3A]/30 border border-white/10 p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-white/70 mb-2">Project Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={inputClasses} placeholder="Urban Skyline"/>
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Category</label>
                <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className={inputClasses} placeholder="Master Planning"/>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-white/70 mb-2">Location</label>
                <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className={inputClasses} placeholder="Jaipur, Rajasthan"/>
              </div>
              
              <div>
                <label className="block text-sm text-white/70 mb-2">Thumbnail Image</label>
                <div className="relative">
                  <input type="file" accept="image/*" onChange={handleThumbnailUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className={`${inputClasses} flex items-center justify-center gap-2 text-white/50 border-dashed hover:text-white hover:border-white/30 cursor-pointer`}>
                    <Upload className="w-5 h-5" /> Upload Thumbnail
                  </div>
                </div>
                {formData.thumbnailUrl && <img src={formData.thumbnailUrl} alt="Thumb" className="mt-4 h-24 rounded-lg object-cover" />}
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Gallery Media (Multiple Images/Videos)</label>
                <div className="relative">
                  <input type="file" multiple accept="image/*,video/*" onChange={handleMediaUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className={`${inputClasses} flex items-center justify-center gap-2 text-white/50 border-dashed hover:text-white hover:border-white/30 cursor-pointer`}>
                    <Upload className="w-5 h-5" /> Upload Media
                  </div>
                </div>
                {formData.mediaList && formData.mediaList.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {formData.mediaList.map((url, i) => (
                      <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                        {url.includes('.mp4') || url.includes('.webm') ? (
                          <video src={url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={url} alt={`Media ${i}`} className="w-full h-full object-cover" />
                        )}
                        <button 
                          type="button"
                          onClick={() => removeMedia(i)}
                          className="absolute top-1 right-1 bg-red-500/80 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button disabled={uploading || saveProjectMutation.isPending} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-4 rounded-lg font-bold tracking-wide uppercase transition-colors flex items-center justify-center gap-2">
              {uploading ? <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</> : saveProjectMutation.isPending ? 'Saving...' : 'Save Project'}
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div key={p.id} className="bg-[#0B1D3A]/40 border border-white/10 rounded-xl overflow-hidden group">
              <div className="aspect-video relative overflow-hidden">
                <img src={p.thumbnailUrl || '/assets/hero-bg.png'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-white uppercase backdrop-blur-sm">
                  {p.mediaList?.length || 0} Media File(s)
                </div>
              </div>
              <div className="p-5">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">{p.category}</p>
                <h3 className="text-xl font-bold font-heading text-white mb-2">{p.title}</h3>
                <p className="text-white/60 text-sm">{p.location}</p>
                
                <div className="mt-4 flex justify-end gap-2 border-t border-white/10 pt-4">
                  <button onClick={() => { setFormData({...p, mediaList: p.mediaList || []}); setIsFormOpen(true); }} className="p-2 text-white/50 hover:text-blue-400 transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => { if(window.confirm('Delete project?')) deleteProjectMutation.mutate(p.id) }} className="p-2 text-white/50 hover:text-red-400 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
