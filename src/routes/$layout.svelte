<script lang="ts">
    import Nav from '$lib/component/Nav.svelte';
</script>

<main>
    <slot></slot>
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
</style>