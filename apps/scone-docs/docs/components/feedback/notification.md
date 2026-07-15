---
title: SconeNotificationProvider / notification
sidebar_position: 20
---

# SconeNotificationProvider / notification

持久或系统级通知。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeNotificationProvider`、`notification` |
| 分类 | 反馈服务 |
| 导入 | `import { SconeNotificationProvider, notification } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeNotificationProvider, notification } from "scone-ui";
```

## 使用

持久或系统级通知。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop           | 类型                                       | 说明               |
| -------------- | ------------------------------------------ | ------------------ |
| `children`     | `ReactNode`                                | provider。         |
| `placement`    | NotificationPlacement                      | 展示位置。         |
| `maxVisible`   | `number`                                   | 最大可见数。       |
| `onOpenChange` | `(items: SconeNotificationItem[]) => void` | 当前通知队列变化。 |

## Service API

| 方法                            | 说明           |
| ------------------------------- | -------------- |
| `notification.open(opts)`       | 打开通知。     |
| `notification.update(id, opts)` | 更新通知。     |
| `notification.close(id)`        | 关闭指定通知。 |
| `notification.clear()`          | 清空通知。     |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
