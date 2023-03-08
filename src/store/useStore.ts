import create from 'vue-zustand';
import { persist } from 'zustand/middleware';

// import data
import PROJECTS from '@/data/projects';
import STAGES from '@/data/stages';
import CARDS from '@/data/cards';

export type Project = {
  id: number;
  code: string;
  name: string;
  sort: number;
};

export type Stage = {
  id: number;
  sort: number;
  name: string;
  code: string;
};

export type Card = {
  id: number;
  title: string;
  stage: string;
  project: string | false;
  score: number;
};

type Store = {
  projectsList: Project[];
  stagesList: Stage[];
  cardsList: Card[];
  isLoaded: boolean;
};

type StoreActions = {
  setProjectsList: (projectsList: Project[]) => void;
  setStagesList: (stagesList: Stage[]) => void;
  setCardsList: (cardsList: Card[]) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  addCard: (card: Card) => void;
};

export const STORAGE_NAME = 'appStore';

export const useStore = create<Store & StoreActions>()(
  persist(
    (set) => ({
      projectsList: PROJECTS,
      stagesList: STAGES,
      cardsList: CARDS,
      isLoaded: false,
      setProjectsList(projectsList) {
        return set({ projectsList });
      },
      setStagesList(stagesList) {
        return set({ stagesList });
      },
      setCardsList(cardsList) {
        return set({ cardsList });
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
      }
    }),
    { name: STORAGE_NAME, version: 1 }
  )
);
