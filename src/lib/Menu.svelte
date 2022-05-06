<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';

	var menuState = false;
</script>

{#if !menuState}
	<open-button on:click={() => (menuState = !menuState)}>
		<bar />
		<bar />
		<bar />
	</open-button>
{:else}
	<menu-bar transition:fly={{ x: -400, duration: 700 }}>
		<button class="close" on:click={() => (menuState = !menuState)}> close </button>
		<links>
			<a class:active={$page.url.pathname == '/'} href="/"> Home </a>
			<a class:active={$page.url.pathname == '/account'} href="/account"> Account </a>
			<a class:active={$page.url.pathname == '/services'} href="/services"> Services </a>
			<a class:active={$page.url.pathname == '/api'} href="/api"> API </a>
			<a class:active={$page.url.pathname == '/about'} href="/about"> About </a>
			<a rel="external" href="/git"> Contact </a>
		</links>
		<we-love-open-source>
			github: <a rel="external" href="/git">urls.cl/git</a>
		</we-love-open-source>
	</menu-bar>

	<container on:click={() => (menuState = false)} />
{/if}

<style>
	menu-bar {
		display: flex;
		flex-direction: column;
		width: 20%;
		height: 100%;
		position: absolute;
		box-sizing: border-box;
		overflow: hidden;
		background: var(--accent);
		z-index: 1000;
	}
	links {
		width: 100%;
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 50%;
		margin: 10px;
		transform: translate(0, -50%);
	}
	links a {
		font-size: x-large;
		font-weight: bolder;
		padding: 10px 0;
		text-decoration: unset;
		transition: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		width: 100%;
		display: block;
		position: relative;
		z-index: 25;
		transition: 0.5s ease-in-out;
	}

	links a:hover:after,
	a.active:after {
		top: 0;
		left: -10px;
		z-index: -1;
	}

	links a:after {
		display: block;
		height: 50px;
		width: calc(100% + 10px);
		top: 0;
		left: -900px;
		background: var(--background);
		content: '';
		position: absolute;

		z-index: -1;
		transition: 0.5s ease-in-out;
	}
	container {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	we-love-open-source {
		position: absolute;
		bottom: 10px;
		left: 5px;
	}
	.close {
		background: var(--red);
		text-transform: uppercase;
		font-weight: bolder;
		letter-spacing: 2px;
		font-size: larger;
		cursor: pointer;
		transition: 0.5s ease-in-out;
	}
	.close:hover {
		box-shadow: 0px 5px 5px var(--background);
		text-shadow: 0px 1px 5px var(--background);
	}
	open-button {
		display: flex;
		flex-direction: column;
		justify-content: center;
		cursor: pointer;
		position: absolute;
		top: 10px;
		left: 10px;
		height: 50px;
		width: 50px;
	}
	bar {
		background: var(--accent);
		display: block;
		width: 50px;
		height: 5px;
		transition: all 0.5s ease-in-out;
	}
	open-button:hover:after {
		left: 0;
	}
	open-button:after {
		position: absolute;
		left: 100vw;
		width: 50px;
		bottom: 0;
		height: 7px;
		background: var(--yellow);
		display: block;
		margin: 2px 0;
		content: '';
		border-radius: 0 0 5px 5px;
		transition: all 0.2s ease-in-out;
	}
	open-button:hover:before {
		top: -5px;
	}
	open-button:before {
		position: absolute;
		top: -100px;
		background: var(--yellow);
		display: block;
		width: 50px;
		height: 15px;
		margin: 2px 0;
		content: '';
		border-radius: 15px 15px 0 0;
		transition: all 0.2s ease-in-out;
	}
	open-button:hover > bar {
		margin: 2px 0;
	}
	bar:nth-of-type(2) {
		margin: 10px 0;
	}
	open-button:hover > bar:nth-of-type(1) {
		background: var(--red);
	}
	open-button:hover > bar:nth-of-type(2) {
		background: var(--green);
	}
	open-button:hover > bar:nth-of-type(3) {
		background: var(--purple);
	}

	@media screen and (max-width: 768px) {
		menu-bar {
			width: 40%;
		}
	}
	@media screen and (max-width: 425px) {
		menu-bar {
			width: 80%;
		}
	}
</style>
