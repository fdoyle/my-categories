<script lang="ts">
	import Encode from '$lib/encode';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let game = $page.url.searchParams.get('game');
    let gameObject = getGameObject();

	let guesses: String[][] = $state([]);
	let incorrectGuesses: String[][] = $state([]);
	let currentGuess: String[] = $state([]);

	let remainingOptions: String[] = $state([]);

    let correctlyGuessedCategories: String[] = $state([]);

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

	function areSetsEqual(setA: Set<String>, setB: Set<String>) {
		return setA.size === setB.size && [...setA].every((value) => setB.has(value));
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

    function getItemsForCategoryName(name: String): String[] {
        let game = gameObject;
        if (game.category1.name === name) {
            return game.category1.items;
        } else if (game.category2.name === name) {
            return game.category2.items;
        } else if (game.category3.name === name) {
            return game.category3.items;
        } else if (game.category4.name === name) {
            return game.category4.items;
        }
        return [];
    }

	function isItemSelected(item: String): Boolean {
		return currentGuess.includes(item);
	}

	function submit() {
		//add this to guesses
		guesses = [...guesses, currentGuess];
		//check if the guess is correct
		let guessSet = new Set(currentGuess);
		let category1Set: Set<String> = new Set(getGameObject().category1.items);
		let category2Set: Set<String> = new Set(getGameObject().category2.items);
		let category3Set: Set<String> = new Set(getGameObject().category3.items);
		let category4Set: Set<String> = new Set(getGameObject().category4.items);

		if (areSetsEqual(guessSet, category1Set)) {
            correctlyGuessedCategories = [...correctlyGuessedCategories, getGameObject().category1.name];
            remainingOptions = remainingOptions.filter((value) => !category1Set.has(value));
            currentGuess = [];
		} else if (areSetsEqual(guessSet, category2Set)) {
            correctlyGuessedCategories = [...correctlyGuessedCategories, getGameObject().category2.name];
            remainingOptions = remainingOptions.filter((value) => !category2Set.has(value));
            currentGuess = [];
		} else if (areSetsEqual(guessSet, category3Set)) {
            correctlyGuessedCategories = [...correctlyGuessedCategories, getGameObject().category3.name];
            remainingOptions = remainingOptions.filter((value) => !category3Set.has(value));
            currentGuess = [];
		} else if (areSetsEqual(guessSet, category4Set)) {
            correctlyGuessedCategories = [...correctlyGuessedCategories, getGameObject().category4.name];
            remainingOptions = remainingOptions.filter((value) => !category4Set.has(value));
            currentGuess = [];
		} else {
            incorrectGuesses = [...incorrectGuesses, currentGuess];
        }
	}

    function getRemainingGuesses() {
        return 4 - incorrectGuesses.length;
    }

    function hasWon() {
        return correctlyGuessedCategories.length === 4;
    }

	onMount(() => {
		console.log(game);
		startGame();
	});
</script>

<div class="root">
	<div class="container">
		<h1>More Connections!</h1>
        <div class="correct-guesses">
            {#each correctlyGuessedCategories as item}
                <h3>{item}</h3>
                <p>{getItemsForCategoryName(item).join()}</p>
            {/each}

        </div>

		<div class="game-board">
			{#each remainingOptions as item}
				<button
					class="game-item {isItemSelected(item) ? 'selected' : ''} "
					onclick={() => itemSelected(item)}>{item}</button
				>
			{/each}
		</div>

		{#each currentGuess as item}
			<p>{item}</p>
		{/each}

		{#if currentGuess.length === 4}
			<button onclick={submit}>Submit</button>
		{/if}

        <p>Remaining guesses: {getRemainingGuesses()}</p>
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
