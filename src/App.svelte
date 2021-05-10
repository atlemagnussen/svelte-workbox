<script lang="ts">
import type { Todo } from "./interfaces";

	import { dosomething } from "./test"
	export let name: string
	const whut = dosomething()
	const url = "https://jsonplaceholder.typicode.com/todos/"
	let todos: Todo[] = []

	const refresh = async() => {
		const res = await fetch(url)
		if (res && res.ok) {
			todos = await res.json()
		}
	}
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<p>{whut}</p>
	<button on:click={refresh}>refresh</button>
	<ul>
		{#each todos as todo}
			<li>{todo.title}</li>
		{/each}
	</ul>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>