import { derived } from 'svelte/store'
import {provider} from '$lib/service/firebase';
import {user} from '$lib/service/auth';


const db = provider.firestore();

let ingredientsRef;
let unsubscribe;

export const ingrediants = derived(user, ($user, set) => {
    if ($user) {
        ingredientsRef = db.collection('zutaten');
        unsubscribe = ingredientsRef.orderBy('name').onSnapshot(snapshot => {
            const ingredients = snapshot.docs.map(doc => doc.data());
            console.log(ingredients);
            set(ingrediants);
        })
    } else {
        unsubscribe?.();
        set(null);
    }
}, null);
