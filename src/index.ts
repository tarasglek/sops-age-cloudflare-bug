import { decryptSops } from "sops-age";
import packageJson from "../secrets.enc.json";
// Access the entire JSON as a variable

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


export default {
	async fetch(request, env, ctx): Promise<Response> {
		const SOPS_AGE_KEY = env.SOPS_AGE_KEY
		return new Response(JSON.stringify(
			{
				SOPS_AGE_KEY,
				decrypted: decryptSops(packageJson, {secretKey: SOPS_AGE_KEY}),
			},
		));
	},
} satisfies ExportedHandler<Env>;
