import { initializeApp } from 'firebase/app';
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  doc,
  enableIndexedDbPersistence,
  query,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
};

export const instance = initializeApp(firebaseConfig);
export const db = getFirestore(instance);
enableIndexedDbPersistence(db);

export const getProviders = await getDocs(collection(db, 'providers'));
// export const getTests = await getDocs(collection(db, 'tests'));
export const getTests = await getDocs(query(collection(db, 'tests'), orderBy('date', 'desc')));
export const providers = getProviders.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));
export const tests = () => getTests.docs.map((doc) => {
  const {
    provider,
    date,
  } = doc.data();
  return {
    id: doc.id,
    date,
    providerId: provider.id,
  };
});

export const addTest = async ({ date, providerId } = {}) => {
  await addDoc(collection(db, 'tests'), {
    date,
    provider: doc(db, `/providers/${providerId}`),
  });
  tests();
}
/* providers.forEach((doc) => {
  console.log(doc.data());
  console.log(`${doc.id} => ${doc.data()}`);
}); */

export default {
  providers,
  tests,
}
// const user = useFirestore(db.collection('users').doc('my-user-id'))
