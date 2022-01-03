<script setup>
import { ref, defineEmits } from 'vue';
import { providers, addTest } from '../api.js';
const emit = defineEmits(['added'])
const provs = ref([]);
providers().then((res) => {
  provs.value = res;
});
const model = ref({
  providerId: null,
  date: new Date().toISOString().slice(0,16),
});
const submit = () => {
  addTest(model.value);
  emit('added');
};
</script>
<template>
  <form
      class="form"
      @submit.prevent="submit()">
    <label class="field">
      <span class="field__text">Datum</span>
      <input
          type="datetime-local"
          v-model="model.date"
          class="field__input">
    </label>
    <label class="field">
      <span class="field__text">Hersteller</span>
      <select
          class="field__input"
          required
          v-model="model.providerId">
        <option
            v-for="provider in provs"
            :key="provider.id"
            :value="provider.id">
          {{ provider.name }}
        </option>
      </select>
    </label>
    <button>Speichern</button>
  </form>
</template>
<style>
.form {
  width: 100%;
}
.field {
  display: block;
  margin: 2rem 0;
  text-align: left;
}
.field__text {
  display: block;
}
.field__input {
  appearance: none;
  padding: 0.6rem 1rem;
  width: 100%;
  border: none;
  border-radius: 10px;
  background: #F7F4EA;
  box-shadow: inset 8px 8px 16px #d9d7ce,
  inset -8px -8px 16px #ffffff;
}
</style>
