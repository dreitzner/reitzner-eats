import { readable } from 'svelte/store'
import firebase from "firebase/app/dist/index.esm";
import "firebase/auth/dist/index.esm";
import "firebase/firestore/dist/index.esm";

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

let googleProvider;
let _user = null;
let _db = null;

if (browser) {
    firebase.initializeApp(firebaseConfig);
    googleProvider = new firebase.auth.GoogleAuthProvider();
    _user = readable(null, set => firebase.auth().onAuthStateChanged((user) => set(user)));
    _db = firebase.firestore();
}

export const user = _user;
export const db = _db;
export const login = () => firebase.auth().signInWithPopup(googleProvider);
export const logout = () => firebase.auth().signOut();
