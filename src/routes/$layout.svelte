<script>
    import Nav from '$lib/component/Nav.svelte';
</script>

<Nav />

<main>
    <slot></slot>
</main>

<style>
    :global(html, body) {
        margin: 0;
        padding: 0;
    }

    main {
        max-width: 640px;
        margin: 0 auto;
        padding: 0.5rem;
    }
</style>