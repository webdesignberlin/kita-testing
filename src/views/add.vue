<script setup>
import { ref, defineEmits, computed } from 'vue';
import { useStorage, useVibrate } from '@vueuse/core';
import { addTest } from '../api.js';
import AppInput from '../components/app-input.vue';
import AppSelect from '../components/app-select.vue';
import { userId, userName } from '../use/user';
import { providers } from '../use/providers';

/**
 * Info if Form is successfully submitted
 * @type {EmitFn<string[]>}
 */
const emit = defineEmits(['added'])
const providerList = computed(() => providers.value.map((item) => ({
  value: item.id,
  text: item.name,
})));
const lastProviderId = useStorage('lastProviderId', null);
const model = ref({
  providerId: lastProviderId.value,
  date: new Date().toISOString().slice(0,16),
  userId: userId,
});
const { vibrate: vibrateSuccess } = useVibrate({ pattern: [250] });
const submit = async () => {
  try {
    await addTest(model.value);
    lastProviderId.value = model.value.providerId;
    vibrateSuccess();
    emit('added');
  } catch(e) {
    console.log('@TODO', e);
  }
};
</script>
<template>
  <form
      class="form"
      @submit.prevent="submit()">
    <h1 class="form__title">Hallo, {{ userName }}</h1>
    <app-input
      label="Datum"
      v-model="model.date"
      type="datetime-local"
    />
    <app-select
        v-model="model.providerId"
        :items="providerList"
        label="Hersteller"
    />
    <button>Speichern</button>
  </form>
</template>
<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 24rem;
  &__title {
    font-size: 1.2rem;
    margin: 0 0 0.4rem 0;
  }
}
</style>
