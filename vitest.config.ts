import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const ignoredStderrPatterns = [
    /An update to Scone(?:Notification|Toast)Provider inside a test was not wrapped in act\(\.\.\.\)\./,
    /A component is changing an uncontrolled input to be controlled\./,
    /(?:Checkbox|Switch) is changing from uncontrolled to controlled\./,
];

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": new URL("./packages/scone-ui/src", import.meta.url).pathname,
            "scone-ui/styles.css": new URL("./packages/scone-ui/src/styles.css", import.meta.url)
                .pathname,
            "scone-ui": new URL("./packages/scone-ui/src/index.ts", import.meta.url).pathname,
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        reporters: ["default"],
        onConsoleLog: (log, type) => {
            if (type !== "stderr") {
                return;
            }

            if (ignoredStderrPatterns.some((pattern) => pattern.test(log))) {
                return false;
            }
        },
        setupFiles: [new URL("./packages/scone-ui/src/test/setup.ts", import.meta.url).pathname],
    },
});
