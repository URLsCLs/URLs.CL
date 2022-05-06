<script>
	import { fade } from 'svelte/transition';
</script>

<historical>
	<slot />
</historical>

<style>
	historical {
		display: block;

		position: absolute;
		top: 0;
		right: 0;

		width: 30%;
		height: 150px;
		max-height: 150px;

		margin: 0 10px;
		padding: 0 10px;
	}
	historical::-webkit-scrollbar {
		width: 3px;
	}
	historical:hover::-webkit-scrollbar-thumb {
		background: var(--accent);
		border-radius: 10px;
	}

	@media screen and (max-width: 425px) {
		historical {
			width: 60%;
		}
	}
</style>
