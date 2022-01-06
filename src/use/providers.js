import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { ref } from 'vue';
import { getProviders } from '../api';

export const providers = ref([]);
onSnapshot(getProviders, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    providers.value.push({
      id: doc.id,
      ...doc.data(),
    });
  });
});
