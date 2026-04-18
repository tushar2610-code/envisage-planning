import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isOpen: false,
  activeProject: null,
  openModal: (project) => set({ isOpen: true, activeProject: project }),
  closeModal: () => set({ isOpen: false, activeProject: null }),
}));
