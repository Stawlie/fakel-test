<script setup lang="ts">
import { computed } from 'vue';

type FormControlProps = {
  text: string;
  required?: boolean;
  position?: 'horizontal' | 'vertical';
};

const props = withDefaults(defineProps<FormControlProps>(), {
  required: false,
  position: 'vertical'
});

const formControlClasses = computed(() => {
  return [
    'form-control',
    {
      'form-control--vertical': props.position === 'vertical'
    }
  ];
});
</script>

<template>
  <div :class="formControlClasses">
    <p class="form-control__text">{{ text }}<span v-if="required" class="asterisk"> *</span>:</p>
    <div class="form-control__value">
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
}
</style>
