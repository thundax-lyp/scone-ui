import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts",
            formats: ["es", "cjs"],
            fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
        },
        rollupOptions: {
            external: [
                "@fontsource-variable/geist",
                "class-variance-authority",
                "clsx",
                "cmdk",
                "lucide-react",
                "next-themes",
                "radix-ui",
                "react",
                "react-dom",
                "react/jsx-runtime",
                "sonner",
                "tailwind-merge",
            ],
        },
    },
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": new URL("./src", import.meta.url).pathname,
        },
    },
});
