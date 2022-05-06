<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	import { onMount } from 'svelte';
	import { alert } from '$lib/store';
	import { goto } from '$app/navigation';

	export let url;
	let bntText = 'UnShrt';
	let shortUrl = '';

	onMount(() => {
		if (url) {
			shortUrl = 'https://urls.cl/' + $page.url.searchParams.get('slug');
		}
	});

	const deconstruct = () => {
		let tester;
		try {
			tester = new URL(shortUrl);
		} catch (error) {
			alert.set({ message: 'I do not think that you know how this works', status: 3 });
			return;
		}

		if (!shortUrl) {
			alert.set({ message: 'I do not think that you know how this works', status: 3 });
			return;
		}
		if (
			!shortUrl.startsWith('https://urls.cl/') &&
			!shortUrl.startsWith('http://urls.cl/') &&
			!shortUrl.startsWith('urls.cl/')
		) {
			alert.set({
				message:
					'Support is Currently Not there -- feel free to make a pull request if I missed something',
				status: 2
			});
			return;
		}

		let slug = tester.pathname.split('/')[1];
		goto('/services/define?slug=' + slug);
	};
</script>

<preview-url in:fade out:fade>
	<url>
		{url ? url : 'Enter Shortened URL to Deconstruct It!'}
	</url>
	<input bind:value={shortUrl} type="url" />
	<button
		on:mouseenter={() => {
			bntText = 'Un-Shorten';
		}}
		on:mouseleave={() => {
			bntText = 'UnShrt';
		}}
		on:click={deconstruct}
	>
		{bntText}
	</button>
</preview-url>

<style>
	url {
		position: absolute;
		display: block;
		width: 75vw;
		text-align: center;
		top: 0;
		left: 50%;
		transform: translate(-50%);
		font-weight: bold;
		font-size: larger;
	}
	preview-url {
		position: absolute;
		display: block;
		width: 75vw;

		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		padding: 50px;
	}

	button {
		font-weight: bold;
		font-family: 'Courier New', Courier, monospace;
		width: 20%;
		height: 50px;
		text-transform: uppercase;
		float: right;
		cursor: pointer;
	}

	preview-url:hover input {
		border: unset;
		box-shadow: 0px 0px 34px -2px var(--glow);
	}

	preview-url:hover input:focus {
		box-shadow: 0px 5px 20px -5px var(--glow-accent);
		border: unset;
		border-bottom: 2px solid var(--glow);
	}

	input:focus {
		box-shadow: 0px 5px 20px -5px var(--glow-accent);
		border: unset;
		border-bottom: 2px solid var(--glow);
	}

	input {
		width: 100%;
		height: 40px;
		margin-bottom: 15px;
		transition: 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
	}

	input:focus {
		outline: unset;
	}
</style>
