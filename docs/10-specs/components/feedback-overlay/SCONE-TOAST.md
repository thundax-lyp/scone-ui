# SconeToast

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

短暂、非阻断反馈，用于保存成功、复制成功、轻量失败提示等。

组件 API：

| Prop           | 类型                                | 说明           |
| -------------- | ----------------------------------- | -------------- |
| `children`     | `ReactNode`                         | provider。     |
| `position`     | ToastPosition                       | 默认位置。     |
| `duration`     | `number`                            | 默认时长。     |
| `maxVisible`   | `number`                            | 最大可见数。   |
| `onOpenChange` | `(items: SconeToastItem[]) => void` | 当前队列变化。 |

Service API：

| 方法                                        | 说明                        |
| ------------------------------------------- | --------------------------- |
| `toast.show(opts)`                          | 显示通用 toast，返回 `id`。 |
| `toast.success(opts)` / `toast.error(opts)` | 语义快捷方法，返回 `id`。   |
| `toast.update(id, opts)`                    | 更新指定 toast。            |
| `toast.dismiss(id, reason?)`                | 关闭指定 toast。            |
| `toast.clear()`                             | 清空队列，测试中必须可用。  |

`opts` 至少包含 `title`、`description`、`tone`、`action`、`duration`、`id`、`onAction`、`onDismiss`。`onDismiss(reason)` 的 reason 为 `"timeout" | "closeButton" | "programmatic"`。

## Usage

- 保存成功、复制成功和轻量失败反馈使用 Toast。
- 必须阅读或需要恢复操作的信息使用 Alert/Dialog。

## Rules

- Toast 只承载短反馈；必须阅读的错误、复杂说明或多个操作使用 Alert/Dialog。
- 默认位置由 provider 控制，单次调用可覆盖。
- 队列必须限制最大可见数，超出项排队或替换旧项，策略必须稳定。
- provider 或父组件发生无关 rerender 时，已显示 toast 的 timeout 不得被重置或延长。
- shadcn mapping：可基于 Sonner，但不得把 Sonner API 直接暴露为稳定 API。

测试：

- 可显示、自动关闭、手动关闭、按 id 更新或关闭。
- `toast.clear()` 能清理测试环境。
- action 点击、dismiss 和 timeout 事件可验证。
