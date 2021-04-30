import type { Readable } from 'svelte/types/runtime/store';

import { derived } from 'svelte/store'
import {user} from '$lib/service/firebase';
import { getFirestore, collection, updateDoc, addDoc, onSnapshot, query, orderBy } from "firebase/firestore"; 
import { browser } from '$app/env';

let db = null;
if (browser) {
    db = getFirestore();
}

let ingredientsRef;
let unsubscribe;

export const emptyIngrediant: IIngrediant = {
    id: null,
    name: '',
    kohlenhydrate: 0,
    zucker: 0,
    fett: 0,
    eiweiß: 0,
    balaststoffe: 0,
    kcal: 0,
    gesFett: 0,
    ref: null,
};

const cleanIngrediant = (ingrediant: IIngrediant): IIngrediant => {
    const ingrediantToClean = {...ingrediant};
    delete ingrediantToClean.id;
    delete ingrediantToClean.ref;

    return ingrediantToClean;
}

export const ingrediantUpdate = async (ingrediant: IIngrediant): Promise<boolean> => {
    if (!ingredientsRef) return;
    try {
        const { ref } = ingrediant;
        await updateDoc(ref, cleanIngrediant(ingrediant))
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
export const ingrediantAdd = async (ingrediant: IIngrediant): Promise<boolean> => {
    if (!ingredientsRef) return;
    try {
        await addDoc(ingredientsRef, cleanIngrediant(ingrediant));
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const ingrediants: Readable<IIngrediant[]> = derived(user, ($user, set) => {
    if ($user) {
        ingredientsRef = collection(db, 'zutaten');
        const qRef = query(ingredientsRef, orderBy('name'));
        unsubscribe = onSnapshot(qRef, async (snapshot) => {
            const ingrediants = snapshot.docs.map(doc => (Object.assign(doc.data() || {}, {id: doc.id, ref: doc.ref})));
            // const ingrediants: IIngrediant[] = await Promise.all(ingredientPromises);
            set(ingrediants);
        });
    } else {
        unsubscribe?.();
        set(null);
    }
}, null);
