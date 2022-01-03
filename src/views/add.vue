<script setup>
import { ref, defineEmits } from 'vue';
import { providers, addTest } from '../api.js';
import AppInput from '../components/app-input.vue';
import AppSelect from '../components/app-select.vue';
const emit = defineEmits(['added'])
const provs = ref([]);
providers().then((res) => {
  provs.value = res.map((item) => ({
    value: item.id,
    text: item.name,
  }));
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
    <app-input
      label="Datum"
      v-model="model.date"
      type="datetime-local"
    />
    <app-select
        v-model="model.providerId"
        :items="provs"
        label="Hersteller"
    />
    <button>Speichern</button>
  </form>
</template>
<style>
.form {
  width: 100%;
}
</style>
