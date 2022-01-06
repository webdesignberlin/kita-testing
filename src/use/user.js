import { computed, ref } from 'vue';
import { onAuthStateChange } from '../api.js';

/**
 * Get User Information
 * @return {{userName: ComputedRef<string | undefined>, userId: ComputedRef<string>}}
 */
export const useUser = () => {
  const user = ref(null);
  onAuthStateChange((userLoggedIn) => {
    if (userLoggedIn) {
      console.log('userLoggedIn', userLoggedIn);
      user.value = userLoggedIn;
    } else {
      console.log('userLogged Out');
      user.value = null;
    }
  });
  const userId = computed(() => user.value?.uid);
  const userName = computed(() => user.value?.displayName);
  return {
    userId,
    userName,
  };
};

export default {
  useUser,
};
