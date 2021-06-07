<script lang="ts">
    export let add: Function;
</script>
<button on:click|preventDefault={() => add()} >
    <span class="material-icons-outlined">
        add
    </span>
</button>

<style>
    button {
        --buttonColor: #cc0e2e;
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
</style>