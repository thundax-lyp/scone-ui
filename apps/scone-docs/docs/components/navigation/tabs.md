---
title: SconeTabs
sidebar_position: 20
---

# SconeTabs

局部视图切换。

## 定位

- 站点分类：导航
- 导入入口：`"scone-ui"`
- API 权威：当前安装包的 `scone-ui/dist/index.d.ts`
- 规则来源：`scone-ui/PACKAGE-AI-GUIDE.md` 和仓库 specs

## 导入

```tsx
import { SconeTabs } from "scone-ui";
```

类型也从 `"scone-ui"` 导入；封装组件时优先复用公共 props 类型，不要重新声明不完整 props。

## 何时使用

局部视图切换。

需要业务请求、权限判断、路由跳转、校验 schema 或产品文案时，由调用方应用组合，不写入组件内部。

## Props

下表来自 Scone specs，用于快速阅读组件能力。精确类型、默认值、泛型和 compound parts 仍以当前安装版本的 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                             | 说明                  |
| ------------------------ | -------------------------------- | --------------------- |
| `value` / `defaultValue` | `string`                         | 当前 tab。            |
| `onValueChange`          | `(value: string) => void`        | 切换回调。            |
| `orientation`            | `"horizontal" \| "vertical"`     | 方向。                |
| `activationMode`         | `"automatic" \| "manual"`        | 激活方式。            |
| `items`                  | `SconeOption&lt;string&gt;[]`          | 简单场景 helper。     |
| `ariaLabel`              | `string`                         | 无可见 label 时必填。 |
| `children`               | `ReactNode`                      | compound parts。      |
| `className`              | `string`                         | 样式。                |
| root HTML props          | `HTMLAttributes&lt;HTMLDivElement&gt;` | 透传到 root DOM。     |

## 边界

- 不导入 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不按 Ant Design、shadcn、HTML 或历史记忆猜 props。
- 不在组件内实现产品业务流程。
