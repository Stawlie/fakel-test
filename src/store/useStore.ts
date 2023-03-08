import create from 'vue-zustand';
import { persist } from 'zustand/middleware';

// import data
import PROJECTS from '@/data/projects';
import STAGES from '@/data/stages';
import CARDS from '@/data/cards';

export type ProjectType = {
  id: number;
  code: string;
  name: string;
  sort: number;
};

export type StageType = {
  id: number;
  sort: number;
  name: string;
  code: string;
};

export type CardType = {
  id: number;
  title: string;
  stage: string;
  project: string | false;
  score: number;
};

type Store = {
  projectsList: ProjectType[];
  stagesList: StageType[];
  cardsList: CardType[];
  projectFilter: ProjectType['code'];
  isLoaded: boolean;
};

type StoreActions = {
  setProjectFilter: (projectFilter: ProjectType['code']) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  addCard: (card: CardType) => void;
  deleteCard: (id: CardType['id']) => void;
};

export const STORAGE_NAME = 'appStore';

export const useStore = create<Store & StoreActions>()(
  persist(
    (set) => ({
      projectsList: PROJECTS,
      stagesList: STAGES,
      cardsList: CARDS,
      projectFilter: '',
      isLoaded: false,
      setProjectFilter(projectFilter) {
        return set({ projectFilter });
      },
      setIsLoaded(isLoaded) {
        return set({ isLoaded });
      },
      addCard(card) {
        return set((state) => {
          return {
            cardsList: [...state.cardsList, card]
          };
        });
      },
      deleteCard(id) {
        return set((state) => {
          return {
            cardsList: state.cardsList.filter((card) => card.id !== id)
          };
        });
      }
    }),
    { name: STORAGE_NAME, version: 1 }
  )
);
