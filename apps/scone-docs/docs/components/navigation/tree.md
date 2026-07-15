---
title: SconeTree
sidebar_position: 20
---

# SconeTree

树形数据选择、展开和勾选。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeTree` |
| 分类 | 导航 |
| 导入 | `import { SconeTree } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeTree } from "scone-ui";
import type { SconeTreeProps } from "scone-ui";
```

## 使用

树形数据选择、展开和勾选。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                                   | 类型                                                                      | 说明           |
| -------------------------------------- | ------------------------------------------------------------------------- | -------------- |
| `treeData`                             | `SconeTreeNode[]`                                                         | 节点数据。     |
| `selectedKeys` / `defaultSelectedKeys` | `Key[]`                                                                   | 选中节点。     |
| `checkedKeys` / `defaultCheckedKeys`   | `Key[]`                                                                   | 勾选节点。     |
| `expandedKeys` / `defaultExpandedKeys` | `Key[]`                                                                   | 展开节点。     |
| `checkable`                            | `boolean`                                                                 | 是否可勾选。   |
| `selectable`                           | `boolean`                                                                 | 是否可选择。   |
| `multiple`                             | `boolean`                                                                 | 是否允许多选。 |
| `onSelect`                             | `(keys: Key[], info: { node: SconeTreeNode; selected: boolean }) => void` | 选择变化。     |
| `onCheck`                              | `(keys: Key[], info: { node: SconeTreeNode; checked: boolean }) => void`  | 勾选变化。     |
| `onExpand`                             | `(keys: Key[], info: { node: SconeTreeNode; expanded: boolean }) => void` | 展开变化。     |
| `ariaLabel`                            | `string`                                                                  | 可访问名称。   |
| `className`                            | `string`                                                                  | 样式。         |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
