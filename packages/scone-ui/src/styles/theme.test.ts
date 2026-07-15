import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const srcDir = dirname(dirname(fileURLToPath(import.meta.url)));
const defaultThemePath = join(srcDir, "default.theme.css");
const compatibilityThemePath = join(srcDir, "styles", "theme.css");
const tailwindConfigPath = join(srcDir, "..", "..", "..", "tailwind.config.ts");

const requiredVariables = [
    "--scone-color-background",
    "--scone-color-foreground",
    "--scone-color-muted",
    "--scone-color-muted-foreground",
    "--scone-color-border",
    "--scone-color-ring",
    "--scone-color-primary",
    "--scone-color-primary-foreground",
    "--scone-color-neutral",
    "--scone-color-info",
    "--scone-color-success",
    "--scone-color-warning",
    "--scone-color-danger",
    "--scone-color-overlay-backdrop",
    "--scone-spacing-2xs",
    "--scone-spacing-xs",
    "--scone-spacing-sm",
    "--scone-spacing-md",
    "--scone-spacing-lg",
    "--scone-spacing-xl",
    "--scone-radius-sm",
    "--scone-radius-md",
    "--scone-radius-lg",
    "--scone-radius-full",
    "--scone-shadow-sm",
    "--scone-shadow-md",
    "--scone-shadow-lg",
    "--scone-font-body",
    "--scone-font-label",
    "--scone-font-title",
    "--scone-font-mono",
    "--scone-focus-ring",
    "--scone-focus-ring-offset",
    "--scone-duration-fast",
    "--scone-duration-default",
    "--scone-easing-standard",
    "--scone-z-sticky",
    "--scone-z-dropdown",
    "--scone-z-popover",
    "--scone-z-drawer",
    "--scone-z-modal",
    "--scone-z-toast",
    "--scone-control-height-sm",
    "--scone-control-height-md",
    "--scone-control-height-lg",
    "--scone-icon-size-sm",
    "--scone-icon-size-md",
    "--scone-icon-size-lg",
    "--scone-hit-area-min",
    "--scone-page-width-narrow",
    "--scone-page-width-content",
    "--scone-page-width-wide",
    "--scone-page-width-full",
    "--scone-drawer-width-sm",
    "--scone-drawer-width-md",
    "--scone-drawer-width-lg",
    "--scone-drawer-width-full",
];

const listFiles = (directory: string): string[] => {
    return readdirSync(directory).flatMap((entry) => {
        const entryPath = join(directory, entry);
        const stat = statSync(entryPath);

        if (stat.isDirectory()) {
            return listFiles(entryPath);
        }

        return entryPath;
    });
};

describe("theme variables", () => {
    it("defines the required scone token variables", () => {
        const theme = readFileSync(defaultThemePath, "utf8");

        for (const variable of requiredVariables) {
            expect(theme).toContain(`${variable}:`);
        }
    });

    it("keeps styles/theme.css as a compatibility entry", () => {
        const theme = readFileSync(compatibilityThemePath, "utf8");

        expect(theme.trim()).toBe('@import "../default.theme.css";');
    });

    it("keeps token definitions in default.theme.css", () => {
        const tokenDefinitionPattern = /(?:^|[\s{;])--scone-[\w-]+\s*:/;
        const tokenDefinitionFiles = listFiles(srcDir)
            .filter((file) => /\.(css|ts|tsx)$/.test(file))
            .filter((file) => file !== defaultThemePath)
            .filter((file) => file !== compatibilityThemePath)
            .filter((file) => !file.endsWith(".test.ts") && !file.endsWith(".test.tsx"))
            .filter((file) => tokenDefinitionPattern.test(readFileSync(file, "utf8")))
            .map((file) => relative(srcDir, file));

        expect(tokenDefinitionFiles).toEqual([]);
    });

    it("keeps Tailwind config mapped to current token names", () => {
        const config = readFileSync(tailwindConfigPath, "utf8");
        const staleVariableSuffixes = ["font-family-", "font-size-", "motion-", "z-index-"];
        const currentVariables = [
            "--scone-font-body",
            "--scone-font-label",
            "--scone-font-title",
            "--scone-font-mono",
            "--scone-duration-fast",
            "--scone-duration-default",
            "--scone-easing-standard",
            "--scone-z-sticky",
            "--scone-z-dropdown",
            "--scone-z-popover",
            "--scone-z-drawer",
            "--scone-z-modal",
            "--scone-z-toast",
        ];

        for (const suffix of staleVariableSuffixes) {
            expect(config).not.toContain(`--scone-${suffix}`);
        }
        for (const variable of currentVariables) {
            expect(config).toContain(variable);
        }
    });
});
