<script setup lang="ts">
type InputProps = {
  modelValue: string;
};

defineProps<InputProps>();

const emit = defineEmits(['update:modelValue']);

function updateModel(event: Event) {
  const target = event.target as HTMLInputElement;

  emit('update:modelValue', target.value);
}
</script>

<template>
  <input v-bind="$attrs" :value="modelValue" @input="updateModel($event)" class="input" />
</template>

<style scoped>
.input {
  background-color: var(--input-background-color);
  padding: 0.5rem 1rem;
  outline: none;
  border: none;
  border-radius: var(--border-radius);
  font-size: 0.8125rem;
}

.input::placeholder {
  color: var(--variant-secondary-color);
}
</style>
