<script>
    import { constants } from "crypto";

    import { onMount } from "svelte";

    let continents;

    onMount(async () => {
        await fetch(`http://localhost:4000/`)
            .then((r) => r.json())
            .then((data) => {
                continents = data;
            });
    });
</script>

{#if continents}
    {#each continents as continent}
        <ul>
            <li>
                <article>
                    <h1>{continent.name}</h1>
                    <small>
                        Population: <b>{continent.population}</b>
                    </small><br />
                    <small>
                        Number of countries: <b>{continent.no_of_countries}</b>
                    </small><br />
                    <small>
                        Continent's size: <b>{continent.area}</b>
                    </small>
                </article>
            </li>
        </ul>
    {/each}
{:else}
    <p class="loading">loading...</p>
{/if}
