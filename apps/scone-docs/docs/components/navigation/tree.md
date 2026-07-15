---
title: SconeTree
sidebar_position: 20
---

# SconeTree

树形数据选择、展开和勾选。

## 定位

- 站点分类：导航
- 导入入口：`"scone-ui"`
- API 权威：当前安装包的 `scone-ui/dist/index.d.ts`
- 规则来源：`scone-ui/PACKAGE-AI-GUIDE.md` 和仓库 specs

## 导入

```tsx
import { SconeTree } from "scone-ui";
```

类型也从 `"scone-ui"` 导入；封装组件时优先复用公共 props 类型，不要重新声明不完整 props。

## 何时使用

树形数据选择、展开和勾选。

需要业务请求、权限判断、路由跳转、校验 schema 或产品文案时，由调用方应用组合，不写入组件内部。

## Props

下表来自 Scone specs，用于快速阅读组件能力。精确类型、默认值、泛型和 compound parts 仍以当前安装版本的 `scone-ui/dist/index.d.ts` 为准。

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

## 边界

- 不导入 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不按 Ant Design、shadcn、HTML 或历史记忆猜 props。
- 不在组件内实现产品业务流程。
