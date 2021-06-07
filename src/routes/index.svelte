<script lang="ts">
	import {emptyRecipe, recipeAdd, recipes} from '$lib/service/recipes';
	import Recipe from '$lib/component/Recipe.svelte'
    import Card from '$lib/component/Card.svelte';
    import Add from '$lib/component/Add.svelte';
    let activeIndex;
    let name;
    const handleClick = (indexToSet: number) => {
        activeIndex = indexToSet === activeIndex
            ? null
            : indexToSet; 
    };
    const add = async() => {
        const success = await recipeAdd(Object.assign(emptyRecipe, {name}));
        if(!success) return;
        name = '';
    };
</script>

<svelte:head>
	<title>Rezepte</title>
</svelte:head>

<h1>Rezepte</h1>

{#if $recipes}
    {#each $recipes as recipe, i}
        <Recipe {recipe} showAll={activeIndex === i} on:click={() => handleClick(i)} />
    {/each}
{/if}

<Card editMode={true}>
    <svelte:fragment slot="form">
        <h2>Neues Rezept</h2>
        <div>
            <label for="new-name">Name</label>
            <input
                id="new-name"
                type="text"
                bind:value={name}
            />
        </div>
    </svelte:fragment>
    
    <svelte:fragment slot="button">
        <Add {add} />
    </svelte:fragment>
</Card>

<style>
    div {
        display: flex;
        justify-content: space-between;
        margin-bottom: .3rem;
    }
</style>
