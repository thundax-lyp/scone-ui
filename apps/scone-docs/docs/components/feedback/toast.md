---
title: SconeToastProvider / toast
sidebar_position: 20
---

# SconeToastProvider / toast

短暂全局反馈。

## 定位

- 站点分类：反馈服务
- 导入入口：`"scone-ui"`
- API 权威：当前安装包的 `scone-ui/dist/index.d.ts`
- 规则来源：`scone-ui/PACKAGE-AI-GUIDE.md` 和仓库 specs

## 导入

```tsx
import { SconeToastProvider, toast } from "scone-ui";
```

类型也从 `"scone-ui"` 导入；封装组件时优先复用公共 props 类型，不要重新声明不完整 props。

## 何时使用

短暂全局反馈。

需要业务请求、权限判断、路由跳转、校验 schema 或产品文案时，由调用方应用组合，不写入组件内部。

## Props

下表来自 Scone specs，用于快速阅读组件能力。精确类型、默认值、泛型和 compound parts 仍以当前安装版本的 `scone-ui/dist/index.d.ts` 为准。

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

## 边界

- 不导入 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不按 Ant Design、shadcn、HTML 或历史记忆猜 props。
- 不在组件内实现产品业务流程。
