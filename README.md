# scone-ui workspace

[Docs](https://thundax-lyp.github.io/scone-ui/docs/) · [Example](https://thundax-lyp.github.io/scone-ui/example/) · [GitHub](https://github.com/thundax-lyp/scone-ui) · [npm](https://www.npmjs.com/package/scone-ui)

这是 `scone-ui` 的 monorepo 工作区。发布包位于 `packages/scone-ui`，示例应用位于 `apps/example`。

## 公开入口

- 文档地址：[https://thundax-lyp.github.io/scone-ui/docs/](https://thundax-lyp.github.io/scone-ui/docs/)
- 示例地址：[https://thundax-lyp.github.io/scone-ui/example/](https://thundax-lyp.github.io/scone-ui/example/)
- GitHub 代码地址：[https://github.com/thundax-lyp/scone-ui](https://github.com/thundax-lyp/scone-ui)
- npm 地址：[https://www.npmjs.com/package/scone-ui](https://www.npmjs.com/package/scone-ui)

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
