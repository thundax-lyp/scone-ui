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

`scone-ui/styles.css` 是零配置入口，已包含默认主题变量、组件样式、Tailwind bridge、shadcn 动画支持和字体导入。

公开 CSS 入口：

| 入口                         | 用途                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `scone-ui/styles.css`        | 推荐入口。完整组件库样式，包含默认 theme。                                      |
| `scone-ui/default.theme.css` | 默认 token 文件。用于主题审阅、单独对比或高级构建拆分。普通应用不需要额外导入。 |
| `scone-ui/styles/theme.css`  | 兼容入口，转发默认 theme。新代码不要优先使用。                                  |

自定义主题时，在 `scone-ui/styles.css` 之后覆盖 token：

```css
@import "scone-ui/styles.css";

:root {
    --scone-color-primary: #1677ff;
    --scone-color-success: #52c41a;
}

.dark,
[data-theme="dark"] {
    --scone-color-primary: #69b1ff;
}
```

不要在普通应用中同时导入 `scone-ui/styles.css` 和 `scone-ui/default.theme.css`，因为 `styles.css` 已包含默认 theme。示例站 CSS 只服务在线 example 页面布局和演示视觉，不是调用方应用需要导入的包样式。

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
- 主题覆盖写在 `scone-ui/styles.css` 之后。
