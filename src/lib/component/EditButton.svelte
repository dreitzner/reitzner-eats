<script lang="ts">
    export let clickHandler;
    export let disabled: boolean = false;
    export let editMode: boolean = false;
</script>

<button on:click={clickHandler} disabled={disabled}>
    {#if editMode}
    <span class="material-icons-outlined">
        done
    </span>
    {:else}
    <span class="material-icons-outlined">
        edit
    </span>
    {/if}
</button>

<style>
    button {
        position: relative;
        align-self: flex-end;
        background: var(--buttonColor);
        border: none;
        outline: none;
        color: #fff;
        border-radius: 50%;
        text-align: center;
        height: 2.2rem;
        width: 2.2rem;
        margin-top: 1rem;
    }

    button::before {
        content: '';
        position: absolute;
        top: -.3rem;
        left: -.3rem;
        border: .2rem solid var(--buttonColor);
        border-radius: 50%;
        height: 2.4rem;
        width: 2.4rem;
        transform: scale(0);
        transition: transform .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    button:active::before,
    button:focus::before {
        transform: scale(1);
    }

    button:disabled {
        --buttonColor: #ccc;
    }
</style>