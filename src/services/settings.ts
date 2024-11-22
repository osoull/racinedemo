import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Settings {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  language: 'ar' | 'en';
  theme: 'light' | 'dark' | 'system';
  twoFactorAuth: boolean;
}

interface SettingsState {
  settings: Settings;
  isLoading: boolean;
  error: string | null;
  updateSettings: (settings: Partial<Settings>) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        notifications: {
          email: true,
          sms: true,
          push: true,
        },
        language: 'ar',
        theme: 'light',
        twoFactorAuth: false,
      },
      isLoading: false,
      error: null,

      updateSettings: async (newSettings) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));

          set((state) => ({
            settings: {
              ...state.settings,
              ...newSettings,
              notifications: {
                ...state.settings.notifications,
                ...(newSettings.notifications || {}),
              },
            },
            isLoading: false,
          }));

          // Apply theme
          if (newSettings.theme) {
            document.documentElement.classList.remove('light', 'dark');
            if (newSettings.theme !== 'system') {
              document.documentElement.classList.add(newSettings.theme);
            } else {
              // Check system preference
              if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.add('light');
              }
            }
          }

          // Apply language
          if (newSettings.language) {
            document.documentElement.lang = newSettings.language;
            document.documentElement.dir = newSettings.language === 'ar' ? 'rtl' : 'ltr';
          }

        } catch (error: any) {
          set({ error: error.message, isLoading: false });
        }
      },
    }),
    {
      name: 'user-settings',
    }
  )
);