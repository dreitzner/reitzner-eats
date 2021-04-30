import { derived } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { getFirestore, collection, updateDoc, addDoc, onSnapshot, query, orderBy } from "firebase/firestore"; 
import {user} from '$lib/service/firebase';
import {ingrediants} from '$lib/service/ingrediants';
import { browser } from '$app/env';

let db = null;
if (browser) {
    db = getFirestore();
}

let recipesRef;
let unsubscribe;

export const emptyRecipe: IRecipeMapped = {
    id: null,
    name: '',
    gesamtgewicht: 0,
    zutaten: [],
    ref: null,
};

const cleanRecipe = (recipe: IRecipeMapped): IRecipeMapped => {
    const recipeToClean = {...recipe};
    delete recipeToClean.id;
    delete recipeToClean.ref;

    // TODO: unmap zutaten and change type
    return recipeToClean;
}

export const recipeUpdate = async (recipe: IRecipeMapped): Promise<boolean> => {
    if (!recipesRef) return;
    try {
        const { ref } = recipe;
        await updateDoc(ref, cleanRecipe(recipe))
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
export const recipeAdd = async (recipe: IRecipeMapped): Promise<boolean> => {
    if (!recipesRef) return;
    try {
        await addDoc(recipesRef, cleanRecipe(recipe));
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const recipes: Readable<IRecipeMapped[]> = derived([user, ingrediants], ([$user, $ingrediants], set) => {
    if ($user && $ingrediants) {
        recipesRef = collection(db, 'rezept');
        const qRef = query(recipesRef, orderBy('name'));
        unsubscribe = onSnapshot(qRef, async (snapshot) => {
            const recipes: IRecipe[] = snapshot.docs.map((doc) => (Object.assign(doc.data() || {}, { id: doc.id, ref: doc.ref }))) as IRecipe[];
            // const recipes: IRecipe[] = await Promise.all(recipePromises);
            const recipesMapped: IRecipeMapped[] = recipes.map(r => {
                const zutaten: IIngrediantRecipe[] = r.zutaten
                    .map((z): IIngrediantRecipe => {
                        const ingrediant = $ingrediants?.find(i => i.id === z._id);
                        if (!ingrediant) return null;
                        ingrediant.ref = null;

                        return {
                            ...ingrediant,
                            amount: z.amount,
                        };
                    })
                    .filter(i => i);
                return {
                    id: r.id,
                    name: r.name,
                    zutaten,
                    gesamtgewicht: r.gesamtgewicht,
                    ref: r.ref,
                }
            });
            set(recipesMapped);
        });
    } else {
        unsubscribe?.();
        set(null);
    }
}, null);
