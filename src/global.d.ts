/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

declare interface IIngrediant {
    id?: string;
    name: string;
    kohlenhydrate: number;
    zucker: number;
    fett: number;
    eiweiß: number;
    balaststoffe: number;
    kcal: number;
    gesFett: number;
    ref?: DocumentReference<T>;
}

declare interface IIngrediantApi {
    _id: string;
    amount: number;
}

declare interface IIngrediantRecipe extends IIngrediant {
    amount: number;
}

declare interface IRecipe {
    id: string;
    name: string;
    zutaten: IIngrediantApi[];
    gesamtgewicht: number;
    ref?: DocumentReference<T>;
}
declare interface IRecipeMapped extends IRecipe {
    zutaten: IIngrediantRecipe[];
}
