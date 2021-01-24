<script>
	import { onMount } from 'svelte';

	import Navbar from './components/nav.svelte';
	const baseUrl = "http://localhost:3000/api/posts";
	let posts = [];

	onMount(async ()=> {
		let res = await fetch('http://localhost:3000/api/posts');
		posts = await res.json();
	})

	import Login from './views/auth/login.svelte';

</script>
  

<div class="container-fluid p-0">
	<Navbar />
	<Login></Login>

	<section class="mt-5">
		<div class="container">
		  <div class="row">
			{#if posts.length === 0}
				<h4>Loading...</h4>
			{:else}
			  {#each posts as post}
				<div class="col-md-4">
				  <div class="card">
					<div class="card-header"></div>
					<div class="card-body">
					  <h5 class="card-title">{post.title}</h5>
					  <p class="card-text">{post.text}</p>
					  <button class="btn btn-info">Edit</button>
					  <button class="btn btn-danger">Delete</button>
					</div>
				  </div>
				</div>
			  {/each}
			{/if}
		  </div>
		</div>
	  </section>
</div>