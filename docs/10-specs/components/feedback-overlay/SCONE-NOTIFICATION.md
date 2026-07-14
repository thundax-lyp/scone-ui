# SconeNotification

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

较长或较重要的非阻断通知，用于后台任务、系统事件和可恢复提醒。

组件 API：

| Prop           | 类型                                       | 说明               |
| -------------- | ------------------------------------------ | ------------------ |
| `children`     | `ReactNode`                                | provider。         |
| `placement`    | NotificationPlacement                      | 展示位置。         |
| `maxVisible`   | `number`                                   | 最大可见数。       |
| `onOpenChange` | `(items: SconeNotificationItem[]) => void` | 当前通知队列变化。 |

Service API：

| 方法                            | 说明           |
| ------------------------------- | -------------- |
| `notification.open(opts)`       | 打开通知。     |
| `notification.update(id, opts)` | 更新通知。     |
| `notification.close(id)`        | 关闭指定通知。 |
| `notification.clear()`          | 清空通知。     |

`opts` 至少包含 `id`、`title`、`description`、`tone`、`time`、`action`、`persistent`、`onAction`、`onClose`。

## Usage

- 后台任务、系统事件和可恢复提醒使用 Notification。
- 即时短反馈使用 Toast；强阻断流程使用 Dialog。

## Rules

- Notification 是可阅读通知；Toast 是短反馈。
- 不替代 Dialog、Alert 或任务中心。
- 业务通知来源、订阅、已读状态和持久化由产品侧处理。
- 持久通知必须提供关闭或跳转动作。

测试：

- 可打开、更新、关闭、清空。
- `persistent` 不自动消失。
- action 点击、关闭事件和最大可见数策略可验证。
