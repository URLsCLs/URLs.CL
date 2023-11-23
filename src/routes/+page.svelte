<script>
	import { getToastStore, LightSwitch } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	const toastStore = getToastStore();

	export let data;
	let msgs = data.msgs || [];

	if (msgs.length > 0) {
		for (let msg of msgs) {
			toastStore.trigger({
				background: `variant-filled-${msg.type}`,
				message: msg.msg
			});
		}		
	}

	let urls = [
		
	];

	let btnTxt = 'SHORTEN';

	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text);
		toastStore.trigger({
			background: 'variant-filled-success',
			message: `Copied ${text.substring(0, 24)} to clipboard`
		});
	};

	const addToUriList = (uri) => {
		urls = [...urls, uri];
		window.localStorage.setItem('urls', JSON.stringify(urls));
	};

	onMount(() => {
		// remove the get parameter from the url if it exists
		if (window.location.search) {
			window.history.replaceState({}, document.title, '/');
		}
		const localUrls = window.localStorage.getItem('urls');
		if (localUrls) {
			urls = JSON.parse(localUrls);
		}

	});

</script>

<svelte:head>
	<title>URLs.CL</title>
</svelte:head>

<div class="grid content-center h-full">
	<div class="grid gap-10 w-1/2 mx-auto h-fit">
		<h1 class="font-bold text-5xl w-full text-center">URLs.CL</h1>
		<form
			class="flex flex-col gap-5"
			method="POST"
			action="?/shorten"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				return async ({ result }) => {
					if (result.type === 'failure') {
						toastStore.trigger({
							background: 'variant-filled-error',
							message: 'Something went wrong, please try again later.'
						});
						return;
					}
					let uri = result.data
					addToUriList(uri);
					copyToClipboard(`https://urls.cl/${uri.slug}`);
				};
			}}
		>
			<input
				class="input transition ease-in-out duration-1000 font-bold focus:drop-shadow-[0_5px_5px_rgba(139,233,253,0.25)] hover:drop-shadow-[0_5px_5px_rgba(189,147,249,0.25)]"
				required
				type="text"
				name="url"
				value="https://google.com"
				title="Url Shortner"
				placeholder="https://urls.cl"
			/>
			<button
				on:mouseenter={() => {
					btnTxt = 'shrtn';
				}}
				on:mouseleave={() => {
					btnTxt = 'shorten';
				}}
				on:hover
				class="btn transition ease-in-out duration-500 variant-filled-primary self-end uppercase w-32 hover:variant-filled-secondary"
				>{btnTxt}</button
			>
		</form>
		<div class="w-full overflow-auto min-h-[250px] mt-10">
			<nav class="list-nav mx-auto h-[150px] overflow-y-scroll overflow-x-hidden">
				{#each urls as url}
					<ul>
						<li class="flex">
							<a
								on:contextmenu|preventDefault={() => {
									copyToClipboard(url.url);
								}}
								class="w-full"
								target="_blank"
								href="/{url.slug}"
							>
								<span class="badge bg-primary-500" />
								<span class="flex-auto">{url.url}</span>
							</a>
						</li>
					</ul>
				{/each}
			</nav>
		</div>
	</div>
</div>
<div class="absolute bottom-5 right-5">
	<LightSwitch width="w-16" height="h-8" ring="ring ring-primary-500" />
</div>