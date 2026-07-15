---
title: 快速开始
sidebar_position: 1
---

# 快速开始

`scone-ui` 是 React + Tailwind CSS 的后台 UI 组件库。它不是应用框架。

安装组件库：

```bash
pnpm add scone-ui
```

在应用入口引入一次样式：

```ts
import "scone-ui/styles.css";
```

使用组件：

```tsx
import { SconeButton } from "scone-ui";

export const Example = (): React.JSX.Element => {
    return <SconeButton>保存</SconeButton>;
};
```

## AI 读取顺序

生成调用方代码时按以下顺序确认 API：

1. `scone-ui/dist/index.d.ts`：当前安装版本的 props、事件名、类型和导出权威。
2. `scone-ui/PACKAGE-AI-GUIDE.md`：组件选择、导入边界、wrapper 规则和生成规则。

不要套用其他库或原生元素的 props。当前安装包的 `.d.ts` 始终优先。

## 导入规则

所有公共组件、Pattern、service、hook、helper 和类型都从 `"scone-ui"` 导入。

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

## 边界

- 请求、路由、权限、mutation、校验 schema 和产品文案留在调用方应用。
- 组件 props、事件名和类型以 `dist/index.d.ts` 为准。
- 包样式不要在业务组件里重复引入。
