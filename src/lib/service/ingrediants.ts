import { derived } from 'svelte/store'
import {provider} from '$lib/service/firebase';
import {user} from '$lib/service/auth';


const db = provider.firestore();

let ingredientsRef;
let unsubscribe;

export const ingrediants = derived(user, ($user, set) => {
    if ($user) {
        ingredientsRef = db.collection('zutaten');
        unsubscribe = ingredientsRef.orderBy('name').onSnapshot(async (snapshot) => {
            const ingredientPromises = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
            const ingrediants: IIngrediant[] = await Promise.all(ingredientPromises);
            set(ingrediants);
        });
    } else {
        unsubscribe?.();
        set(null);
    }
}, null);
