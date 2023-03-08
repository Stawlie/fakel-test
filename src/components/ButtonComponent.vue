<script setup lang="ts">
import { computed } from 'vue';

type ButtonProps = {
  text?: boolean;
  wide?: boolean;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  text: false,
  wide: false
});

const buttonClasses = computed(() => {
  return [
    'button',
    {
      'button--text': props.text
    },
    {
      'button--wide': props.wide
    }
  ];
});
</script>

<template>
  <button v-bind="$attrs" :class="buttonClasses">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  background-color: var(--button-background-color);
  color: var(--button-text-color);
  transition: 0.3s background-color;
  outline: none;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 0.8125rem;
  padding: 0.5rem 1.25rem;
}

.button.button--wide {
  width: 100%;
}

.button:hover {
  /* Свой цвет при наведении */
  background-color: #4188df;
}

.button.button--text {
  background-color: transparent;
  color: var(--primary-color);
}

.button.button--text.button:hover {
  /* Свой цвет при наведении */
  background-color: #ddd;
}
</style>
