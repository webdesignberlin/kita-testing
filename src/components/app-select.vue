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

<style scoped>
.field {
  display: block;
  margin: 2rem 0;
  text-align: left;
}
.field__text {
  display: block;
}
.field__input {
  -webkit-appearance: none;
  height: 3rem;
  color: inherit;
  padding: 0.6rem 1rem;
  width: 100%;
  border: none;
  border-radius: 10px;
  background: #F7F4EA;
  box-shadow: inset 8px 8px 16px #d9d7ce,
  inset -8px -8px 16px #ffffff;
}
</style>
