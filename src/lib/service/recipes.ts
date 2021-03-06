import { derived } from 'svelte/store';
import type { Readable } from 'svelte/store';
import {user, db} from '$lib/service/firebase';
import {ingrediants} from '$lib/service/ingrediants';


let recipesRef;
let unsubscribe;

export const emptyRecipe: IRecipeMapped = {
    id: null,
    name: '',
    gesamtgewicht: 0,
    zutaten: [],
    ref: null,
};

const cleanRecipe = (recipe: IRecipeMapped): IRecipe => {
    const {
        id,
        name,
        gesamtgewicht,
    } = recipe;

    const zutaten: IIngrediantApi[] = recipe.zutaten.map(zutat => {
        return {
            _id: zutat.id,
            amount: zutat.amount,
        };
    });
    return {
        id,
        name,
        zutaten,
        gesamtgewicht,
    };
}

export const recipeUpdate = async (recipe: IRecipeMapped): Promise<boolean> => {
    if (!recipesRef) return;
    try {
        const { ref } = recipe;
        await ref.set(cleanRecipe(recipe))
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
    if ($user && $ingrediants && db) {
        recipesRef = db.collection('rezept')
        unsubscribe = recipesRef
            .orderBy('name')
            .onSnapshot(async (snapshot) => {
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
