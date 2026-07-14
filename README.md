# scone-ui

Admin UI component library for React and Tailwind CSS.

`scone-ui` provides reusable form, data display, layout, feedback, navigation, media, and admin-page pattern components. It is a component package, not an application framework: routing, data fetching, permissions, validation schemas, and product-specific business rules stay in the consuming app.

## Install

```sh
pnpm add scone-ui
```

Peer dependencies:

```sh
pnpm add react react-dom
```

## Styles

Import the package stylesheet once at the app root or preview root:

```tsx
import "scone-ui/styles.css";
```

The stylesheet includes the package theme contract and Tailwind/shadcn animation support used by the components.

## Basic Usage

```tsx
import "scone-ui/styles.css";

import { SconeButton, SconeField, SconeForm, SconeInput } from "scone-ui";

export function AccountForm() {
    return (
        <SconeForm onSubmit={(event) => event.preventDefault()}>
            <SconeField.Root name="email" required>
                <SconeField.Label>Email</SconeField.Label>
                <SconeField.Control>
                    <SconeInput type="email" ariaLabel="Email" />
                </SconeField.Control>
                <SconeField.Message />
            </SconeField.Root>
            <SconeButton type="submit">Save</SconeButton>
        </SconeForm>
    );
}
```

## Public Imports

Import public components, patterns, services, hooks, helpers, and types from the package root:

```tsx
import { SconeButton, SconeTable, SconeDrawer, DataTable } from "scone-ui";
import type { SconeButtonProps, SconeTableColumn } from "scone-ui";
```

Do not import internal shadcn/Radix primitives or source paths:

```tsx
import { Button } from "scone-ui/components/ui/button";
import { Button } from "@/components/ui/button";
```

## Component Families

- Form: `SconeButton`, `SconeInput`, `SconeSelect`, `SconeCheckbox`, `SconeRadioGroup`, `SconeForm`, `SconeField`, and related controls.
- Data display: `SconeTable`, `SconeDescriptions`, `SconeCard`, `SconeBadge`, `SconeList`, `SconeStatistic`, `SconeTimeline`, typography components.
- Layout: `SconeStack`, `SconeInline`, `SconeCompact`, `SconeToolbar`, `SconeScrollArea`, `SconeSeparator`, `SconeSplitPane`.
- Feedback and overlay: `SconeAlert`, `SconeDialog`, `SconeDrawer`, `SconeConfirm`, `SconeEmpty`, `SconeLoading`, `SconeProgress`, `SconeToastProvider`, `toast`, `SconeNotificationProvider`, `notification`.
- Navigation and media: `SconeTabs`, `SconeDropdown`, `SconeMenu`, `SconeBreadcrumb`, `SconePagination`, `SconeTree`, `SconeCommand`, `SconeTooltip`, `SconeAvatar`, `SconeImage`.
- Admin patterns: `AppShell`, `Page`, `Section`, `FilterBar`, `DataTable`.

For exact props, read the installed `dist/index.d.ts`.

## AI And Package Docs

The package ships a standalone AI guide:

```text
scone-ui/PACKAGE-AI-GUIDE.md
```

Use it to guide AI code generation, wrapper creation, component selection, and public import boundaries. Additional package-shipped specs live under:

```text
scone-ui/docs/10-specs/
```

These documents are package-facing references. Internal design docs, runbooks, TODO files, and PR notes are not package API.

## Package Exports

- `scone-ui`: JS/CJS runtime and TypeScript declarations.
- `scone-ui/styles.css`: package stylesheet.
- `scone-ui/PACKAGE-AI-GUIDE.md`: standalone AI and consumer guidance document.
- `scone-ui/package.json`: package metadata.

## Development

```sh
pnpm install
pnpm format
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm pack:check
```

## License

Apache-2.0
