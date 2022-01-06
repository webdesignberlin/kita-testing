import { onSnapshot } from 'firebase/firestore';
import { ref } from 'vue';
import { testsQuery } from '../api';

export const tests = ref([]);
onSnapshot(testsQuery, (querySnapshot) => {
  const tempTests = [];
  querySnapshot.forEach((doc) => {
    const {
      provider,
      date,
    } = doc.data();
    tempTests.push({
      id: doc.id,
      date,
      providerId: provider.id,
    });
  });
  tests.value = tempTests;
});
