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
	let greenBox = '🟩';
	let blueBox = '🟦';
	let yellowBox = '🟨';
	let purpleBox = '🟪';
	let green = '#A7C268';
	let yellow = '#F5E07E';
	let blue = '#B4C3EB';
	let purple = '#B283C1';

	let maximumGuesses = 10;

	let game = $page.url.searchParams.get('game');
	let gameObject = getGameObject();

	let title = gameObject.title || 'Untitled';

	let guesses: String[][] = $state([]);
	let incorrectGuesses: String[][] = $state([]);
	let currentGuess: String[] = $state([]);

	let remainingOptions: String[] = $state([]);

	let correctlyGuessedCategories: String[] = $state([]);

	// let temporaryMessage: String[] = $state([]);
	let showDuplicateGuessMessage = $state(false);
	let showOneAwayMessage = $state(false);

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
		showDuplicateGuessMessage = false;
		showOneAwayMessage = false;
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
		showDuplicateGuessMessage = false;
		showOneAwayMessage = false;
		if (hasAlreadyGuessedCurrentGuesses()) {
			showDuplicateGuessMessage = true;
			if (isOneAwayFromAny()) {
				showOneAwayMessage = true;
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
				showOneAwayMessage = true;
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

	function currentGuessEqualsLastGuess() {
		return areSetsEqual(new Set(guesses[guesses.length - 1]), new Set(currentGuess));
	}

	function getCurrentShareText(): String {
		return (
			prefix +
			'\n' +
			title +
			'\n' +
			guesses
				.map((guessArray) => guessArray.map((guess) => getColorSquareForItem(guess)).join(''))
				.join('\n')
		);
	}

	function getCurrentShareTextWithAnswers(): String {
		return (
			prefix +
			'\n' +
			title +
			'\n' +
			guesses
				.map(
					(guessArray) =>
						guessArray.map((guess) => getColorSquareForItem(guess)).join('') +
						' ||' +
						guessArray.join(', ') +
						'||'
				)
				.join('\n')
		);
	}

	function shareToClipboard() {
		let shareText = getCurrentShareText();
		navigator.clipboard.writeText(shareText.toString());
	}

    function shareWithAnswers() {
        let shareText = getCurrentShareTextWithAnswers();
		navigator.clipboard.writeText(shareText.toString());
	}

	function getColorSquareForItem(item: String): String {
		let category = getCategoryByItem(item);
		return getColorSquareForCategory(category);
	}

	function getColorSquareForCategory(category: String): String {
		if (category === gameObject.category1.name) {
			return yellowBox;
		} else if (category === gameObject.category2.name) {
			return greenBox;
		} else if (category === gameObject.category3.name) {
			return blueBox;
		} else if (category === gameObject.category4.name) {
			return purpleBox;
		}
		return '';
	}

	function getColorForCategory(category: String): String {
		if (category === gameObject.category1.name) {
			return yellow;
		} else if (category === gameObject.category2.name) {
			return green;
		} else if (category === gameObject.category3.name) {
			return blue;
		} else if (category === gameObject.category4.name) {
			return purple;
		}
		return '#f0f0f0';
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
		<h2>More Connections!</h2>
		<h1>{title}</h1>
		<br />
		<div class="correct-guesses">
			{#each correctlyGuessedCategories as item}
				<div class="correct-guess" style="background-color: {getColorForCategory(item)}">
					<h3 class="correct-guess-category">{item}</h3>
					<p class="correct-guess-answers">{getItemsForCategoryName(item).join(', ')}</p>
				</div>
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
		{#if showDuplicateGuessMessage}
			<p>You've already guessed this combination!</p>
		{/if}
		{#if showOneAwayMessage}
			<p>You are one away...</p>
		{/if}

		{#if hasWon()}
			<h1>You won!</h1>
		{:else if hasLost()}
			<h1>You lost!</h1>
		{:else}
			<br />
			<button class="button" disabled={!(currentGuess.length === 4)} onclick={submit}>
				Submit
			</button>
			<br />
			<button class="button" onclick={shuffleRemaining}>Shuffle</button>
			<br />
			<div class="remaining-guess-count-container">
				<p>Remaining guesses:</p>
				{#each { length: getRemainingGuesses() } as _, i}
					<div class="guess-dot"></div>
				{/each}
			</div>
		{/if}

		<!-- <pre>
            {getCurrentShareTextWithAnswers()}
        </pre>

        <pre>
            {JSON.stringify(gameObject, null, 4)}}
        </pre> -->

		{#if hasWon() || hasLost()}
			<button class="button" onclick={shareToClipboard}>Share</button>
            <br/>
			<button class="button" onclick={shareWithAnswers}>Share with answers</button>
		{/if}
	</div>
</div>

<style>
	h1 {
		text-align: center;
	}

	h2 {
		text-align: center;
	}

	.correct-guess-category {
		text-align: center;
		text-transform: uppercase;
	}

	.correct-guess-answers {
		text-align: center;
		text-transform: uppercase;
	}

	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.container {
		display: grid;
		grid: 1fr;
		width: 600px;
		margin: 10px;
	}

	@media (max-width: 600px) {
		.container {
			width: 100%;
		}
		.game-item {
			font-size: small;
			aspect-ratio: 1;
		}
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
		min-height: 60px;
		text-transform: uppercase;
		font-weight: bold;
		border-width: 0px;
	}
	.correct-guesses {
		display: grid;
		grid-template-columns: 1;
		grid-gap: 10px;
		margin-bottom: 10px;
	}

	.correct-guess {
		background-color: #f0f0f0;
		padding-bottom: 10px;
		padding: 10px;
		border-radius: 5px;
	}

	/* for small devices */

	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #555555;
		color: white;
		border-radius: 200px;
		padding: 10px;
		min-height: 40px;
		text-transform: uppercase;
		font-weight: bold;
		border-width: 0;
	}

	.button:hover {
		background-color: #333333;
	}

	.selected {
		background-color: #555555;
		color: #f0f0f0;
	}
	* {
		font-family: Sans-Serif;
	}

	.remaining-guess-count-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.guess-dot {
		width: 10px;
		height: 10px;
		background-color: #555555;
		border-radius: 50%;
		margin: 5px;
	}
</style>
