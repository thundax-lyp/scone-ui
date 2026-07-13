# Repository Guidelines

## Read Order

- Read `docs/AGENTS.md` first for document routing.
- For documentation or governance work, read `docs/00-governance/DOCUMENT-RULES.md`.
- For TODO, task cleanup, PR, or closure work, read `docs/00-governance/TODO-RULES.md`.
- Do not treat root `README.md` as implementation authority.

## Project Scope

`scone-ui` is a foundational UI library and UI governance workspace. It is not a product application repository.

Keep repository content focused on reusable UI components, component usage inventory, library-level conventions, documentation, and migration support. Do not add product-specific UI rules, business workflows, backend contracts, or application runtime assumptions unless the repository later adds those modules explicitly.

## Project Structure

- `docs/`: repository documentation and inventories.
- `docs/00-governance/`: stable collaboration and documentation rules.
- `docs/30-designs/`: temporary runbooks or focused design notes when needed.
- `docs/40-readiness/`: implementation coverage, verification evidence, and release readiness notes when needed.
- `.github/`: PR templates and repository automation when introduced.

## Documentation Governance

Stable rules belong in `docs/00-governance/`. Temporary execution plans belong in `docs/30-designs/RUNBOOK-*.md` and should be removed after the task closes. Evidence that remains useful after closure belongs in `docs/40-readiness/`.

`docs/50-prompts/`, if introduced, stores manually triggered prompt templates only. It is not default AI context.

## Agent-Specific Instructions

Load the minimum docs needed for the task. Keep edits scoped, preserve user changes, and update documentation when behavior, setup, or developer workflow changes.

Do not migrate product-specific UI policy from kuzhambu into this repository. For example, do not create `UI-RULES.md` unless the user explicitly asks for a product/application UI policy.
