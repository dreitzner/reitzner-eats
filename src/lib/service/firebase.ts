import { readable } from 'svelte/store'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { browser } from '$app/env';

const firebaseConfig = {
    apiKey: "AIzaSyAsJNe79-T8ULhQk1CJ4NgQktH7cAdH9WU",
    authDomain: "reitzner-eats.firebaseapp.com",
    projectId: "reitzner-eats",
    storageBucket: "reitzner-eats.appspot.com",
    messagingSenderId: "21519801772",
    appId: "1:21519801772:web:42fec5da3d956074abae09",
    measurementId: "G-ENR9W6QJDT"
};
let auth;
let googleProvider;
let _user = null;

if (browser) {
    initializeApp(firebaseConfig);
    auth = getAuth();
    googleProvider = new GoogleAuthProvider();
    _user = readable(null, set => onAuthStateChanged(auth, (user) => set(user)));
}
export const user = _user;
export const login = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);
