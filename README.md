# scone-ui workspace

这是 `scone-ui` 的 monorepo 工作区。发布包位于 `packages/scone-ui`，示例应用位于 `apps/example`。

## 开发命令

```sh
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build:example
pnpm pack:check
```

- `pnpm dev`：启动 `apps/example` 示例应用。
- `pnpm build`：构建 `packages/scone-ui` 发布包。
- `pnpm build:example`：构建示例应用。
- `pnpm pack:check`：在发布包目录执行 dry-run 打包检查。

发布包随包 AI 文档位于 `packages/scone-ui/README.md` 和 `packages/scone-ui/PACKAGE-AI-GUIDE.md`。
