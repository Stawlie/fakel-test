<script setup lang="ts">
import type { Option } from '@/utils';
type SelectProps = {
  modelValue: unknown;
  options: Option[];
  required?: boolean;
};

withDefaults(defineProps<SelectProps>(), {
  required: false
});

const emit = defineEmits(['update:modelValue']);

function updateModel(event: Event) {
  const target = event.target as HTMLSelectElement;

  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="select-wrapper">
    <div
      class="icon icon--chevron-down select-icon"
      style="background-color: var(--variant-secondary-color)"
    ></div>
    <select
      :required="required"
      ref="select"
      v-bind="$attrs"
      @change="updateModel($event)"
      class="select"
    >
      <option selected :disabled="required" value="">Не выбрано</option>
      <option
        v-for="option in options"
        :value="option.value"
        :selected="option.value === modelValue"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select-wrapper {
  position: relative;
  display: block;
  background-color: var(--input-background-color);
  position: relative;
  border: none;
  border-radius: var(--border-radius);
}
.select {
  appearance: none;
  background-color: transparent;
  border: none;
  outline: none;
  margin: 0;
  width: 100%;
  font-size: 0.8125rem;
  padding: 0.5rem 2rem 0.5rem 1rem;
}

.select:-ms-expand {
  display: none;
}

.select-icon {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}
</style>
