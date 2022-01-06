import { onSnapshot } from 'firebase/firestore';
import { ref } from 'vue';
import { providersQuery } from '../api';

/**
 * List of mapped Providers
 * @type {Ref<UnwrapRef<*[]>>}
 */
export const providers = ref([]);

/**
 * Watch Provider Data, Update Provider List
 */
onSnapshot(providersQuery, (querySnapshot) => {
  const tempProvider = [];
  querySnapshot.forEach((doc) => {
    tempProvider.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  providers.value = tempProvider;
});
