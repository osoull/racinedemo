import { create } from 'zustand';
import { demoProjects } from '../data/demo';
import type { Project } from '../types/project';

interface ProjectStore {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  getProjects: () => Promise<Project[]>;
  getProject: (id: string) => Promise<Project | undefined>;
  createProject: (project: Omit<Project, 'id'>) => Promise<Project>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<Project>;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: demoProjects,
  isLoading: false,
  error: null,

  getProjects: async () => {
    set({ isLoading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return demoProjects;
    } finally {
      set({ isLoading: false });
    }
  },

  getProject: async (id: string) => {
    set({ isLoading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return demoProjects.find(p => p.id === id);
    } finally {
      set({ isLoading: false });
    }
  },

  createProject: async (project: Omit<Project, 'id'>) => {
    set({ isLoading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newProject = {
        ...project,
        id: String(demoProjects.length + 1)
      };
      set(state => ({ projects: [...state.projects, newProject] }));
      return newProject;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProject: async (id: string, updates: Partial<Project>) => {
    set({ isLoading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const updatedProject = {
        ...demoProjects.find(p => p.id === id)!,
        ...updates
      };
      set(state => ({
        projects: state.projects.map(p => p.id === id ? updatedProject : p)
      }));
      return updatedProject;
    } finally {
      set({ isLoading: false });
    }
  }
}));