<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits([
  'update:modelValue',
  'input:modelValue',
  'change:modelValue',
]);

defineProps({
  label: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [String, Number, Date],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  }
})

const update = (event) => emit('update:modelValue', event.target.value);
</script>

<template>
  <label class="field">
    <span class="field__text">{{ label }}</span>
    <input
        :type="type"
        :value="modelValue"
        @update="update"
        @change="update"
        @input="update"
        class="field__input">
  </label>
</template>

<style lang="scss" scoped>
@import '../assets/input-fields.scss';
</style>
