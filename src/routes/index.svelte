<script>
	import { history, alert } from '$lib/store';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';

	import { crossfade, fade } from 'svelte/transition';
	import { onMount, tick } from 'svelte';

	import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
	import CopyFile from "carbon-icons-svelte/lib/CopyFile.svelte";
	import Historical from '$lib/Historical.svelte';

	var bntText = 'Shorten';
	var url = 'https://google.com';

	const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					position: absolute;
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});


	var newShort = async () => {
		await tick()
		var id = $history.length + 1;
		var shrt = {
			id: id++,
			hist: 0,
			show: 1,
			url: '',
			shrt: '',
			slug: ''
		};

		if (url == '' || !/^.*\.[a-z]{2,5}/.test(url)) {
			alert.set({ message: 'I do not think that you know how this works', status: 3 });
			return;
		}

		if (!/^[a-z].*\/\//.test(url)) {
			url = `https://${url}`;
		}

		if (
			!/^((https|http|ftp):\/\/)?([a-zA-Z0-9\-\.]*)(\.([a-z]){2,5})((\/|\?)([a-zA-Z0-9\/\?\=\&\-\$\+\,\:\;\@\#]*))?$/.test(
				url
			)
		) {
			url = ''
			alert.set({ message: 'Support is Currently Not there -- feel free to make a pull request if I missed something', status: 2  });
			return;
		}

		if (url.includes('urls.cl')) {
			url = '';
			alert.set({ message: 'This does not make sense to me?', status: 3 });
			return;
		}


		let resp = await fetch('/shorten', {
			method: 'POST',
			body: JSON.stringify({url:url})
		})

		if (resp.status != 200) {
			let error = await resp.json()
			alert.set({ message: error.message, status: 3 });
		
		}else{
			let slug = await resp.json()
			shrt.shrt = `urls.cl/${slug.slug}`;
			shrt.slug = `${slug.slug}`;
			shrt.url = slug.url;
			$history = [shrt, ...$history];
		}
	};

	const copy = (shrt) => {
		let tmp = document.createElement('input');
		tmp.setAttribute('value', `https://${shrt.shrt}`);
		document.body.appendChild(tmp);
		tmp.select();
		document.execCommand('copy');
		document.body.removeChild(tmp);
		alert.set({ message: `${shrt.shrt} (${shrt.url}) copied`, status: 1 });
	};

	onMount(() => {
		if (window.localStorage.getItem('history')) {
			history.set(JSON.parse(window.localStorage.getItem('history')));
		}
	});
</script>

<Historical>
	{#each $history.filter((s) => s.hist && s.show) as shrt (shrt.id)}
		<p class="action-container" in:receive={{ key: shrt.id }} animate:flip>
			{shrt.shrt}
			<actions>
				<copy on:click={() => copy(shrt)}><CopyFile /></copy>
				<delete
					on:click={() => {
						alert.set({ msg: `${shrt.shrt} (${shrt.url}) removed`, active: 1, level: 1 });
						shrt.show = 0;
					}}><TrashCan /></delete
				>
			</actions>
		</p>
	{/each}
</Historical>


<shortainer out:fade in:fade>
	{#if $history.find((s) => !s.hist)}
		{#each $history.filter((s) => !s.hist) as shrt (shrt.id)}
			<shortened out:send={{ key: shrt.id }}>
				<a out:send={{ key: shrt.id }} href={shrt.shrt}>{shrt.shrt}</a>
				<button
					on:click={() => {
						copy(shrt);
						shrt.hist = 1;
					}}>copy</button
				>
			</shortened>
		{/each}
	{:else}
		<shortener>
			<input bind:value={url} type="url" />
			<button
				on:mouseenter={() => {
					bntText = 'Shrtn';
				}}
				on:mouseleave={() => {
					bntText = 'Shorten';
				}}
				on:click={newShort}
			>
				{bntText}
			</button>
		</shortener>
	{/if}
</shortainer>




<style>
	shortener {
		width: 100%;
	}
	
	shortened {
		display: block;
		width: 100%;
		text-align: center;
		font-size: x-large;
		font-weight: bolder;
	}

	shortainer {
		position: absolute;
		display: block;
		width: 75vw;

		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		padding: 50px;
	}

	shortainer:hover input {
		border: unset;
		box-shadow: 0px 0px 34px -2px var(--glow);
	}

	shortainer:hover input:focus {
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

	button {
		font-weight: bold;
		font-family: 'Courier New', Courier, monospace;
		width: 20%;
		height: 50px;
		text-transform: uppercase;
		float: right;
		cursor: pointer;
	}
	
	a {
		display: block;
		margin-bottom: 10px;
	}

	.action-container {
		overflow: hidden;
	}

	actions {
		float: right;
		font-weight: bolder;
		color: var(--red);
		cursor: pointer;
	}
	copy, delete{

		transition: 0.2s ease-in-out;
	}
	copy:hover {
		color: var(--glow-accent);
	}
	delete:hover {
		color: var(--glow-accent);
	}


	@media screen and (max-width: 425px) {
		shortainer{
			width: 90%;
			padding: 10px;
		}

		button {
			width: 100%;
			height: 35px;
		}
	}
</style>
