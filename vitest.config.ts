import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": new URL("./src", import.meta.url).pathname,
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        reporters: ["./scripts/vitest-quiet-reporter.mjs"],
        silent: "passed-only",
        setupFiles: ["src/test/setup.ts"],
    },
});
