import { onSnapshot } from 'firebase/firestore';
import { ref } from 'vue';
import { providersQuery } from '../api';

/**
 * List of mapped Providers
 * @type {Ref<UnwrapRef<*[]>>}
 */
export const providers = ref([]);
export const updateProviders = (querySnapshot) => {
  const tempProvider = [];
  querySnapshot.forEach((doc) => {
    tempProvider.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  providers.value = tempProvider;
};

/**
 * Watch Provider Data, Update Provider List
 */
onSnapshot(providersQuery, { next: (querySnapshot) => updateProviders(querySnapshot)});

export default {
  providers,
};
