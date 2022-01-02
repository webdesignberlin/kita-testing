<script setup>
import { ref } from 'vue';
import { tests, providers } from '../api.js';
const results = ref([]);
const provs = ref([]);
providers().then((res) => {
  provs.value = res;
  tests().then((res) => {
    results.value = res;
  });
});
</script>
<template>
  <section
      class="item"
      v-for="test in results"
      :key="test.date">
    <h1 class="item__date">{{ new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }).format(Date.parse(test.date)) }}</h1>
    <p class="item__provider">{{ provs.find((prov) => prov.id === test.providerId ).name }}</p>
  </section>
</template>

<style>
.item {
  padding: 2rem;
  margin: 2rem;
  /* border: 1rem solid #75C9C8; */
  position: relative;
  font-size: 1.2rem;
  text-align: left;
  width: 100%;
  border-radius: 1rem;
  background: #75C9C8;
  box-shadow: inset 8px 8px 16px #67b1b0,
  inset -8px -8px 16px #83e1e0;
  /* display: grid;
  grid-template-columns: 14ch 1fr; */
}
.item__provider,
.item__date {
  font-size: inherit;
}
.item__provider {
  font-size: 1rem;
}
.item__dateFoo {
  position: absolute;
  bottom: 0;
  right: 1rem;
  transform: translate3d(0, calc(50%), 0);
  margin: 0;
}
</style>
