<script>
	import {ingrediants} from '$lib/service/ingrediants';
</script>

<svelte:head>
    <title>Zutaten</title>
</svelte:head>

<h1>Zutaten</h1>

<pre>{JSON.stringify($ingrediants, null, 2)}</pre>
