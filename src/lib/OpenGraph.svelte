<script lang="ts">
	import { page } from '$app/stores';

	type Templates = 'a1' | 'b6';

	export let title: string = `ToDesktop - Web app to desktop app in minutes`;
	export let description: string = `Turn your website into a desktop app in minutes. Give your users a better experience by allowing them to launch your web app from their dock and have it run in its own isolated window.`;
	export let template: Templates = 'a1';

	const endpoint = `api/og-image?title=${encodeURIComponent(
		title
	)}&description=${encodeURIComponent(description)}&template=${template}`;

	let image: string = import.meta.env.DEV
		? `http://localhost:5173/${endpoint}`
		: `https://learning-cloudflare-pages.pages.dev/${endpoint}`;

	let url: string = String($page.url);
</script>

<svelte:head>
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={url} />
</svelte:head>
