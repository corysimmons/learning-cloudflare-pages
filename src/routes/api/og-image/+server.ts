import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const title = decodeURIComponent(params.get('title') || 'ToDesktop');
	const description = decodeURIComponent(
		params.get('description') || 'Web app to desktop app in minutes'
	);
	const templateName = params.get('template') || 'a1';

  const isDev = import.meta.env.DEV;
	const host = isDev ? 'http://localhost:5173' : 'https://todesktop.com';

	const templateURL = `${host}/og-image-templates/${templateName}.html`;
  const templateResponse = await fetch(templateURL);
	const template = await templateResponse.text();

	const html = template
		.replace(/\${host}/g, host)
		.replace(/\${title}/g, title)
		.replace(/\${description}/g, description);

	const fontPath = `fonts/TTHovesPro-DmBd.woff`;
	const fontFile = await fetch(`${host}/${fontPath}`);
	const fontData: ArrayBuffer = await fontFile.arrayBuffer();

	if (isDev) {
    const { ImageResponse: DevImageResponse } = await import('@ethercorps/sveltekit-og');

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
