/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import type { AdvancedRuntime } from "@astrojs/cloudflare";
import type { KVNamespace } from "@cloudflare/workers-types";

declare namespace App {
	interface Locals extends AdvancedRuntime {
		runtime: AdvancedRuntime & {
			env: {
				VIEWS: KVNamespace;
			};
		};
	}
}
