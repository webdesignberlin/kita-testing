import { onSnapshot } from 'firebase/firestore';
import { ref } from 'vue';
import { getProviders } from '../api';

export const providers = ref([]);
onSnapshot(getProviders, (querySnapshot) => {
  const tempProvider = [];
  querySnapshot.forEach((doc) => {
    tempProvider.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  providers.value = tempProvider;
});
