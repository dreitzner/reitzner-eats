import { readable } from 'svelte/store'
import {provider} from '$lib/service/firebase'


const auth = provider.auth();
const googleProvider = new provider.auth.GoogleAuthProvider();

export const user = readable(null, set => auth.onAuthStateChanged((user) => set(user)));
export const login = () => auth.signInWithPopup(googleProvider);
export const logout = () => auth.signOut();