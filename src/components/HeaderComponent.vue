<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';
import FormControl from './FormControl.vue';
import SelectComponent from './SelectComponent.vue';
import { ref, computed } from 'vue';

import { useStore } from '@/store/useStore';

const { projectsList } = useStore();

const projectFilter = ref('');

const projectOptions = computed<
  {
    value: string;
    text: string;
  }[]
>(() => {
  return projectsList.value.map((project) => {
    return {
      value: project.code,
      text: project.name
    };
  });
});
</script>

<template>
  <header class="header">
    <h1>Карточки</h1>
    <div class="header__actions">
      <form-control position="horizontal" text="Проект">
        <select-component :options="projectOptions" v-model="projectFilter" />
      </form-control>
      <button-component>Добавить карточку</button-component>
      <button-component>Сохранить изменения</button-component>
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
