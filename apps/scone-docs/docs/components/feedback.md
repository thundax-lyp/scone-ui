---
title: 反馈总览
sidebar_position: 7
---

# 反馈总览

反馈和浮层组件表达状态、空态、进度、任务容器、确认语义、焦点管理和关闭行为。它们不绑定创建、编辑、详情等业务流程。

## 组件和服务

| 能力 | 公共 API | 主要用途 |
| --- | --- | --- |
| 页内提示 | `SconeAlert` | 错误、警告、成功或信息提示。 |
| 空状态 | `SconeEmpty` | 无数据、无结果或初始状态。 |
| 加载 | `SconeLoading` | 未知时长等待。 |
| 进度 | `SconeProgress` | 可量化任务进度。 |
| 对话框 | `SconeDialog` | 短流程任务容器。 |
| 抽屉 | `SconeDrawer` | 长表单和侧边编辑。 |
| 确认 | `SconeConfirm` | 危险或重要动作确认。 |
| 轻提示 | `SconeToastProvider`、`toast` | 短暂全局反馈。 |
| 通知 | `SconeNotificationProvider`、`notification` | 持久或系统级通知。 |

## 关闭协议

`SconeDrawer` 和 `SconeDialog` 使用受控 `open`。常见事件分两层：

| 事件 | 语义 |
| --- | --- |
| `onOpenChange(open)` | 底层打开状态变化桥接。 |
| `onRequestClose(reason)` | 用户请求关闭；调用方决定是否真正关闭。 |

关闭原因使用 camelCase 词表，例如 `escape`、`outside`、`closeButton`、`footerAction`、`programmatic`。

## 选择规则

- 未知时长等待用 `SconeLoading`，可量化进度用 `SconeProgress`。
- 空数据用 `SconeEmpty`，错误提示用 `SconeAlert`。
- 短暂反馈用 `toast`，系统通知或需要保留的消息用 `notification`。
- 长表单编辑用 `SconeDrawer`，短确认或短流程用 `SconeDialog` / `SconeConfirm`。

## 反模式

- 用 Dialog 承载长表单或复杂数据表。
- 自写 focus trap、Escape 关闭或 ARIA role 替代 Radix 行为。
- 用 `destructive` 颜色代替确认流程和影响说明。
