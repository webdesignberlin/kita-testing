<script setup>
import { ref, defineEmits } from 'vue';
import { signIn } from '../api';
import AppInput from '../components/app-input.vue';
const emit = defineEmits(['logged-in']);
const error = ref(null);
const model = ref({
  email: null,
  password: null,
});
const submit = async () => {
  try {
    const result = await signIn(model.value.email, model.value.password);
    error.value = null;
    emit('logged-in', result.user.displayName);
  } catch (e) {
    error.value = e.message;
  }
};
</script>
<template>
  <form
      class="form"
      @submit.prevent="submit()">
    <app-input
      label="E-Mail"
      v-model="model.email"
      type="email"
    />
    <app-input
        label="Passwort"
        v-model="model.password"
        type="password"
    />
    <p v-if="error">{{ error }}</p>
    <button>Einloggen</button>
  </form>
</template>
<style>
.form {
  width: 100%;
}
</style>
