<script>
	import { fade } from 'svelte/transition';
</script>

<center-center in:fade out:fade>
	<a href="/services/define">1.) Deconstruct a Shortned URL</a>
</center-center>

<style>
	center-center {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(0, -50%);
		font-weight: bolder;
		text-align: center;
		font-size: xx-large;
		width: 100%;
	}
</style>
