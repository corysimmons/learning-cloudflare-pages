import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/#sveltekit-cloudflare-configuration
		adapter: adapter()
	}
};

export default config;
