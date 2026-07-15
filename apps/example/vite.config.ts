import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "scone-ui/styles.css": new URL(
                "../../packages/scone-ui/src/styles.css",
                import.meta.url,
            ).pathname,
            "scone-ui": new URL("../../packages/scone-ui/src/index.ts", import.meta.url).pathname,
        },
    },
});
