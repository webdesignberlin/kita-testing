import { initializeApp } from 'firebase/app';
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  doc,
  // enableIndexedDbPersistence,
  query,
  orderBy,
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

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
// enableIndexedDbPersistence(db);

export const auth = getAuth();
/**
 * User Auth
 * @param {string} email
 * @param {string} password
 * @return {Promise<UserCredential>}
 */
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
/**
 * .then((res) => {
  updateProfile(auth.currentUser, {
    displayName: 'Jasmin',
  })
  return res;
})
 */

/**
 * Provider Query
 * @type {Query<DocumentData>}
 */
export const getProviders = query(collection(db, 'providers'));
// export const getTests = await getDocs(collection(db, 'tests'));
export const testsQuery = query(collection(db, 'tests'), orderBy('date', 'desc'));

export const addTest = async ({ date, providerId, userId } = {}) => {
  await addDoc(collection(db, 'tests'), {
    date,
    provider: doc(db, `/providers/${providerId}`),
    userId,
  });
};
/* providers.forEach((doc) => {
  console.log(doc.data());
  console.log(`${doc.id} => ${doc.data()}`);
}); */

// export const userLoggedOut = (cb) => onAuthStateChanged(auth, () => cb);
export const onAuthStateChange = (cb) => onAuthStateChanged(auth, user => cb(user));

// export default {}
// const user = useFirestore(db.collection('users').doc('my-user-id'))
