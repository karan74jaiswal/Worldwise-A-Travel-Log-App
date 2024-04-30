import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  writeBatch,
  getDoc,
} from "firebase/firestore";

// App's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initializing auth object
const auth = getAuth(app);

// Initializing Firestore Database
const db = getFirestore(app);

// Initializing Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setDefaultLanguage("en");
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Authentication Functions
// Signup with Email and Password
const signUpWithEmail = async (email, password) =>
  await createUserWithEmailAndPassword(auth, email, password);

// Signin with Email and Password
const signinWithEmail = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);

// Signin using Google
const signinWithGoogle = () => signInWithRedirect(auth, googleProvider);

// Auth Object State Change
const onAuthChange = function (callback) {
  onAuthStateChanged(auth, callback);
};

// Signout current Logged in User
const signoutUser = async () => await signOut(auth);

// Database Functions
const createNewUserDocument = async (user, fullName) => {
  const collectionRef = collection(db, "users");
  const documentRef = doc(collectionRef, user.uid);
  await setDoc(documentRef, {
    cities: [],
    fullName,
    createdAt: new Date(),
  });
};

const getUserData = async (user) => {
  const collectionRef = collection(db, "users");
  const documentRef = doc(collectionRef, user.uid);
  let documentSnap = await getDoc(documentRef);
  if (!documentSnap.exists()) {
    await setDoc(documentRef, {
      cities: [],
      fullName: user.displayName,
      createdAt: new Date(),
    });
    documentSnap = await getDoc(documentRef);
  }
  return documentSnap.data();
};

const updateCitiesInUserDocument = async (user, cities) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, "users");
  const documentRef = doc(collectionRef, user.uid);
  batch.update(documentRef, { cities });
  await batch.commit();
};

export {
  signUpWithEmail,
  signoutUser,
  signinWithEmail,
  signinWithGoogle,
  createNewUserDocument,
  getUserData,
  updateCitiesInUserDocument,
  onAuthChange,
};
