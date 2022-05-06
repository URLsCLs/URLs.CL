import { writable } from 'svelte/store';

export const history = writable([]);

export const alert = writable({});

history.subscribe((value) => {
	if (value.length) {
		window.localStorage.setItem('history', JSON.stringify(value));
	}
});
