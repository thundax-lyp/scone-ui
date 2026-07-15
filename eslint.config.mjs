import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: [
            "dist",
            "coverage",
            "apps/*/dist",
            "packages/*/dist",
            "packages/scone-ui/src/components/ui/**/*.{ts,tsx}",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/explicit-module-boundary-types": "error",
            "@typescript-eslint/no-inferrable-types": "error",
            "@typescript-eslint/no-unnecessary-type-arguments": "error",
            "@typescript-eslint/no-unnecessary-type-constraint": "error",
            "@typescript-eslint/no-unnecessary-type-parameters": "error",
            "@typescript-eslint/use-unknown-in-catch-callback-variable": "error",
            "no-restricted-syntax": [
                "error",
                {
                    selector: "FunctionDeclaration",
                    message: "Use a const arrow function instead of a function declaration.",
                },
                {
                    selector: "FunctionExpression",
                    message: "Use an arrow function instead of a function expression.",
                },
            ],
            "no-console": "error",
            "no-nested-ternary": "error",
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        },
    },
    {
        files: [
            "packages/scone-ui/src/components/form/field.tsx",
            "packages/scone-ui/src/components/form/form.tsx",
            "packages/scone-ui/src/patterns/*.tsx",
        ],
        rules: {
            "react-refresh/only-export-components": "off",
        },
    },
);
