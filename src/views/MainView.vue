<script setup lang="ts">
import { useStore } from '@/store/useStore';

// Components
import HeaderComponent from '@/components/HeaderComponent.vue';
import StagesList from '@/components/StagesList.vue';
import Loader from '@/components/Loader.vue';
import Modal from '@/components/Modal.vue';

const { isLoaded, selectedCard } = useStore();
</script>

<template>
  <div class="app">
    <transition name="fade">
      <div class="app__body" v-if="isLoaded">
        <header-component></header-component>
        <stages-list></stages-list>
      </div>
      <loader v-else></loader>
    </transition>
    <transition name="fade">
      <modal v-if="selectedCard && selectedCard.stage"></modal>
    </transition>
  </div>
</template>

<style scoped>
.app {
  padding: 2rem 1rem;
}
.app__body {
  display: flex;
  flex-direction: column;
  max-width: 1340px;
  margin: 0 auto;
  gap: 1.25rem;
}
</style>
