<script lang="ts">
    import { page } from '$app/stores';
	import {login, logout, user} from '$lib/service/auth';

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
        {#each navItems as {route, name}}
            <li>
                <a
                    href={route}
                    aria-current={route === $page.path ? 'page' : undefined}>
                    {name}
                </a>
            </li>
        {/each}
    </ul>

    
	<button on:click={auth}>{$user ? 'Logout' : 'Login'}</button>
</nav>

<style>
    nav {
        border-top: 10px solid #0c3d87;
        background: linear-gradient(rgba(255, 62, 0, 0.1), #fff 80%);
        font-weight: 300;
        padding: 0 1em;
        display: flex;
        justify-content: space-between;
    }
    ul {
        margin: 0;
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
        height: 5px;
        background-color: #0c3d87;
        display: block;
        top: -1px;
        left: 0;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
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
    }
</style>
