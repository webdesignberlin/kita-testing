<script setup>
import { computed, ref } from 'vue';
import { tests } from '../use/tests.js';
import { providers } from '../use/providers';

/**
 * Test-List mapped for UI
 * @type {ComputedRef<(*&{uiDate: string, providerName: *})[]>}
 */
const list = computed(() => tests.value.map((item) => ({
  ...item,
  uiDate: new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(Date.parse(item.date)),
  providerName: providers.value?.find((prov) => prov?.id === item?.providerId)?.name,
})))
</script>
<template>
  <section
      class="item"
      v-for="test in list"
      :key="test.date">
    <h1 class="item__date">{{ test.uiDate }}</h1>
    <p class="item__provider">{{ test.providerName }}</p>
  </section>
</template>

<style lang="scss" scoped>
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

  &__provider {
    font-size: 1rem;
  }
  &__date {
    font-size: inherit;
  }
}
</style>
