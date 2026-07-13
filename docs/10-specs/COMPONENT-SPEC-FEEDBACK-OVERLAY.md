# Feedback And Overlay Component Spec

本文档是该分组的索引和共享规则。单组件合同已拆分到更小颗粒度的 SPEC 文件。

## Scope

本规格覆盖 admin-ui 基础反馈和浮层组件。反馈组件表达状态、空态、进度和恢复动作；浮层组件提供任务容器、确认语义、焦点管理和关闭行为，不绑定创建、编辑、详情等业务流程。

跨组件状态和可访问性以 [`FOUNDATIONS-SPEC.md`](./FOUNDATIONS-SPEC.md) 为准；DrawerForm、ConfirmationFlow 等组合以 [`ADMIN-PATTERNS-SPEC.md`](./ADMIN-PATTERNS-SPEC.md) 为准。

## Overlay Principles

- 优先继承 Radix/shadcn 的 focus trap、focus restore、Escape、outside interaction 和 ARIA 行为。
- 浮层必须有标题或 `ariaLabel`。
- 关闭行为必须可预测，并通过 close contract 区分用户关闭、提交成功关闭和外部受控关闭。
- 不在 Dialog/Drawer 内再打开复杂 Dialog；危险确认可使用 AlertDialog，但应控制嵌套深度。
- 长内容必须有明确滚动区域；footer 不随内容滚走，除非 recipe 明确。

## Overlay Close Contract

Drawer 和 Dialog 使用受控 `open`。基础事件分两层：

- `onOpenChange(open)`：底层 Radix 状态变化桥接，保持与 shadcn/Radix 兼容。
- `onRequestClose(reason)`：用户请求关闭时触发；调用方可以选择是否把 `open` 置为 `false`。

`reason` 取值：

权威类型为 [`FOUNDATIONS-SPEC.md`](./FOUNDATIONS-SPEC.md) 中的 `OverlayCloseReason`。本节只解释触发来源，不维护第二套词表。

| reason         | 来源                                       |
| -------------- | ------------------------------------------ |
| `escape`       | 用户按 Escape。                            |
| `outside`      | 用户点击或交互到浮层外。                   |
| `closeButton`  | 用户点击关闭按钮。                         |
| `footerAction` | footer 中取消、关闭等显式操作。            |
| `programmatic` | 调用方因提交成功、路由变化等外部状态关闭。 |

## Close Rules

- `onRequestClose` 只用于关闭请求，不自动改变 `open`。
- `programmatic` 不来自 Radix outside/escape；调用方关闭成功后可记录该 reason。
- 需要脏表单拦截时，调用方在 `onRequestClose` 中打开 Confirm，确认后再设置 `open=false`。
- 基础 Drawer/Dialog 不内置 dirty 判断或二次确认。
- 不使用 `close-button`、`footer-action` 等 kebab-case reason；事件协议统一使用 Foundation 的 camelCase 词表。

## Component Index

反馈和浮层组件均属于当前实现范围。它们可以表达 UI 状态、关闭原因、队列和 provider/service 边界，但不内置请求、权限、路由、通知订阅、持久化或业务确认文案。

- [`SconeDrawer`](./components/feedback-overlay/SCONE-DRAWER.md)
- [`SconeDialog`](./components/feedback-overlay/SCONE-DIALOG.md)
- [`SconeConfirm`](./components/feedback-overlay/SCONE-CONFIRM.md)
- [`SconeAlert`](./components/feedback-overlay/SCONE-ALERT.md)
- [`SconeEmpty`](./components/feedback-overlay/SCONE-EMPTY.md)
- [`SconeLoading`](./components/feedback-overlay/SCONE-LOADING.md)
- [`SconeProgress`](./components/feedback-overlay/SCONE-PROGRESS.md)
- [`SconeToast`](./components/feedback-overlay/SCONE-TOAST.md)
- [`SconeNotification`](./components/feedback-overlay/SCONE-NOTIFICATION.md)

## Recipes

- [Result Recipe](./recipes/RESULT.md)

## Overlay Behavior Matrix

| 能力          | Drawer                             | Dialog     | Confirm                  |
| ------------- | ---------------------------------- | ---------- | ------------------------ |
| Radix 基座    | Sheet/Drawer                       | Dialog     | AlertDialog              |
| focus trap    | 继承                               | 继承       | 继承                     |
| focus restore | 继承                               | 继承       | 继承                     |
| Escape 关闭   | 默认支持，可由受控逻辑阻止         | 默认支持   | 默认支持但危险动作不执行 |
| outside click | 默认可关闭，表单脏状态由调用方拦截 | 默认可关闭 | 通常不作为确认           |
| footer        | 支持                               | 支持       | 固定取消/确认区域        |
| 长内容        | 内容区滚动，footer 固定            | 谨慎使用   | 不适用                   |

## Anti-patterns

- 用 Dialog 承载长表单或复杂数据表。
- 在 Tooltip 或 Dropdown 中放确认表单。
- 自写 focus trap、Escape 关闭或 ARIA role 替代 Radix。
- 用 `destructive` 颜色代替确认流程和影响说明。
