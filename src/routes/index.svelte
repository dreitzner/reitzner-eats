<script lang="ts">
	import {recipes} from '$lib/service/recipes';
	import Recipe from '$lib/component/Recipe.svelte'


	
</script>

<svelte:head>
	<title>Rezepte</title>
</svelte:head>

<h1>Rezepte</h1>

{#if $recipes}
    {#each $recipes as recipe}
        <Recipe {recipe} />
    {/each}
{/if}

<!-- <Recipe
    ingrediant={emptyIngrediant}
    editMode={true}
    let:getIngrediant
    let:clear>
    <AddIngrediant
        {getIngrediant}
        {clear} />
</Recipe> -->
