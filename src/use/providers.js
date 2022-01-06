import { onSnapshot } from 'firebase/firestore';
import { ref } from 'vue';
import { providersQuery } from '../api';

export const providers = ref([]);
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
