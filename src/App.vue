<script setup lang="ts">
import { onMounted } from 'vue';

import { useStore } from './store/useStore';

// Components
import HeaderComponent from './components/HeaderComponent.vue';
import StagesList from './components/StagesList.vue';
import Loader from './components/Loader.vue';

const { isLoaded, setIsLoaded } = useStore();

const LOADING_TIME = 2000;

onMounted(() => {
  setIsLoaded.value(false);
  setTimeout(() => {
    setIsLoaded.value(true);
  }, LOADING_TIME);
});
</script>

<template>
  <main class="app-wrapper">
    <transition name="fade">
      <div class="app" v-if="isLoaded">
        <header-component></header-component>
        <stages-list></stages-list>
      </div>

      <loader v-else></loader>
    </transition>
  </main>
</template>

<style scoped>
.app-wrapper {
  padding: 2rem 1rem;
}
.app {
  display: flex;
  flex-direction: column;
  max-width: 1340px;
  margin: 0 auto;
  gap: 1.25rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
