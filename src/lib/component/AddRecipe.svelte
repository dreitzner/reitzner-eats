<script lang="ts">
    import Add from '$lib/component/Add.svelte';
    import { recipeAdd } from '$lib/service/recipes';

    export let getRecipe: Function;
    export let clear: Function;

    const add = async() => {
        const success = await recipeAdd(getRecipe());
        if(!success) return;
        clear();
    };
</script>

<Add {add} />
