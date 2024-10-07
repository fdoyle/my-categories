<script lang="ts">
	import Encode from '$lib/encode';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let exampleShare = `Connections
Puzzle #483
🟩🟩🟩🟩
🟦🟦🟦🟦
🟨🟨🟨🟨
🟪🟪🟪🟪
`;

	let prefix = 'Custom Connections!';
	let green = '🟩';
	let blue = '🟦';
	let yellow = '🟨';
	let purple = '🟪';

	let maximumGuesses = 10;

	let game = $page.url.searchParams.get('game');
	let gameObject = getGameObject();

	let guesses: String[][] = $state([]);
	let incorrectGuesses: String[][] = $state([]);
	let currentGuess: String[] = $state([]);

	let remainingOptions: String[] = $state([]);

	let correctlyGuessedCategories: String[] = $state([]);

	let temporaryMessage: String[] = $state([]);

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

	function hasAlreadyGuessedCurrentGuesses(): Boolean {
		let currentGuessesSet = new Set(currentGuess);
		return guesses.some((guessArray) => areSetsEqual(new Set(guessArray), currentGuessesSet));
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
		shuffleRemaining();
	}

	function itemSelected(item: String) {
		temporaryMessage = [];
		if (currentGuess.includes(item)) {
			currentGuess = currentGuess.filter((value) => value !== item);
		} else if (currentGuess.length < 4) {
			currentGuess = [...currentGuess, item];
		}
	}

	function isOneAwayFromAny() {
		let currentGuessSet = new Set(currentGuess);
		let category1Set: Set<String> = new Set(getGameObject().category1.items);
		let category2Set: Set<String> = new Set(getGameObject().category2.items);
		let category3Set: Set<String> = new Set(getGameObject().category3.items);
		let category4Set: Set<String> = new Set(getGameObject().category4.items);
		return (
			currentGuessSet.difference(category1Set).size === 1 ||
			currentGuessSet.difference(category2Set).size === 1 ||
			currentGuessSet.difference(category3Set).size === 1 ||
			currentGuessSet.difference(category4Set).size === 1
		);
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
		temporaryMessage = [];
		if (hasAlreadyGuessedCurrentGuesses()) {
			temporaryMessage = ["You've already guessed this combination!"];
			if (isOneAwayFromAny()) {
				temporaryMessage = [...temporaryMessage, "You're one away from a correct guess!"];
			}
			return;
		}
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
			if (isOneAwayFromAny()) {
				temporaryMessage = [...temporaryMessage, "You're one away from a correct guess!"];
			}
		}
	}

	function getRemainingGuesses() {
		return maximumGuesses - incorrectGuesses.length;
	}

	function hasLost() {
		return getRemainingGuesses() <= 0;
	}

	function hasWon() {
		return correctlyGuessedCategories.length === 4;
	}

	function isGameOver() {
		return hasLost() || hasWon();
	}

	function getCurrentShareText(): String {
		return (
			prefix +
			'\n' +
			guesses
				.map((guessArray) => guessArray.map((guess) => getColorSquareForItem(guess)).join(''))
				.join('\n')
		);
	}

	function shareToClipboard() {
		let shareText = getCurrentShareText();
		navigator.clipboard.writeText(shareText.toString());
	}

	function getColorSquareForItem(item: String): String {
		let category = getCategoryByItem(item);
		return getColorSquareForCategory(category);
	}

	function getColorSquareForCategory(category: String): String {
		if (category === gameObject.category1.name) {
			return yellow;
		} else if (category === gameObject.category2.name) {
			return green;
		} else if (category === gameObject.category3.name) {
			return blue;
		} else if (category === gameObject.category4.name) {
			return purple;
		}
		return '';
	}

	function getCategoryByItem(item: String): String {
		let game = gameObject;
		if (game.category1.items.includes(item)) {
			return game.category1.name;
		} else if (game.category2.items.includes(item)) {
			return game.category2.name;
		} else if (game.category3.items.includes(item)) {
			return game.category3.name;
		} else if (game.category4.items.includes(item)) {
			return game.category4.name;
		}
		return '';
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
				<p>{getItemsForCategoryName(item).join(', ')}</p>
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
		{#each temporaryMessage as message}
			<p>{message}</p>
		{/each}

		{#if hasWon()}
			<h1>You won!</h1>
		{:else if hasLost()}
			<h1>You lost!</h1>
		{:else}
			<br />
			<button disabled={!(currentGuess.length === 4)} onclick={submit}>Submit</button>
			<br />
			<button onclick={shuffleRemaining}>Shuffle</button>
			<p>Remaining guesses: {getRemainingGuesses()}</p>
		{/if}

		{#if hasWon() || hasLost()}
			<button onclick={shareToClipboard}>Share</button>
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
