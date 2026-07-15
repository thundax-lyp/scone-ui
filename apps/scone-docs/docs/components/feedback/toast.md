---
title: SconeToastProvider / toast
sidebar_position: 20
---

# SconeToastProvider / toast

短暂全局反馈。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeToastProvider`、`toast` |
| 分类 | 反馈服务 |
| 导入 | `import { SconeToastProvider, toast } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeToastProvider, toast } from "scone-ui";
```

## 使用

短暂全局反馈。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop           | 类型                                | 说明           |
| -------------- | ----------------------------------- | -------------- |
| `children`     | `ReactNode`                         | provider。     |
| `position`     | ToastPosition                       | 默认位置。     |
| `duration`     | `number`                            | 默认时长。     |
| `maxVisible`   | `number`                            | 最大可见数。   |
| `onOpenChange` | `(items: SconeToastItem[]) => void` | 当前队列变化。 |

## Service API

| 方法                                        | 说明                        |
| ------------------------------------------- | --------------------------- |
| `toast.show(opts)`                          | 显示通用 toast，返回 `id`。 |
| `toast.success(opts)` / `toast.error(opts)` | 语义快捷方法，返回 `id`。   |
| `toast.update(id, opts)`                    | 更新指定 toast。            |
| `toast.dismiss(id, reason?)`                | 关闭指定 toast。            |
| `toast.clear()`                             | 清空队列，测试中必须可用。  |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
