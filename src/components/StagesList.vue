<script setup lang="ts">
import Stage from './Stage.vue';
import { useStore } from '@/store/useStore';

const { stagesList } = useStore();
</script>

<template>
  <div class="stages">
    <stage v-for="stage in stagesList" :stage="stage"></stage>
  </div>
</template>

<style scoped>
.stages {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max(20rem, (100% - 3.75rem)/4), 1fr));
  align-items: flex-start;
  grid-gap: 1.25rem;
}
</style>
