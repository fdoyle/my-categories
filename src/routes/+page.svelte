<script lang="ts">
	import Encode from '$lib/encode';

	let category1 = 'Things cats do';
	let category1_item1 = 'knead';
	let category1_item2 = 'purr';
	let category1_item3 = 'scratch';
	let category1_item4 = 'shed';

	let category2 = 'pages on a website';
	let category2_item1 = 'about';
	let category2_item2 = 'contact';
	let category2_item3 = 'home';
	let category2_item4 = 'login';

	let category3 = 'turn tail';
	let category3_item1 = 'flee';
	let category3_item2 = 'leave';
	let category3_item3 = 'retreat';
	let category3_item4 = 'withdraw';

	let category4 = '___ cheese';
	let category4_item1 = 'cottage';
	let category4_item2 = 'cream';
	let category4_item3 = 'goat';
	let category4_item4 = 'string';

	function submit() {
		console.log('submit');
	}

	function clear() {
		category1 = '';
		category2 = '';
		category3 = '';
		category4 = '';
		category1_item1 = '';
		category1_item2 = '';
		category1_item3 = '';
		category1_item4 = '';
		category2_item1 = '';
		category2_item2 = '';
		category2_item3 = '';
		category2_item4 = '';
		category3_item1 = '';
		category3_item2 = '';
		category3_item3 = '';
		category3_item4 = '';
		category4_item1 = '';
		category4_item2 = '';
		category4_item3 = '';
		category4_item4 = '';
	}

	function buildGame() {
		return {
			category1: {
				name: category1,
				items: [category1_item1, category1_item2, category1_item3, category1_item4]
			},
			category2: {
				name: category2,
				items: [category2_item1, category2_item2, category2_item3, category2_item4]
			},
			category3: {
				name: category3,
				items: [category3_item1, category3_item2, category3_item3, category3_item4]
			},
			category4: {
				name: category4,
				items: [category4_item1, category4_item2, category4_item3, category4_item4]
			}
		};
	}

	function isValid() {
		return (
			category1 &&
			category2 &&
			category3 &&
			category4 &&
			category1_item1 &&
			category1_item2 &&
			category1_item3 &&
			category1_item4 &&
			category2_item1 &&
			category2_item2 &&
			category2_item3 &&
			category2_item4 &&
			category3_item1 &&
			category3_item2 &&
			category3_item3 &&
			category3_item4 &&
			category4_item1 &&
			category4_item2 &&
			category4_item3 &&
			category4_item4
		);
	}

	function getGameAsUrlParam(): String {
		let json = JSON.stringify(buildGame());
		return btoa(json);
	}

	function navigateToGame() {
		if (isValid()) {
			let game = getGameAsUrlParam().toString();
			let newPath = `/my-categories/game/?game=${game}`;
			window.location.href = newPath;
		}
	}
</script>

<div class="root">
	<div class="container">
		<h1>Build your connections game here</h1>
        <h3>yellow</h3>
		<input class="category" bind:value={category1} placeholder="Category 1" />
		<input class="item" bind:value={category1_item1} placeholder="Item 1" />
		<input class="item" bind:value={category1_item2} placeholder="Item 1" />
		<input class="item" bind:value={category1_item3} placeholder="Item 2" />
		<input class="item" bind:value={category1_item4} placeholder="Item 3" />

		<br />

        <h3>green</h3>
		<input class="category" bind:value={category2} placeholder="Category 1" />
		<input class="item" bind:value={category2_item1} placeholder="Item 1" />
		<input class="item" bind:value={category2_item2} placeholder="Item 1" />
		<input class="item" bind:value={category2_item3} placeholder="Item 2" />
		<input class="item" bind:value={category2_item4} placeholder="Item 3" />

		<br />

        <h3>blue</h3>
		<input class="category" bind:value={category3} placeholder="Category 1" />
		<input class="item" bind:value={category3_item1} placeholder="Item 1" />
		<input class="item" bind:value={category3_item2} placeholder="Item 1" />
		<input class="item" bind:value={category3_item3} placeholder="Item 2" />
		<input class="item" bind:value={category3_item4} placeholder="Item 3" />

		<br />

        <h3>purple</h3>
		<input class="category" bind:value={category4} placeholder="Category 1" />
		<input class="item" bind:value={category4_item1} placeholder="Item 1" />
		<input class="item" bind:value={category4_item2} placeholder="Item 1" />
		<input class="item" bind:value={category4_item3} placeholder="Item 2" />
		<input class="item" bind:value={category4_item4} placeholder="Item 3" />

		<button disabled={!isValid()} onclick={navigateToGame}>Play</button>

		<button onclick={clear}>Clear</button>
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
		width: 200px;
	}

	.category {
		margin: 5px;
	}

	.item {
		margin: 5px 10px;
	}

    h3 {
        text-align: center;
        padding: 0px;
        margin: 0px;
    }
</style>
