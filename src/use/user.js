import { computed, ref } from 'vue';
import { onAuthStateChange } from '../api';

export const user = ref(null);
export const updateUser = (userData) => {
  user.value = userData;
};
onAuthStateChange(updateUser);
export const userId = computed(() => user.value?.uid);
export const userName = computed(() => user.value?.displayName);

export default {
  user,
};
