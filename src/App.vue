<script setup lang="ts">
import { onMounted } from 'vue';

import { LOADING_TIME } from './utils';
import { useStore } from './store/useStore';

const { resetState, setIsLoaded } = useStore();

onMounted(() => {
  resetState.value();

  setTimeout(() => {
    setIsLoaded.value(true);
  }, LOADING_TIME);
});
</script>

<template>
  <main class="app-wrapper">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
