<script setup>
import { ref } from 'vue';

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Add from './views/add.vue';
import List from './views/list.vue';
const currentView = ref('dashboard');
const setView = (name) => {
  currentView.value = name;
};
</script>

<template>
  <div
      :class="`layer--${currentView}`"
      class="layer">
    <div class="layer__add">
      <button
          class="layer__button"
          v-if="currentView !== 'add'"
          @click="setView('add')">+</button>
      <Add
          @added="setView('list')"
          v-if="currentView === 'add'" />
    </div>
    <div
        class="layer__list">
      <button
          class="layer__button layer__button--list"
          v-if="currentView !== 'list'"
          @click="setView('list')">☰</button>
      <List v-if="currentView === 'list'" />
    </div>
  </div>
</template>

<style>
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.layer {
  display: grid;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  overflow: hidden;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 50vh);
  place-items: stretch;
}
.layer__button {
  font-size: 3rem;
  border-radius: 10px;
  background: #F7F4EA;
  box-shadow:  8px 8px 16px #d9d7ce,
  -8px -8px 16px #ffffff;
}
.layer__button--list {
  border-radius: 1rem;
  background: #75C9C8;
  box-shadow:  8px 8px 16px #67b1b0,
  -8px -8px 16px #83e1e0;
}
.layer__button--list:hover {
  background: linear-gradient(145deg, #69b5b4, #7dd7d6);
  box-shadow:  8px 8px 16px #67b1b0,
  -8px -8px 16px #83e1e0;
}
.layer--list {
  grid-template-rows: 9rem 1fr;
}
.layer__add {
  display: grid;
  padding: 1rem;
  place-items: center;
  background: #F7F4EA;
}
.layer__list {
  display: grid;
  padding: 2rem;
  place-items: center;
  overflow: scroll;
  background: #75C9C8;
}

button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  background: #F7F4EA;
  box-shadow:  8px 8px 16px #d9d7ce,
  -8px -8px 16px #ffffff;
  cursor: pointer;
  /*
  background: #DED9E2;
  border: 0.4rem solid #C0B9DD;*/
}
button:hover {
  background: linear-gradient(145deg, #dedcd3, #fffffa);
  box-shadow:  8px 8px 16px #d9d7ce,
  -8px -8px 16px #ffffff;
}
</style>
