import type { RequestHandler } from '@sveltejs/kit';
import { html } from 'satori-html';
import { ImageResponse } from '@vercel/og';

export const GET: RequestHandler = async ({ url }) => {
	const title = url.searchParams.get('title');

	const template = html(`
    <div style="display: flex; width: 100%; height: 100%;">
      <style>
      </style>
      <div class="w-full h-full bg-blue-500 text-white flex items-center justify-center">
        <h1>${title}</h1>
      </div>
    </div>
  `);

	return await new ImageResponse(template);
};
