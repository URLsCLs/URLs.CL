<script>
	import { onMount } from "svelte/internal";

	export let theme;


	var themes = [
		{name:'light', value: '#d8dee9' },
		{name:'dark', value: '#2e3440' },
		{name:'black', value: '#000000' }
	]

	const themeSwitch = (value) =>{
		theme = value
		document.cookie=`theme=${value || 'dark'}`
	}
	onMount(()=>{
		document.cookie=`theme=${theme || 'dark'}`
	})
</script>

<svelte:head>
	<meta name="color-scheme" content="light dark" />
	<link rel="stylesheet" href={`/theme/${theme ? theme : 'dark'}.css`} />
</svelte:head>


<theme-switcher>
	{#each themes as t}
		<theme class:active={theme==t.name} on:click={()=>themeSwitch(t.name)} style="background-color:{t.value}"/>
	{/each}
</theme-switcher>

<style>
	theme-switcher{
		position: absolute;
		right: 10px;
		bottom: 15px;
		display: grid;
		gap: 15px;
		grid-template: 'a b c';
		z-index: 999;
	}
	theme{
		display: block;
		height: 15px;
		width: 15px;
		border-radius: 100%;
		transition: 0.3s ease-in-out;
		border: 2px solid rgba(255, 0, 0, 0);
		cursor: pointer;
	}
	.active{
		border: 2px solid rgb(131, 123, 123);
	}
	.active, theme:hover{
		transform: scale(1.4);
	}


</style>