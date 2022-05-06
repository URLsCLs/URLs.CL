<script context="module">
	export async function load(event) {
		return { props: { theme: event.session.theme } };
	}
</script>

<script>
	import '$lib/global.css';
	import Theme from '$lib/Theme.svelte';
	import Menu from '$lib/Menu.svelte';
	import Alerts from '$lib/Alerts.svelte';
	export let theme;
</script>

<Theme {theme} />
<Menu />
<slot />
<Alerts />
