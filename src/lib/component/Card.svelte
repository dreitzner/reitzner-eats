<script lang="ts">
    export let editMode: boolean;
</script>

<section class:editMode on:click>
    <slot name="form"></slot>
    <slot name="button"></slot>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        padding: 2em;
        border: 1px solid #ccc;
        box-shadow: 0 5px 10px #eee;
        margin-top: 1em;
        --buttonColor: #cc0e2e;
    }

    .editMode {
        --buttonColor: #34b30e;
    }

    section:not(.editMode) :global(input) {
        border-color: transparent;
        background: none;
    }
</style>
