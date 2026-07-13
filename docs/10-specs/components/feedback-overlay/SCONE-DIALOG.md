# SconeDialog

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

居中 Dialog，用于短内容、确认前信息查看或局部设置。导出命名使用 `SconeDialog`，文档中可把它称为 Dialog；不再使用 `Modal` 作为主命名，避免继承 AntD Modal API 心智。

| Prop             | 类型                                   | 说明               |
| ---------------- | -------------------------------------- | ------------------ |
| `open`           | `boolean`                              | 打开状态。         |
| `defaultOpen`    | `boolean`                              | 默认打开。         |
| `onOpenChange`   | `(open: boolean) => void`              | 打开状态变化。     |
| `onRequestClose` | `(reason: OverlayCloseReason) => void` | 用户请求关闭。     |
| `title`          | `ReactNode`                            | 标题。             |
| `description`    | `ReactNode`                            | 说明。             |
| `children`       | `ReactNode`                            | 内容。             |
| `footer`         | `ReactNode`                            | 底部区域。         |
| `widthPreset`    | `"sm" \| "md" \| "lg"`                 | 宽度预设。         |
| `ariaLabel`      | `string`                               | 无可见标题时必填。 |
| `className`      | `string`                               | 样式。             |

## Usage

- 短内容查看、轻量设置和局部任务隔离使用 Dialog。
- 长表单、复杂表格、持续编辑任务使用 Drawer 或页面。

## Rules

- Dialog 不内置 `onConfirm`、`confirmText` 或 `confirmLoading`；确认语义使用 Confirm。
- 长表单、复杂表格和持续编辑任务优先使用 Drawer 或页面。
- `onRequestClose` 至少区分 `escape`、`outside`、`closeButton`，footer 显式关闭使用 `footerAction`。
- shadcn mapping：基于 Dialog，保留 focus trap、focus restore 和 Escape 行为。

测试：

- 打开后焦点进入 Dialog，关闭后焦点回到触发器。
- Escape、outside click、close button 的关闭原因可验证。
- 无可见标题时必须可通过 `ariaLabel` 查询。
