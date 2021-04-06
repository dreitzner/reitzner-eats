<script lang="ts">
	import {ingrediants, emptyIngrediant} from '$lib/service/ingrediants';
	import Ingrediant from '$lib/component/Ingrediant.svelte';
	import AddIngrediant from '$lib/component/AddIngrediant.svelte';
</script>

<svelte:head>
    <title>Zutaten</title>
</svelte:head>

<h1>Zutaten</h1>

{#if $ingrediants}
    {#each $ingrediants as ingrediant}
        <Ingrediant {ingrediant} />
    {/each}
{/if}

<Ingrediant
    ingrediant={emptyIngrediant}
    editMode={true}
    let:getIngrediant
    let:clear>
    <AddIngrediant
        {getIngrediant}
        {clear} />
</Ingrediant>

