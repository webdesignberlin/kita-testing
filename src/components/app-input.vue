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
.field {
  display: block;
  margin: 2rem 0;
  text-align: left;

  &__text {
    display: block;
  }

  &__input {
    // appearance: none;
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
}
</style>
