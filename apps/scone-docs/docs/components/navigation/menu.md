---
title: SconeMenu
sidebar_position: 20
---

# SconeMenu

结构化导航菜单。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeMenu` |
| 分类 | 导航 |
| 导入 | `import { SconeMenu } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeMenu } from "scone-ui";
import type { SconeMenuProps } from "scone-ui";
```

## 使用

结构化导航菜单。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop                                   | 类型                                               | 说明         |
| -------------------------------------- | -------------------------------------------------- | ------------ |
| `items`                                | `SconeNavigationItem[]`                            | 菜单项。     |
| `selectedKeys` / `defaultSelectedKeys` | `string[]`                                         | 当前选中项。 |
| `openKeys` / `defaultOpenKeys`         | `string[]`                                         | 展开分组。   |
| `onSelect`                             | `(key: string, item: SconeNavigationItem) => void` | 选择回调。   |
| `onOpenChange`                         | `(keys: string[]) => void`                         | 展开变化。   |
| `orientation`                          | `"vertical" \| "horizontal"`                       | 方向。       |
| `collapsed`                            | `boolean`                                          | 折叠展示。   |
| `className`                            | `string`                                           | 样式。       |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
