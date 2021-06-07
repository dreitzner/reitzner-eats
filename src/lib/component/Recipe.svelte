<script lang="ts">
    import { recipeUpdate, emptyRecipe } from '$lib/service/recipes'
    import { afterUpdate } from 'svelte';
    import Card from '$lib/component/Card.svelte';
    import EditButton from '$lib/component/EditButton.svelte';
    import { ingrediants } from '$lib/service/ingrediants';

    export let recipe: IRecipeMapped;
    export let editMode: boolean = false;
    export let showAll: boolean = false;
    
    let writeInProgress: boolean;
    let newWeight: number;
    let newIngrediant: IIngrediant;

    let id: string;
    let name: string;
    let gesamtgewicht: number;
    let zutaten: IIngrediantRecipe[];
    let ref;

    const setRecipe = (recipe: IRecipeMapped) => {
        ({
            id,
            name,
            gesamtgewicht,
            zutaten,
            ref,
        } = recipe);
    }

    const updateRecipe = async () => {
        writeInProgress = true;
        const worked = await recipeUpdate(getRecipe())
        writeInProgress = false;
        return worked;
    };

    const clickHandler = async () => {
        if (!editMode) return (editMode = !editMode);
        editMode = !(await updateRecipe());
    };

    const addIngrediant = async () => {
        zutaten = [
            ...zutaten,
            {
                ...newIngrediant,
                amount: newWeight,
            }
        ];
        if (!(await updateRecipe())) return;
        newIngrediant = null;
        newWeight= null;
    };

    const removeIngrediant = (id: string) => {
        zutaten = zutaten.filter(z => z.id !== id);
        updateRecipe();
    };

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

    const sumByType = (zutaten: IIngrediantRecipe[],type: string): number => zutaten.reduce((acc, ingrediant) => acc + (ingrediant[type] || 0) * ingrediant.amount, 0) / gesamtgewicht || 0;

    $: sumKohlenhydrate = sumByType(zutaten, 'kohlenhydrate');
    $: sumZucker = sumByType(zutaten, 'zucker');
    $: sumFett = sumByType(zutaten, 'fett');
    $: sumEiweiß = sumByType(zutaten, 'eiweiß');
    $: sumBalaststoffe = sumByType(zutaten, 'balaststoffe');
    $: sumKcal = sumByType(zutaten, 'kcal');
    $: sumGesFett = sumByType(zutaten, 'gesFett');

    $: availabelIngrediants = $ingrediants.filter(i => !zutaten.map(z => z.id).includes(i.id));
    
    setRecipe(recipe);
    
    afterUpdate(() => {
        if (editMode) return;
        setRecipe(recipe);
    })
</script>

<Card {editMode} on:click>
    <svelte:fragment slot="form">
        <h2>{name}</h2>
        <div>
            <span>kcal</span>
            <span>{sumKcal}</span>
        </div>
        <div>
            <span>Fett</span>
            <span>{sumFett}</span>
        </div>
        <div>
            <span>Kohlenhydrate</span>
            <span>{sumKohlenhydrate}</span>
        </div>
        <div>
            <span>Eiweiß</span>
            <span>{sumEiweiß}</span>
        </div>
        <section class="details {(showAll || editMode) && '-show'}">
            <div>
                <span>Balaststoffe</span>
                <span>{sumBalaststoffe}</span>
            </div>
            <div>
                <span>Zucker</span>
                <span>{sumZucker}</span>
            </div>
            <div>
                <span>ges&auml;ttigte Fettsäuren</span>
                <span>{sumGesFett}</span>
            </div>
            <div>
                <label for="{id}-name">Name</label>
                <input
                    id="{id}-name"
                    type="text"
                    bind:value={name}
                />
            </div>
            <div>
                <label for="{id}-weight">Gesamtgewicht</label>
                <input id="{id}-weight" type="number" bind:value={gesamtgewicht} disabled={!editMode}>
            </div>
            <h3>Zutaten</h3>
            <section class="ingrediants">
                {#each zutaten as zutat, i}
                    <div>
                        <label for="{zutat.id}-zutat-{i}">{zutat.name}</label>
                        <input id="{zutat.id}-zutat-{i}" type="number" bind:value={zutat.amount} disabled={!editMode}>
                        
                        {#if editMode}
                            <button class="delete" on:click={() => removeIngrediant(zutat.id)}>
                                <span class="material-icons-outlined">
                                    delete
                                </span>
                            </button>
                        {/if}
                    </div>
                {/each}
                {#if editMode}
                <hr>
                <div>
                    <select bind:value={newIngrediant}>
                        {#each availabelIngrediants as ingrediant}
                            <option value={ingrediant}>{ingrediant.name}</option>
                        {/each}
                    </select>
                    <input type="number" bind:value={newWeight}>

                    <button class="add" on:click={addIngrediant}>
                        <span class="material-icons-outlined">
                            add_circle_outline
                        </span>
                    </button>
                </div>
                {/if}
            </section>
        </section>
    </svelte:fragment>


    <slot {getRecipe} {clear} slot="button">
        <EditButton {clickHandler} disabled={writeInProgress} {editMode} />
    </slot>
</Card>

<style>

    div {
        display: flex;
        justify-content: space-between;
        margin-bottom: .3rem;
    }
    
    .details {
        height: 0;
        overflow: hidden;
        transition: height .3s ease-out;
        margin: 0 -2em;
        padding: 0 2em;
    }

    .details.-show {
        height: auto;
    }

    h3 {
        transform: translateY(50%);
        margin-bottom: 0;
    }
    .ingrediants {
        border: 1px dashed #ccc;
        margin: 0 -1em;
        padding: 1em;
    }

    button {
        border: 0;
        background: none;
    }

    .delete {
        color: red;
    }
    .add {
        color: green;
    }
</style>
