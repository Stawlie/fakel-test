<script setup lang="ts">
import FormControl from './FormControl.vue';
import ButtonComponent from './ButtonComponent.vue';
import SelectComponent from './SelectComponent.vue';
import InputComponent from './InputComponent.vue';
import { ref, computed } from 'vue';
import { useStore, type CardType } from '@/store/useStore';
import { makeOptions } from '@/utils';

import router from '@/router';

type AddingCardProps = {
  type: 'modal-change' | 'modal-add' | 'page';
};

const props = defineProps<AddingCardProps>();

const {
  selectedCard,
  cardsObject,
  projectsList,
  setSelectedCard,
  stagesList,
  addCard,
  updateCard
} = useStore();

const form = ref<HTMLFormElement>();

const projectOptions = computed(() => makeOptions(projectsList.value, 'code', 'name'));

const stageOptions = computed(() => makeOptions(stagesList.value, 'code', 'name'));

function getTitle() {
  if (props.type === 'modal-add') {
    return 'Добавление';
  }

  if (props.type === 'modal-change') {
    return 'Изменение';
  }

  return 'Основные данные';
}

function getSubtitle() {
  if (props.type !== 'page') {
    return stagesList.value.find((stage) => stage.code === selectedCard.value?.stage)?.name;
  }

  return 'Чтобы добавить карточку, нужно заполнить данные';
}

function getButtonText() {
  if (props.type === 'modal-change') {
    return 'Сохранить';
  }

  return 'Добавить';
}

function closeCard() {
  setSelectedCard.value(null);

  if (props.type === 'page') {
    router.push('/');
  }
}

function buttonAction() {
  const fullSelectedCard = selectedCard.value as CardType;
  if (props.type === 'modal-add') {
    addCard.value({
      ...fullSelectedCard,
      score: Number(fullSelectedCard.score),
      id: getId()
    });
  }

  if (props.type === 'page') {
    addCard.value({
      ...fullSelectedCard,
      score: Number(fullSelectedCard.score),
      id: getId()
    });
    router.push('/');
  }

  if (props.type === 'modal-change') {
    updateCard.value({
      ...fullSelectedCard,
      score: Number(fullSelectedCard.score)
    });
  }

  setSelectedCard.value(null);
}

function getId() {
  const sortedIds = Object.values(cardsObject.value)
    .flat()
    .map((card) => card.id)
    .sort((a, b) => a - b);

  for (let i = 1; i <= sortedIds.length; i++) {
    if (sortedIds[i] - sortedIds[i - 1] > 1) {
      return sortedIds[i - 1] + 1;
    }
  }

  return sortedIds.length + 1;
}
</script>

<template>
  <div class="adding-card" v-if="selectedCard">
    <div class="adding-card__header">
      <h2>{{ getTitle() }}</h2>
      <p>{{ getSubtitle() }}</p>
      <div
        v-if="type !== 'page'"
        @click="closeCard"
        class="icon icon--close adding-card__header-close"
      ></div>
    </div>
    <form @submit.prevent="buttonAction" ref="form" class="adding-card__form">
      <form-control text="Заголовок" wide required>
        <input-component
          v-model="selectedCard.title"
          type="text"
          placeholder="Введите заголовок"
          maxlength="70"
          required
        ></input-component>
      </form-control>
      <form-control text="Проект" wide>
        <select-component
          v-model="selectedCard.project"
          :options="projectOptions"
        ></select-component>
      </form-control>
      <form-control v-if="type === 'page'" text="Стадия" required wide>
        <select-component
          v-model="selectedCard.stage"
          :options="stageOptions"
          required
        ></select-component>
      </form-control>
      <form-control text="Балл" wide required>
        <input-component
          v-model="selectedCard.score"
          placeholder="Введите балл"
          max="5"
          min="0"
          type="number"
          pattern="([0-9]*[.])?[0-9]+"
          step="0.1"
          required
        ></input-component>
      </form-control>
      <div class="adding-card__form-buttons">
        <button-component>{{ getButtonText() }}</button-component>
        <button-component v-if="type === 'page'" type="button" text @click="closeCard">
          Назад
        </button-component>
      </div>
    </form>
  </div>
</template>

<style scoped>
.adding-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.875rem;

  background-color: var(--card-background-color);
  border-radius: var(--border-radius);
}

.adding-card__header {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.adding-card__header-close {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  font-size: 1.5rem;
  background-color: var(--variant-secondary-color);
}

.adding-card__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.adding-card__form-buttons {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
</style>
