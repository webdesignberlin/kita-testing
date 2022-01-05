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
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

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

export const auth = getAuth();
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
/**
 * .then((res) => {
  updateProfile(auth.currentUser, {
    displayName: 'Jasmin',
  })
  return res;
})
 */

export const getProviders = async () => await getDocs(collection(db, 'providers'));
// export const getTests = await getDocs(collection(db, 'tests'));
export const getTests = async () => await getDocs(query(collection(db, 'tests'), orderBy('date', 'desc')));
export const providers = async () => {
  const providers = await getProviders();
  const docs = providers.docs;
  return docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
export const tests = async () => {
  const coll = await getTests();
  const docs = coll.docs;
  return docs.map((doc) => {
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
};

export const addTest = async ({ date, providerId, userId } = {}) => {
  await addDoc(collection(db, 'tests'), {
    date,
    provider: doc(db, `/providers/${providerId}`),
    userId,
  });
  tests();
}
/* providers.forEach((doc) => {
  console.log(doc.data());
  console.log(`${doc.id} => ${doc.data()}`);
}); */

// export const userLoggedOut = (cb) => onAuthStateChanged(auth, () => cb);
export const onAuthStateChange = (cb) => onAuthStateChanged(auth, user => cb(user));

export default {
  providers,
  tests,
}
// const user = useFirestore(db.collection('users').doc('my-user-id'))
