<script setup>
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { onAuthStateChange } from './api';
import Login from './views/login.vue';
import Add from './views/add.vue';
import List from './views/list.vue';

/**
 * @typedef {'dashboard'|'add'|'list'} ViewNames
 */

/**
 * view name
 * @type {Ref<UnwrapRef<ViewNames>>}
 */
const currentView = ref('dashboard');
const user = useStorage('user', null);
/**
 * Set view
 * @param {ViewNames} name
 */
const setView = (name) => {
  currentView.value = name;
};

const handleUserLogin = (userName) => {
  user.value = userName;
  setView('add');
}

onAuthStateChange((userLoggedIn) => {
  if (userLoggedIn) {
    user.value = userLoggedIn.displayName;
  } else {
    user.value = null;
  }
});
</script>

<template>
  <div
      :class="`layer--${currentView}`"
      class="layer">
    <div
        v-if="!user"
        @click="setView('dashboard')"
        class="layer__add">
      <Login
          v-if="currentView === 'dashboard'"
          @logged-in="handleUserLogin"
      />
    </div>
    <div
        v-else
        class="layer__add">
      <button
          class="layer__button"
          v-if="currentView !== 'add'"
          @click="setView('add')">
        <span class="icon">+</span>
      </button>
      <Add
          @added="setView('list')"
          v-if="currentView === 'add'" />
    </div>
    <div
        class="layer__list">
      <button
          class="layer__button layer__button--list"
          v-if="currentView !== 'list'"
          @click="setView('list')">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#444"
            class="icon"
            viewBox="0 0 32 32">
          <path d="M4 10h24a2 2 0 000-4H4a2 2 0 000 4zm24 4H4a2 2 0 000 4h24a2 2 0 000-4zm0 8H4a2 2 0 000 4h24a2 2 0 000-4z"/></svg>
      </button>
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
  font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #444;
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

.icon {
  fill: currentColor;
  width: 2rem;
  height: 2rem;
}

button {
  font-size: 1rem;
}
</style>

<style lang="scss" scoped>
.layer {
  --layer-add-size: 50vh;
  --layer-list-size: 50vh;
  display: grid;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  overflow: hidden;
  grid-template-columns: 1fr;
  /* grid-template-rows: var(--layer-add-size) var(--layer-list-size); */
  grid-template-rows: 1fr 1fr;
  place-items: stretch;

  &__button {
    font-size: 3rem;
    border-radius: 10px;
    background: #F7F4EA;
    box-shadow:  8px 8px 16px #d9d7ce,
    -8px -8px 16px #ffffff;
    &--list {
      border-radius: 1rem;
      background: #75C9C8;
      box-shadow:  8px 8px 16px #67b1b0,
      -8px -8px 16px #83e1e0;
      &:hover {
        background: linear-gradient(145deg, #69b5b4, #7dd7d6);
        box-shadow:  8px 8px 16px #67b1b0,
        -8px -8px 16px #83e1e0;
      }
    }
  }

  &--list {
    --layer-add-size: 9rem;
    --layer-list-size: calc(100vh - var(--layer-add-size));
  }

  &__add {
    display: grid;
    padding: 1rem;
    place-items: center;
    background: #F7F4EA;
    height: var(--layer-add-size);
    transition: height 0.4s ease;
  }

  &__list {
    display: grid;
    padding: 2rem;
    place-items: center;
    overflow: scroll;
    background: #75C9C8;
    height: var(--layer-list-size);
    transition: height 0.4s ease;
  }
}
</style>
