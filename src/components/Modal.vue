<script setup lang="ts">
import FormCard from './FormCard.vue';
import { useStore } from '@/store/useStore';
import { onMounted, onUnmounted } from 'vue';

const { selectedCard, setSelectedCard } = useStore();

function escapeListener(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    setSelectedCard.value(null);
  }
}

function getFormType() {
  if (selectedCard.value?.id === null) {
    return 'modal-add';
  }

  return 'modal-change';
}

onMounted(() => {
  document.addEventListener('keydown', escapeListener);
});

onUnmounted(() => {
  document.removeEventListener('keydown', escapeListener);
});
</script>

<template>
  <div class="modal-wrapper">
    <div class="modal">
      <form-card :type="getFormType()"></form-card>
    </div>
  </div>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100svh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  background-color: var(--modal-background-color);
}

.modal {
  max-width: 23.75rem;
  width: 100%;
}
</style>
