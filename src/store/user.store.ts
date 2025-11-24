import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types/user.type';

interface UserState {
  profile: User | null;
  points: number;
  badges: string[];
  setProfile: (profile: User) => void;
  updatePoints: (points: number) => void;
  addBadge: (badge: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      points: 0,
      badges: [],
      setProfile: (profile) => set({ profile }),
      updatePoints: (points) => set({ points }),
      addBadge: (badge) =>
        set((state) => ({
          badges: state.badges.includes(badge) ? state.badges : [...state.badges, badge],
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        profile: state.profile,
        points: state.points,
        badges: state.badges,
      }),
    },
  ),
);

