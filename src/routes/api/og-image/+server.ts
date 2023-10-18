import { ImageResponse as DevImageResponse } from '@ethercorps/sveltekit-og';
import type { RequestHandler } from '@sveltejs/kit';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const title = decodeURIComponent(params.get('title') || 'ToDesktop');
	const description = decodeURIComponent(
		params.get('description') || 'Web app to desktop app in minutes'
	);
	const templateName = params.get('template') || 'a1';

	const host = import.meta.env.DEV ? 'http://localhost:5173' : 'https://todesktop.com';

	const templatePath = path.resolve(__dirname, 'templates', `${templateName}.html`);
	const template = fs.readFileSync(templatePath, 'utf8');

	const html = template
		.replace(/\${host}/g, host)
		.replace(/\${title}/g, title)
		.replace(/\${description}/g, description);

	const fontPath = `fonts/TTHovesPro-DmBd.woff`;
	const fontFile = await fetch(`${host}/${fontPath}`);
	const fontData: ArrayBuffer = await fontFile.arrayBuffer();

	if (import.meta.env.DEV) {
		return DevImageResponse(html, {
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'TT Hoves Pro',
					data: fontData,
					weight: 600
				}
			]
		});
	}

	const { ImageResponse: ProdImageResponse } = await import('workers-og');

	return new ProdImageResponse(html, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'TT Hoves Pro',
				data: fontData,
				weight: 600
			}
		]
	});
};
