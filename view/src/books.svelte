<script>
    import { Books } from "crypto";

    import { onMount } from "svelte";

    let books;

    onMount(async () => {
        await fetch(`http://localhost:4000/`)
            .then((r) => r.json())
            .then((data) => {
                books = data;
            });
    });
</script>

{#if books}
    {#each books as continent}
        <ul>
            <li>
                <h1>{continent.name}</h1>
            </li>
        </ul>
    {/each}
{:else}
    <p class="loading">loading...</p>
{/if}
