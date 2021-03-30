<script lang="ts">
	import {recipes} from '$lib/service/recipes';
</script>

<svelte:head>
	<title>Rezepte</title>
</svelte:head>

<h1>Rezepte</h1>

<pre>{JSON.stringify($recipes, null, 2)}</pre>
