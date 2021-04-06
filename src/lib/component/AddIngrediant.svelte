<script lang="ts">
    import Add from '$lib/component/Add.svelte';
    import { ingrediantAdd } from '$lib/service/ingrediants';

    export let getIngrediant: Function;
    export let clear: Function;

    const add = async() => {
        const success = await ingrediantAdd(getIngrediant());
        if(!success) return;
        clear();
    };
</script>

<Add {add} />
