<script>
	import { alert } from './store';
	import { fade } from 'svelte/transition';

	alert.subscribe((v) => {
		if (v.message) {
			setTimeout(() => {
				alert.set({});
			}, 2500);
		}
	});
</script>

{#if $alert.message}
	<alert-container
		class:good={$alert.status == 1}
		class:warning={$alert.status == 2}
		class:bad={$alert.status == 3}
		in:fade
		out:fade
	>
		<alrt>{$alert.message}</alrt>
	</alert-container>
{/if}

<style>
	alert-container {
		display: grid;
		align-content: center;

		position: absolute;
		bottom: 0;
		left: 0;

		width: 100%;
		height: 45px;

		background-color: var(--red);
	}
	alrt {
		display: block;
		padding: 0 12px;

		font-weight: bolder;
		width: 80%;

		overflow: hidden;
	}
	.good {
		background-color: var(--green);
	}
	.warning {
		background-color: var(--yellow);
	}
	.bad {
		background-color: var(--red);
	}
	@media screen and (max-width: 425px) {
		alert-container {
			z-index: 9999;
		}
		alrt {
			width: 100%;
		}
	}

	@media screen and (max-width: 320px) {
		alrt {
			text-align: center;
		}
	}
</style>
