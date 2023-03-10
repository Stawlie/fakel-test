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

export type SelectedCardType = {
  id: number | null;
  title: string | null;
  stage: string | null;
  project: string | false;
  score: number | null;
};

type Store = {
  projectsList: ProjectType[];
  stagesList: StageType[];
  cardsObject: {
    [TKey in StageType['code']]: CardType[];
  };
  projectFilter: ProjectType['code'] | false;
  isLoaded: boolean;
  selectedCard: SelectedCardType | null;
};

type StoreActions = {
  resetState: () => void;
  setProjectFilter: (projectFilter: ProjectType['code'] | false) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  updateCardsObject: (card: CardType[], stage: StageType['code']) => void;
  addCard: (card: CardType) => void;
  deleteCard: (card: CardType) => void;
  updateCard: (card: CardType) => void;
  setSelectedCard: (selectedCard: SelectedCardType | null) => void;
};

export const STORAGE_NAME = 'appStore';

export const useStore = create<Store & StoreActions>()(
  persist(
    (set) => ({
      projectsList: PROJECTS,
      stagesList: STAGES,
      cardsObject: makecardsObject(CARDS, STAGES),
      projectFilter: false,
      isLoaded: false,
      selectedCard: null,
      resetState() {
        return set((state) => {
          if (state.selectedCard?.stage === null) {
            return {
              projectFilter: false,
              isLoaded: false
            };
          }

          return {
            projectFilter: false,
            isLoaded: false,
            selectedCard: null
          };
        });
      },
      setProjectFilter(projectFilter) {
        return set({ projectFilter });
      },
      setIsLoaded(isLoaded) {
        return set({ isLoaded });
      },
      updateCardsObject(cards, stage) {
        return set((state) => {
          return {
            cardsObject: {
              ...state.cardsObject,
              [stage]: cards
            }
          };
        });
      },
      addCard(card) {
        return set((state) => {
          return {
            cardsObject: {
              ...state.cardsObject,
              [card.stage]: [...state.cardsObject[card.stage], card]
            }
          };
        });
      },
      deleteCard(card) {
        return set((state) => {
          return {
            cardsObject: {
              ...state.cardsObject,
              [card.stage]: state.cardsObject[card.stage].filter((item) => item.id !== card.id)
            }
          };
        });
      },
      updateCard(card) {
        return set((state) => {
          return {
            cardsObject: {
              ...state.cardsObject,
              [card.stage]: state.cardsObject[card.stage].map((item) =>
                item.id === card.id ? card : item
              )
            }
          };
        });
      },
      setSelectedCard(selectedCard) {
        if (selectedCard === null) {
          return set({ selectedCard: null });
        }
        return set({
          selectedCard: {
            ...selectedCard
          }
        });
      }
    }),
    { name: STORAGE_NAME, version: 1 }
  )
);

function makecardsObject(cardsList: CardType[], stagesList: StageType[]) {
  const tempObject: Record<string, CardType[]> = {};

  stagesList
    .map((item) => item.code)
    .forEach((stage) => {
      tempObject[stage] = cardsList.filter((card) => card.stage === stage);
    });

  return tempObject;
}
