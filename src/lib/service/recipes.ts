import { derived } from 'svelte/store';
import type { Readable } from 'svelte/store';
import {provider} from '$lib/service/firebase';
import {user} from '$lib/service/auth';
import {ingrediants} from '$lib/service/ingrediants';


const db = provider.firestore();

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
        await ref.set(cleanRecipe(recipe));
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
export const recipeAdd = async (recipe: IRecipeMapped): Promise<boolean> => {
    if (!recipesRef) return;
    try {
        await recipesRef.add(cleanRecipe(recipe));
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const recipes: Readable<IRecipeMapped[]> = derived([user, ingrediants], ([$user, $ingrediants], set) => {
    if ($user && $ingrediants) {
        recipesRef = db.collection('rezept');
        unsubscribe = recipesRef.orderBy('name').onSnapshot(async (snapshot) => {
            const recipePromises = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id, ref: doc.ref}));
            const recipes: IRecipe[] = await Promise.all(recipePromises);
            const recipesMapped: IRecipeMapped[] = recipes.map(r => {
                const zutaten: IIngrediantRecipe[] = r.zutaten
                    .map(z => {
                        const ingrediant = $ingrediants?.find(i => i.id === z._id);
                        if (!ingrediant) return ingrediant;
                        ingrediant.ref = null;

                        return {
                            ...ingrediant,
                            amount: z.amount,
                        }
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
