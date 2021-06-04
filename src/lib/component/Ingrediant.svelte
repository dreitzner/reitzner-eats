<script lang="ts">
    import {
        ingrediantUpdate,
        emptyIngrediant,
    } from "$lib/service/ingrediants";
    import { afterUpdate } from "svelte";
    import Card from "$lib/component/Card.svelte";
    import EditButton from "./EditButton.svelte";

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
    });

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
    };

    const clickHandler = async () => {
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
    };

    const clear = () => {
        setIngrediant(emptyIngrediant);
    };

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
    <svelte:fragment slot="form">
        <div>
            <label for="{id}-name">Name</label>
            <input
                id="{id}-name"
                type="text"
                bind:value={name}
                disabled={!editMode}
            />
        </div>
        <div>
            <label for="{id}-kcal">kcal</label>
            <input
                id="{id}-kcal"
                type="number"
                bind:value={kcal}
                disabled={!editMode}
            />
        </div>
        <div>
            <label for="{id}-fett">Fett</label>
            <input
                id="{id}-fett"
                type="number"
                bind:value={fett}
                disabled={!editMode}
            />
        </div>
        <div>
            <label for="{id}-gesFett">gesättigte Fettsäuren</label>
            <input
                id="{id}-gesFett"
                type="number"
                bind:value={gesFett}
                disabled={!editMode}
            />
        </div>
        <div>
            <label for="{id}-carb">Kohlenhydrate</label>
            <input
                id="{id}-carb"
                type="number"
                bind:value={kohlenhydrate}
                disabled={!editMode}
            />
        </div>
        <div>
            <label for="{id}-sugar">Zucker</label>
            <input
                id="{id}-sugar"
                type="number"
                bind:value={zucker}
                disabled={!editMode}
            />
        </div>
        <div>
            <label for="{id}-protein">Eiweiß</label>
            <input
                id="{id}-protein"
                type="number"
                bind:value={eiweiß}
                disabled={!editMode}
            />
        </div>
        <div>
            <label for="{id}-fiber">Balaststoffe</label>
            <input
                id="{id}-fiber"
                type="number"
                bind:value={balaststoffe}
                disabled={!editMode}
            />
        </div>
    </svelte:fragment>

    <slot {getIngrediant} {clear} slot="button">
        <EditButton {clickHandler} disabled={writeInProgress} {editMode} />
    </slot>
</Card>

<style>
    div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.3rem;
    }
</style>
