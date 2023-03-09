<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';
import FormControl from './FormControl.vue';
import SelectComponent from './SelectComponent.vue';
import { computed } from 'vue';

import { makeOptions, LOADING_TIME } from '@/utils';
import { useStore } from '@/store/useStore';
import router from '@/router';

const {
  projectsList,
  stagesList,
  cardsList,
  projectFilter,
  setProjectFilter,
  setIsLoaded,
  setSelectedCard
} = useStore();

const projectOptions = computed(() => {
  return makeOptions(projectsList.value, 'code', 'name');
});

function removeLink(json: unknown) {
  return JSON.parse(JSON.stringify(json));
}

function saveChanges() {
  setIsLoaded.value(false);
  setTimeout(() => {
    setIsLoaded.value(true);
    console.log('Сохранённые данные:', {
      projects: removeLink(projectsList.value),
      stages: removeLink(stagesList.value),
      cards: removeLink(cardsList.value)
    });
    alert('Данные сформированы и выведены в консоль');
  }, LOADING_TIME);
}

function clickAddCard() {
  router.push('add');
  setSelectedCard.value({
    id: null,
    project: false,
    score: null,
    stage: null,
    title: null
  });
}
</script>

<template>
  <header class="header">
    <h1>Карточки</h1>
    <div class="header__actions">
      <form-control position="horizontal" text="Проект">
        <select-component
          :options="projectOptions"
          :model-value="projectFilter"
          @update:model-value="setProjectFilter"
        />
      </form-control>
      <button-component @click="clickAddCard">Добавить карточку</button-component>
      <button-component @click="saveChanges">Сохранить изменения</button-component>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__actions {
  display: flex;
  gap: 0.5rem;
}
</style>
