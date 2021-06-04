<script lang="ts">
    import { page } from '$app/stores';
	import {login, logout, user} from '$lib/service/firebase';

	$: auth = $user ? logout : login;

    $: navItems = [
        {
            route: '/',
            name: 'Rezepte',
        },
        {
            route: '/ingrediants',
            name: 'Zutaten',
        },
    ];
</script>

<nav>
    <!-- icon here -->

    <ul>
        {#if $user}
            {#each navItems as {route, name}}
                <li>
                    <a
                        href={route}
                        aria-current={route === $page.path ? 'page' : undefined}>
                        {name}
                    </a>
                </li>
            {/each}
        {/if}
    </ul>

    
	<button on:click={auth}>
        {#if $user}
            <img src="{$user.photoURL}" alt="logout">
        {:else}
        <span class="material-icons-outlined">
            account_circle
        </span>
        {/if}
    </button>
</nav>

<style>
    nav {
        border-bottom: 10px solid #0c3d87;
        background: #fff;
        font-weight: 300;
        display: grid;
        grid-template-columns: 1fr 1fr;
        position: fixed;
        bottom: 0;
        width: 100vw;
        box-shadow: 0 0 10px #ccc;
    }
    ul {
        margin: 0 1em;
        padding: 0;
    }

    /* clearfix */
    ul::after {
        content: "";
        display: block;
        clear: both;
    }

    li {
        display: block;
        float: left;
    }

    [aria-current] {
        position: relative;
        display: inline-block;
    }

    [aria-current]::before {
        position: absolute;
        content: "";
        width: 100%;
        height: 10px;
        background-color: #0c3d87;
        display: block;
        bottom: -5px;
        left: 0;
        border-radius: 5px;
    }

    li a {
        text-decoration: none;
        padding: 0.5em 1em;
        display: block;
    }

    a :global(.wappen) {
        height: calc(40px - 0.2em);
        padding: 0.1em;
        margin-right: 0.9em;
    }

    button {
        border: 0;
        background: none;
        padding: 0 1em;
        justify-self: end;
    }

    img {
        height: 24px;
        border-radius: 50%;
    }
</style>
