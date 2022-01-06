import { computed, ref } from 'vue';
import { onAuthStateChange } from '../api';

/**
 * Get User Information
 * @return {{userName: ComputedRef<string | undefined>, userId: ComputedRef<string>}}
 */
export const useUser = () => {
  const user = ref(null);
  onAuthStateChange((userLoggedIn) => {
    if (userLoggedIn) {
      user.value = userLoggedIn;
    } else {
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
