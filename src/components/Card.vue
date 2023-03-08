<script setup lang="ts">
import type { CardType } from '@/store/useStore';
import { useStore } from '@/store/useStore';

const { projectsList, deleteCard } = useStore();

type CardProps = {
  card: CardType;
};

const props = defineProps<CardProps>();

function getProjectName(code: CardType['project']) {
  return projectsList.value.find((project) => project.code === code)?.name;
}
</script>

<template>
  <div class="card">
    <div class="card__body">
      <div class="card__header">
        <h4>{{ card.title }}</h4>
        <div class="card__header-actions">
          <div class="icon icon--note-edit" style="font-size: 1.0625rem"></div>
          <div class="icon icon--garbage" @click="deleteCard(card.id)"></div>
        </div>
      </div>
      <div class="card__description">
        <p>Балл:</p>
        <span>{{ card.score }}</span>
      </div>
      <div v-if="card.project" class="card__project">{{ getProjectName(card.project) }}</div>
    </div>
    <div class="card__draggable">
      <div class="icon icon--drag"></div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.75rem 0;

  background-color: var(--card-background-color);
  border-radius: var(--border-radius);
}

.card__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 0.75rem;
}

.card__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card__header-actions {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.card__header-actions .icon {
  cursor: pointer;
}

.card__description {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.card__project {
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--variant-secondary-color);
  background-color: #e5e9ef;
  font-size: 0.75rem;
  line-height: 0.9375rem;
  margin-top: auto;

  border: 1px solid #d2dae4;
  border-radius: var(--border-radius);
  padding: 0.25rem 0.5rem;
}

.card__draggable {
  padding: 0 0.5rem;
  cursor: grab;
}
</style>
