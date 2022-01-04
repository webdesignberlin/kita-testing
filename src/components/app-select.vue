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
    type: String,
    default: null,
  },
  items: {
    type: Array,
    default: () => [],
  },
})

const update = (event) => emit('update:modelValue', event.target.value);
</script>

<template>
  <label class="field">
    <span class="field__text">{{ label }}</span>
    <select
        :value="modelValue"
        @update="update"
        @change="update"
        @input="update"
        class="field__input">
      <option></option>
      <option
          v-for="(item, index) in items"
          :key="index"
          :value="item.value">{{ item.text }}</option>
    </select>
  </label>
</template>

<style lang="scss" scoped>
@import '../assets/input-fields.scss';
</style>
