<script lang="ts">
	import {user} from '$lib/service/firebase';
    import Nav from '$lib/component/Nav.svelte';
</script>

<main>
    {#if $user}
        <slot></slot>
    {:else}
        <h1>Nur für eingeloggte User sichtbar.</h1>
    {/if}
</main>

<Nav />

<style>
    :global(html, body) {
        margin: 0;
        padding: 0;
    }

    main {
        max-width: 640px;
        margin: 0 auto;
        margin-bottom: 3rem;
        padding: 0.5rem;
    }

    h1 {
        text-align: center;
    }
</style>