---
title: 快速开始
sidebar_position: 1
---

# 快速开始

`scone-ui` 是 React + Tailwind CSS 的后台 UI 组件库。它不是应用框架，不提供路由、请求、权限、校验 schema 或业务字段规则。

安装组件库：

```bash
pnpm add scone-ui
```

在应用入口引入样式：

```ts
import "scone-ui/styles.css";
```

使用组件：

```tsx
import "scone-ui/styles.css";

import { SconeButton } from "scone-ui";

export const Example = (): React.JSX.Element => {
    return <SconeButton>保存</SconeButton>;
};
```

## AI 读取顺序

AI、IDE Agent 或代码生成器生成调用方代码时，必须按以下顺序确认 API：

1. `scone-ui/dist/index.d.ts`：当前安装版本的 props、事件名、类型和导出权威。
2. `scone-ui/PACKAGE-AI-GUIDE.md`：组件选择、导入边界、wrapper 规则和生成规则。

不要按 Ant Design、shadcn、HTML 或历史记忆猜 props。当前安装包的 `.d.ts` 始终优先。

## 导入规则

所有公共组件、Pattern、service、hook、helper 和类型都从 `"scone-ui"` 导入：

```tsx
import { DataTable, SconeButton, SconeDrawer, SconeTable } from "scone-ui";
import type { SconeButtonProps, SconeTableColumn } from "scone-ui";
```

不要导入内部 primitive、源码路径或未文档化子路径：

```tsx
import { Button } from "scone-ui/components/ui/button";
import { Button } from "@/components/ui/button";
import { Button } from "shadcn/ui";
```

## 文档维护约定

- 面向公共组件、模式和使用指南编写内容。
- 不写产品业务规则、后端契约或具体应用工作流。
- 当组件 API、样式入口或安装方式变化时，同步更新文档。
