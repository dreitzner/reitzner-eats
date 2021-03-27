<script lang="ts">
	import {login, logout, user} from '$lib/service/auth';
	import {ingrediants} from '$lib/service/ingrediants';

	$: auth = $user ? logout : login;
</script>

<main>
	<button on:click={auth}>{$user ? 'Logout' : 'Login'}</button>

	<pre>{JSON.stringify($ingrediants, null, 2)}</pre>
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
