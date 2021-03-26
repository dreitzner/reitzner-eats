<script lang="ts">
	import {login, logout, user} from '$lib/service/auth';
	import {ingrediants} from '$lib/service/ingrediants';
	import { onDestroy } from 'svelte';

	$: auth = $user ? logout : login;
	let _ingrediants;
	const unsub = ingrediants.subscribe(i => {
		console.log(typeof i.subscribe);
		i.subscribe(j => {
			console.log(j);
		});
		_ingrediants = i;
	});

	onDestroy(() => {
		unsub();
	});
</script>

<main>
	<button on:click={auth}>{$user ? 'Logout' : 'Login'}</button>

	<pre>{JSON.stringify(_ingrediants, null, 2)}</pre>
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	main {
		padding: 1em;
		margin: 0 auto;
	}
</style>
