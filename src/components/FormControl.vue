<script setup lang="ts">
import { computed } from 'vue';

type FormControlProps = {
  text: string;
  required?: boolean;
  position?: 'horizontal' | 'vertical';
  wide?: boolean;
};

const props = withDefaults(defineProps<FormControlProps>(), {
  required: false,
  position: 'vertical',
  wide: false
});

const formControlClasses = computed(() => {
  return [
    'form-control',
    {
      'form-control--vertical': props.position === 'vertical'
    }
  ];
});

const valueClasses = computed(() => {
  return [
    'form-control__value',
    {
      wide: props.wide
    }
  ];
});
</script>

<template>
  <div :class="formControlClasses">
    <p class="form-control__text">{{ text }}<span v-if="required" class="asterisk"> *</span>:</p>
    <div :class="valueClasses">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.form-control {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.form-control--vertical {
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
</style>
