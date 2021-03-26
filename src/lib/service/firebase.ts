import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAsJNe79-T8ULhQk1CJ4NgQktH7cAdH9WU",
    authDomain: "reitzner-eats.firebaseapp.com",
    projectId: "reitzner-eats",
    storageBucket: "reitzner-eats.appspot.com",
    messagingSenderId: "21519801772",
    appId: "1:21519801772:web:42fec5da3d956074abae09",
    measurementId: "G-ENR9W6QJDT"
};

firebase.initializeApp(firebaseConfig);

export const provider = firebase;
