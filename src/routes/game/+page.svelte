<script lang="ts">
	import Encode from '$lib/encode';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let game = $page.url.searchParams.get('game');

	let guesses: String[] = $state([]);
	let currentGuess: String[] = $state([]);

	let remainingOptions: String[] = $state([]);

	// your logic
	let encodedGame = '';

	function getGameAsText(): String {
        let decoded = decodeURIComponent((game || '').toString());
		return atob(decoded).toString();
	}

	function getGameObject() {
		return JSON.parse(getGameAsText().toString());
	}

	function shuffleRemaining() {
		remainingOptions = remainingOptions
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
	}

	function startGame() {
		let game = getGameObject();
		console.log(JSON.stringify(game, null, 4));
		remainingOptions = [
			...game.category1.items,
			...game.category2.items,
			...game.category3.items,
			...game.category4.items
		];
	}

	function itemSelected(item: String) {
		console.log('clicked', item);
		if (currentGuess.includes(item)) {
			currentGuess = currentGuess.filter((value) => value !== item);
		} else if (currentGuess.length < 4) {
			currentGuess = [...currentGuess, item];
		}
	}

    function isItemSelected(item: String) : Boolean{
        return currentGuess.includes(item);
    }

	//onmount

	onMount(() => {
        console.log(game);
		startGame();
	});
</script>

<div class="root">
	<div class="container">
		<h1>hello world</h1>

        <pre></pre>
		<pre>{JSON.stringify(getGameObject(), null, 4)}</pre>

		<div class="game-board">
			{#each remainingOptions as item}
				<!-- <input type="checkbox" on:select={itemSelected(item)}>{item}</input> -->
				<button class="game-item {isItemSelected(item) ? "selected" : ""} " onclick={() => itemSelected(item)}>{item}</button>
			{/each}
		</div>

		{#each currentGuess as item}
			<p>{item}</p>
		{/each}

		{#if currentGuess.length === 4}
			<button>Submit</button>
		{/if}
	</div>
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;
		width: 800;
	}

	.game-board {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 10px;
	}

	.game-item {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f0f0f0;
		border-radius: 5px;
		padding: 10px;
		size: 100px 100px;
	}

    .selected {

        background-color: #000000;
        color: #f0f0f0;
    }
</style>
