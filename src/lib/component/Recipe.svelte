<script lang="ts">
    import { recipeUpdate, emptyRecipe } from '$lib/service/recipes'
    import { afterUpdate } from 'svelte';
    import Card from '$lib/component/Card.svelte';

    export let recipe: IRecipeMapped;
    export let editMode: boolean = false;
    
    let writeInProgress: boolean;

    let {
        id,
        name,
        gesamtgewicht,
        zutaten,
        ref,
    } = recipe;
    
    afterUpdate(() => {
        if (editMode) return;
        setRecipe(recipe);
    })

    const setRecipe = (recipe: IRecipeMapped) => {
        ({
            id,
            name,
            gesamtgewicht,
            zutaten,
            ref,
        } = recipe);
    }

    const changeEditMode = async () => {
        if (!editMode) return (editMode = !editMode);

        writeInProgress = true;
        const worked = await recipeUpdate({
            id,
            name,
            gesamtgewicht,
            zutaten,
            ref,
        });
        editMode = !worked;
        writeInProgress = false;
    }

    const clear = () => {
        setRecipe(emptyRecipe);
    }

    const getRecipe = () => ({
        id,
        name,
        gesamtgewicht,
        zutaten,
        ref,
    });
</script>

<Card {editMode}>
    <div>
        <label for="{id}-name">Name</label>
        <input id="{id}-name" type="text" bind:value={name} disabled={!editMode}>
    </div>
    <div>
        <label for="{id}-weight">Gesamtgewicht</label>
        <input id="{id}-weight" type="number" bind:value={gesamtgewicht} disabled={!editMode}>
    </div>

    <!-- zutaten -->

    <slot {getRecipe} {clear}>
        <button on:click={changeEditMode} disabled={writeInProgress}>
            {editMode ? '✔' : '🖊'}
        </button>
    </slot>
</Card>

<style>

    div {
        display: flex;
        justify-content: space-between;
        margin-bottom: .3rem;
    }

    button {
        position: relative;
        align-self: flex-end;
        background: var(--buttonColor);
        border: none;
        outline: none;
        color: #fff;
        font-size: 1.5rem;
        border-radius: 50%;
        text-align: center;
        height: 2.5rem;
        width: 2.5rem;
    }

    button::before {
        content: '';
        position: absolute;
        top: -.3rem;
        left: -.3rem;
        border: .2rem solid var(--buttonColor);
        border-radius: 50%;
        height: 2.7rem;
        width: 2.7rem;
        transform: scale(0);
        transition: transform .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    button:active::before,
    button:focus::before {
        transform: scale(1);
    }

    button:disabled {
        --buttonColor: #ccc;
    }
</style>
