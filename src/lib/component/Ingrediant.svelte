<script lang="ts">
    import { ingrediantUpdate, emptyIngrediant } from '$lib/service/ingrediants'
    import { afterUpdate } from 'svelte';
    import Card from '$lib/component/Card.svelte';

    export let ingrediant: IIngrediant;
    export let editMode: boolean = false;
    
    let writeInProgress: boolean;

    let {
        id,
        name,
        kohlenhydrate,
        zucker,
        fett,
        eiweiß,
        balaststoffe,
        kcal,
        gesFett,
        ref,
    } = ingrediant || {};

    afterUpdate(() => {
        if (editMode) return;
        setIngrediant(ingrediant);
    })

    const setIngrediant = (ingrediant: IIngrediant) => {
        ({
            id,
            name,
            kohlenhydrate,
            zucker,
            fett,
            eiweiß,
            balaststoffe,
            kcal,
            gesFett,
            ref,
        } = ingrediant);
    }

    const changeEditMode = async () => {
        if (!editMode) return (editMode = !editMode);

        writeInProgress = true;
        const worked = await ingrediantUpdate({
            id,
            name,
            kohlenhydrate,
            zucker,
            fett,
            eiweiß,
            balaststoffe,
            kcal,
            gesFett,
            ref,
        });
        editMode = !worked;
        writeInProgress = false;
    }

    const clear = () => {
        setIngrediant(emptyIngrediant);
    }

    const getIngrediant = () => ({
        id,
        name,
        kohlenhydrate,
        zucker,
        fett,
        eiweiß,
        balaststoffe,
        kcal,
        gesFett,
        ref,
    });
</script>

<Card {editMode}>
    <div>
        <label for="{id}-name">Name</label>
        <input id="{id}-name" type="text" bind:value={name} disabled={!editMode}>
    </div>
    <div>
        <label for="{id}-kcal">kcal</label>
        <input id="{id}-kcal" type="number" bind:value={kcal} disabled={!editMode}>
    </div>
    <div>
        <label for="{id}-fett">Fett</label>
        <input id="{id}-fett" type="number" bind:value={fett} disabled={!editMode}>
    </div>
    <div>
        <label for="{id}-gesFett">gesättigte Fettsäuren</label>
        <input id="{id}-gesFett" type="number" bind:value={gesFett} disabled={!editMode}>
    </div>
    <div>
        <label for="{id}-carb">Kohlenhydrate</label>
        <input id="{id}-carb" type="number" bind:value={kohlenhydrate} disabled={!editMode}>
    </div>
    <div>
        <label for="{id}-sugar">Zucker</label>
        <input id="{id}-sugar" type="number" bind:value={zucker} disabled={!editMode}>
    </div>
    <div>
        <label for="{id}-protein">Eiweiß</label>
        <input id="{id}-protein" type="number" bind:value={eiweiß} disabled={!editMode}>
    </div>
    <div>
        <label for="{id}-fiber">Balaststoffe</label>
        <input id="{id}-fiber" type="number" bind:value={balaststoffe} disabled={!editMode}>
    </div>

    <slot {getIngrediant} {clear}>
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
