<script setup lang="ts">
import type { StageType, CardType } from '@/store/useStore';
import ButtonComponent from './ButtonComponent.vue';
import Card from './Card.vue';
import { useStore } from '@/store/useStore';
import { computed, ref } from 'vue';
import draggable from 'vuedraggable';

const { cardsObject, updateCardsObject, projectFilter, setSelectedCard } = useStore();

type StageProps = {
  stage: StageType;
};

type Sort = 'ASC' | 'DESC' | null;

const props = defineProps<StageProps>();

const sort = ref<Sort>(null);

const ascSortClasses = computed(() => {
  return [
    'icon',
    'icon--arrow-down',
    'stage__sort-button',
    {
      'stage__sort-button--active': sort.value === 'ASC'
    }
  ];
});

const descSortClasses = computed(() => {
  return [
    'icon',
    'icon--arrow-up',
    'stage__sort-button',
    {
      'stage__sort-button--active': sort.value === 'DESC'
    }
  ];
});

function sortCards(cards: CardType[]) {
  if (sort.value === 'ASC') {
    return cards.sort((a, b) => b.score - a.score);
  }

  if (sort.value === 'DESC') {
    return cards.sort((a, b) => a.score - b.score);
  }

  return cards;
}

function changeSort(newSort: Sort) {
  sort.value = newSort;
}

function isAllFiltered(cards: CardType[]) {
  return (
    cards.filter((card) => !projectFilter.value || projectFilter.value === card.project).length ===
    0
  );
}

function addCardToStage() {
  setSelectedCard.value({
    id: null,
    project: '',
    score: null,
    stage: props.stage.code,
    title: ''
  });
}

function updateModel(newValue: CardType[]) {
  sort.value = null;

  updateCardsObject.value(
    newValue.map((item) => {
      return {
        ...item,
        stage: props.stage.code
      };
    }),
    props.stage.code
  );
}
</script>

<template>
  <div class="stage">
    <div class="stage__header">
      <div class="stage__title">
        <div class="stage__title-circle"></div>
        <h3>{{ stage.name }}</h3>
      </div>

      <div class="stage__sort">
        <div :class="ascSortClasses" style="font-size: 1.125rem" @click="changeSort('ASC')"></div>
        <div :class="descSortClasses" style="font-size: 1.125rem" @click="changeSort('DESC')"></div>
      </div>
    </div>

    <draggable
      :model-value="sort ? sortCards([...cardsObject[stage.code]]) : cardsObject[stage.code]"
      @update:model-value="updateModel"
      class="stage__list"
      handle=".card__draggable"
      group="cards-list"
      item-key="id"
    >
      <template #item="{ element }">
        <card v-if="!projectFilter || projectFilter === element.project" :card="element"></card>
      </template>
      <template #footer>
        <div
          v-if="cardsObject[stage.code].length === 0 || isAllFiltered(cardsObject[stage.code])"
          class="stage__empty"
        >
          Список пуст
        </div>
      </template>
    </draggable>

    <button-component @click="addCardToStage" text wide>Добавить</button-component>
  </div>
</template>

<style scoped>
.stage {
  display: flex;
  flex-shrink: 1;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;

  background-color: var(--stage-backgroud-color);
  border-radius: var(--border-radius);
}

.stage__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stage__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stage__title-circle {
  content: '';
  width: 0.25rem;
  height: 0.25rem;

  border-radius: 50%;
  background-color: var(--variant-secondary-color);
}

.stage__sort {
  display: flex;
  align-items: center;
}

.stage__sort-button {
  cursor: pointer;
}

.stage__sort-button--active {
  background-color: var(--button-background-color);
}

.stage__list {
  display: grid;
  grid-auto-rows: 7.5rem;
  gap: 0.5rem;
}

.stage__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7.5rem;

  font-size: 0.8125rem;
  color: var(--variant-secondary-color);

  border: 1px dashed #bac4d0;
  border-radius: var(--border-radius);
}
</style>
