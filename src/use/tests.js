import { onSnapshot } from 'firebase/firestore';
import { ref } from 'vue';
import { testsQuery } from '../api';

/**
 * List of mapped Tests
 * @type {Ref<UnwrapRef<*[]>>}
 */
export const tests = ref([]);

/**
 * Watch for Changes, Update Tests
 */
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
