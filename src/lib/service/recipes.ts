import { derived } from 'svelte/store'
import {provider} from '$lib/service/firebase';
import {user} from '$lib/service/auth';
import {ingrediants} from '$lib/service/ingrediants';


const db = provider.firestore();

let recipesRef;
let unsubscribe;

export const recipes = derived([user, ingrediants], ([$user, $ingrediants], set) => {
    if ($user) {
        recipesRef = db.collection('rezept');
        unsubscribe = recipesRef.orderBy('name').onSnapshot(async (snapshot) => {
            const recipePromises = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            const recipes: IRecipe[] = await Promise.all(recipePromises);
            const recipesMapped: IRecipeMapped[] = recipes.map(r => {
                const zutaten: IIngrediantRecipe[] = r.zutaten.map(z => ({...$ingrediants.find(i => i.id === z._id), amount: z.amount}));
                return {
                    id: r.id,
                    name: r.name,
                    zutaten,
                    gesamtgewicht: r.gesamtgewicht
                }
            });
            set(recipesMapped);
        });
    } else {
        unsubscribe?.();
        set(null);
    }
}, null);
