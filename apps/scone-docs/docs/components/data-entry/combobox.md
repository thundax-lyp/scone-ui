---
title: SconeCombobox
sidebar_position: 20
---

# SconeCombobox

大量选项的搜索选择。

## 定位

- 站点分类：数据录入
- 导入入口：`"scone-ui"`
- API 权威：当前安装包的 `scone-ui/dist/index.d.ts`
- 规则来源：`scone-ui/PACKAGE-AI-GUIDE.md` 和仓库 specs

## 导入

```tsx
import { SconeCombobox } from "scone-ui";
```

类型也从 `"scone-ui"` 导入；封装组件时优先复用公共 props 类型，不要重新声明不完整 props。

## 何时使用

大量选项的搜索选择。

需要业务请求、权限判断、路由跳转、校验 schema 或产品文案时，由调用方应用组合，不写入组件内部。

## Props

下表来自 Scone specs，用于快速阅读组件能力。精确类型、默认值、泛型和 compound parts 仍以当前安装版本的 `scone-ui/dist/index.d.ts` 为准。

| Prop                     | 类型                             | 说明                    |
| ------------------------ | -------------------------------- | ----------------------- |
| `options`                | `SconeOption&lt;string&gt;[]`          | 本地选项。              |
| `value` / `defaultValue` | `string`                         | 当前值。                |
| `onValueChange`          | `(value: string) => void`        | 值变化。                |
| `searchValue`            | `string`                         | 受控搜索文本。          |
| `defaultSearchValue`     | `string`                         | 默认搜索文本。          |
| `onSearchChange`         | `(value: string) => void`        | 搜索文本变化。          |
| `open` / `defaultOpen`   | `boolean`                        | 浮层打开状态。          |
| `onOpenChange`           | `(open: boolean) => void`        | 浮层打开变化。          |
| `onClear`                | `() => void`                     | 清空当前值。            |
| `loading`                | `boolean`                        | 选项加载中。            |
| `renderEmpty`            | `ReactNode \| (() => ReactNode)` | 无匹配结果。            |
| `placeholder`            | `string`                         | 占位文本。              |
| `disabled` / `readOnly`  | `boolean`                        | 禁用或只读。            |
| `invalid`                | `boolean`                        | 与 Field 错误状态联动。 |
| `ariaLabel`              | `string`                         | 无可见 label 时必填。   |
| `children`               | `ReactNode`                      | 可选 compound 内容。    |
| `className`              | `string`                         | 样式。                  |

## 边界

- 不导入 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不按 Ant Design、shadcn、HTML 或历史记忆猜 props。
- 不在组件内实现产品业务流程。
