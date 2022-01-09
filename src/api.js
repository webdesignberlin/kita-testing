import { initializeApp } from 'firebase/app';
import {
  collection,
  getFirestore,
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

/**
 * Firebase Instance
 * @type {FirebaseApp}
 */
export const instance = initializeApp(firebaseConfig);
/**
 * Firestore Instance
 * @type {Firestore}
 */
export const db = getFirestore(instance);
// enableIndexedDbPersistence(db);

/**
 * Firebase User Auth Instance
 * @type {Auth}
 */
export const auth = getAuth();

/**
 * User SignIn
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
export const providersQuery = query(collection(db, 'providers'));

/**
 * Tests Query
 * @type {Query<DocumentData>}
 */
export const testsQuery = query(collection(db, 'tests'), orderBy('date', 'desc'));

export const addTest = async ({ date, providerId, userId } = {}) => {
  await addDoc(collection(db, 'tests'), {
    date,
    provider: doc(db, `/providers/${providerId}`),
    userId,
  });
};

/**
 * Watch on User changes like sign-in, sign-out
 * @param cb
 * @return {Unsubscribe}
 */
export const onAuthStateChange = (cb) => onAuthStateChanged(auth, (user) => cb(user));

export default {
  onAuthStateChange,
};
