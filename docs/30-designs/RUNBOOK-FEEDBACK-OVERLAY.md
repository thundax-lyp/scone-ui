# Feedback / Overlay 闭环 RUNBOOK

## Purpose

完成 `src/components/feedback-overlay/*` 组件族闭环，交付 Alert、Empty、Loading、Progress、Drawer、Dialog、Confirm、Toast、Notification 的组件实现、公共导出和测试验证。

本次闭环目标是让 Feedback / Overlay 成为可复用 admin-ui 组件族，不引入产品应用规则。实现依据优先级：

1. `docs/10-specs/COMPONENT-SPEC-FEEDBACK-OVERLAY.md`
2. `docs/10-specs/components/feedback-overlay/*.md`
3. `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md`
4. `docs/30-designs/admin-ui/TYPE-DATA-DESIGN.md`

公共跨组件类型只复用 `src/types/foundation.ts` 中的 `OverlayCloseReason`、`SconeTone`、`SconeStatus`、`SconeControlSize`，不得新增第二套 tone/status/overlay close reason。

## Scope

### 新增源码文件

- `src/components/feedback-overlay/alert.tsx`
- `src/components/feedback-overlay/empty.tsx`
- `src/components/feedback-overlay/loading.tsx`
- `src/components/feedback-overlay/progress.tsx`
- `src/components/feedback-overlay/drawer.tsx`
- `src/components/feedback-overlay/dialog.tsx`
- `src/components/feedback-overlay/confirm.tsx`
- `src/components/feedback-overlay/toast.tsx`
- `src/components/feedback-overlay/notification.tsx`

### 新增测试文件

- `src/components/feedback-overlay/alert.test.tsx`
- `src/components/feedback-overlay/empty.test.tsx`
- `src/components/feedback-overlay/loading.test.tsx`
- `src/components/feedback-overlay/progress.test.tsx`
- `src/components/feedback-overlay/drawer.test.tsx`
- `src/components/feedback-overlay/dialog.test.tsx`
- `src/components/feedback-overlay/confirm.test.tsx`
- `src/components/feedback-overlay/toast.test.tsx`
- `src/components/feedback-overlay/notification.test.tsx`

### 修改现有文件

- `src/index.ts`
- `src/index.test.ts`

## Non-goals

- 不引入业务请求、权限、路由、dirty 判断、二次确认、通知订阅、已读状态或持久化模型。
- 不迁移 kuzhambu 的产品特定 UI policy，不创建 `UI-RULES.md`。
- 不为 Data/Form 组件补功能；交叉只允许调用方组合 Empty、Alert、Loading、Progress、Confirm。
- 不自写 focus trap、Escape 关闭、outside interaction 或 ARIA role 替代 Radix 行为。
- 不让 Dialog 承载长表单、复杂表格或持续编辑任务；这些场景归 Drawer 或页面。
- 不把 Toast/Notification service 暴露为业务事件总线。

## Target Data Structures

### `src/components/feedback-overlay/alert.tsx`

导出：

- `SconeAlert`
- `SconeAlertProps`

`SconeAlertProps` 字段：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `tone` | `SconeTone` | 否 | 语义色，默认 `neutral`。 |
| `title` | `React.ReactNode` | 否 | 提示标题。 |
| `description` | `React.ReactNode` | 否 | 可读说明；错误不能只展示错误码。 |
| `icon` | `React.ReactNode` | 否 | 状态辅助图标，不作为唯一状态表达。 |
| `action` | `React.ReactNode` | 否 | 与提示直接相关的单个操作控件。 |
| `className` | `string` | 否 | 状态容器样式。 |

前端控件和操作：

- 控件：状态容器、图标槽、标题文本、说明文本、action 区域。
- 操作：点击 `action` 中由调用方传入的 Button/Link；组件自身不处理业务动作。

### `src/components/feedback-overlay/empty.tsx`

导出：

- `SconeEmpty`
- `SconeEmptyProps`

`SconeEmptyProps` 字段：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | `React.ReactNode` | 否 | 空态标题，说明当前没有什么。 |
| `description` | `React.ReactNode` | 否 | 解释原因或下一步。 |
| `image` | `React.ReactNode` | 否 | 空态图像或插画槽。 |
| `action` | `React.ReactNode` | 否 | 可恢复操作入口。 |
| `className` | `string` | 否 | 状态容器样式。 |

前端控件和操作：

- 控件：空态容器、image 槽、标题文本、说明文本、action 区域。
- 操作：点击 `action` 中由调用方传入的 Button/Link；错误、权限不足、加载失败不使用 Empty。

### `src/components/feedback-overlay/loading.tsx`

导出：

- `SconeLoading`
- `SconeLoadingProps`

`SconeLoadingProps` 字段：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `loading` | `boolean` | 否 | 是否展示加载态，默认 `true`。 |
| `type` | `"spinner" \| "skeleton"` | 否 | 加载表达方式，默认 `spinner`。 |
| `size` | `SconeControlSize` | 否 | spinner 尺寸。 |
| `children` | `React.ReactNode` | 否 | 被覆盖或保留尺寸的内容。 |
| `className` | `string` | 否 | 加载容器样式。 |

前端控件和操作：

- 控件：加载容器、spinner 或 skeleton、children 内容区域。
- 操作：无用户操作；区域级 loading 设置 `aria-busy`，操作级 loading 由 Button 自身表达。

### `src/components/feedback-overlay/progress.tsx`

导出：

- `SconeProgress`
- `SconeProgressProps`

`SconeProgressProps` 字段：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `value` | `number` | 否 | 当前进度值，默认 `0`。 |
| `max` | `number` | 否 | 最大值，默认 `100`。 |
| `status` | `SconeStatus` | 否 | 任务状态：`idle`、`active`、`success`、`error`。 |
| `showLabel` | `boolean` | 否 | 是否显示进度文本。 |
| `label` | `React.ReactNode` | 否 | 任务状态文案；长任务必须可读。 |
| `className` | `string` | 否 | 进度容器样式。 |

前端控件和操作：

- 控件：进度条、可选百分比文本、可选状态文案。
- 操作：无用户操作；用于上传、导入、批处理等可量化进度。

### `src/components/feedback-overlay/drawer.tsx`

导出：

- `SconeDrawer`
- `SconeDrawerProps`

`SconeDrawerProps` 字段：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | 否 | 受控打开状态。 |
| `defaultOpen` | `boolean` | 否 | 非受控默认打开状态。 |
| `onOpenChange` | `(open: boolean) => void` | 否 | Radix open 状态变化。 |
| `onRequestClose` | `(reason: OverlayCloseReason) => void` | 否 | 用户请求关闭，不替调用方改变受控 `open`。 |
| `title` | `React.ReactNode` | 否 | 可见标题；无标题时必须提供 `ariaLabel`。 |
| `description` | `React.ReactNode` | 否 | 面板说明。 |
| `side` | `"right" \| "left" \| "bottom"` | 否 | 出现方向，默认 `right`。 |
| `widthPreset` | `"sm" \| "md" \| "lg" \| "full"` | 否 | 宽度预设。 |
| `actions` | `React.ReactNode` | 否 | 标题右侧操作。 |
| `footer` | `React.ReactNode` | 否 | 底部固定区域。 |
| `loading` | `boolean` | 否 | 内容区域加载。 |
| `destroyOnClose` | `boolean` | 否 | 关闭后是否销毁内容。 |
| `ariaLabel` | `string` | 否 | 无可见标题时的可访问名称。 |
| `children` | `React.ReactNode` | 否 | Drawer 主内容。 |
| `className` | `string` | 否 | content 样式。 |

前端控件和操作：

- 控件：遮罩、content、标题、说明、右上关闭按钮、actions 区、滚动内容区、固定 footer。
- 操作：按 Escape 触发 `onRequestClose("escape")`；点击遮罩外区域触发 `outside`；点击右上关闭按钮触发 `closeButton`；点击 footer 内显式关闭控件时由组件提供的关闭入口触发 `footerAction`。

### `src/components/feedback-overlay/dialog.tsx`

导出：

- `SconeDialog`
- `SconeDialogProps`

`SconeDialogProps` 字段：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | 否 | 受控打开状态。 |
| `defaultOpen` | `boolean` | 否 | 非受控默认打开状态。 |
| `onOpenChange` | `(open: boolean) => void` | 否 | Radix open 状态变化。 |
| `onRequestClose` | `(reason: OverlayCloseReason) => void` | 否 | 用户请求关闭，不替调用方改变受控 `open`。 |
| `title` | `React.ReactNode` | 否 | 可见标题；无标题时必须提供 `ariaLabel`。 |
| `description` | `React.ReactNode` | 否 | Dialog 说明。 |
| `children` | `React.ReactNode` | 否 | Dialog 主内容。 |
| `footer` | `React.ReactNode` | 否 | 底部区域。 |
| `widthPreset` | `"sm" \| "md" \| "lg"` | 否 | 宽度预设。 |
| `ariaLabel` | `string` | 否 | 无可见标题时的可访问名称。 |
| `className` | `string` | 否 | content 样式。 |

前端控件和操作：

- 控件：遮罩、content、标题、说明、右上关闭按钮、内容区、footer。
- 操作：按 Escape 触发 `onRequestClose("escape")`；点击遮罩外区域触发 `outside`；点击右上关闭按钮触发 `closeButton`；点击 footer 内显式关闭控件时由组件提供的关闭入口触发 `footerAction`。

### `src/components/feedback-overlay/confirm.tsx`

导出：

- `SconeConfirm`
- `SconeConfirmProps`

`SconeConfirmProps` 字段：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | 否 | 受控打开状态。 |
| `defaultOpen` | `boolean` | 否 | 非受控默认打开状态。 |
| `onOpenChange` | `(open: boolean) => void` | 否 | 打开状态变化。 |
| `title` | `React.ReactNode` | 是 | 确认标题。 |
| `description` | `React.ReactNode` | 否 | 影响说明；`destructive=true` 时必须可读。 |
| `onConfirm` | `() => void \| Promise<void>` | 否 | 确认回调。 |
| `onCancel` | `() => void` | 否 | 取消回调。 |
| `cancelText` | `React.ReactNode` | 否 | 取消按钮文案。 |
| `confirmText` | `React.ReactNode` | 否 | 确认按钮文案。 |
| `destructive` | `boolean` | 否 | 危险语义。 |
| `disabled` | `boolean` | 否 | 禁用确认按钮。 |
| `loading` | `boolean` | 否 | 外部受控提交中。 |
| `ariaLabel` | `string` | 否 | 无可见标题时的可访问名称。 |
| `className` | `string` | 否 | content 样式。 |

前端控件和操作：

- 控件：AlertDialog content、标题、说明、取消按钮、确认按钮。
- 操作：点击取消按钮调用 `onCancel` 并关闭；点击确认按钮调用 `onConfirm`；异步 `onConfirm` pending 期间确认按钮显示 loading 并防重复点击；按 Escape 或安全关闭遵循 AlertDialog 行为。

### `src/components/feedback-overlay/toast.tsx`

导出：

- `SconeToastProvider`
- `SconeToastProviderProps`
- `SconeToastItem`
- `ToastOptions`
- `ToastPosition`
- `ToastCloseReason`
- `ToastService`
- `toast`

类型字段：

| 类型 | 字段 |
| --- | --- |
| `ToastPosition` | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` |
| `ToastCloseReason` | `"timeout" \| "closeButton" \| "programmatic"` |
| `ToastOptions` | `id?: string`、`title?: React.ReactNode`、`description?: React.ReactNode`、`tone?: SconeTone`、`duration?: number`、`action?: React.ReactNode`、`onAction?: (id: string) => void`、`onDismiss?: (id: string, reason: ToastCloseReason) => void` |
| `SconeToastItem` | 继承 `ToastOptions`，并将 `id` 固定为必填 `string` |
| `SconeToastProviderProps` | `children: React.ReactNode`、`position?: ToastPosition`、`duration?: number`、`maxVisible?: number`、`onOpenChange?: (items: SconeToastItem[]) => void` |
| `ToastService` | `show(options: ToastOptions): string`、`success(options: ToastOptions): string`、`error(options: ToastOptions): string`、`update(id: string, options: Partial<ToastOptions>): void`、`dismiss(id: string, reason?: ToastCloseReason): void`、`clear(): void` |

前端控件和操作：

- 控件：Provider viewport、toast item、标题、说明、action 控件、关闭按钮。
- 操作：调用 `toast.show/success/error` 入队；调用 `toast.update` 更新指定 id；点击 action 调用 `onAction(id)`；点击关闭按钮触发 `onDismiss(id, "closeButton")`；超时关闭触发 `timeout`；程序关闭触发 `programmatic`。

### `src/components/feedback-overlay/notification.tsx`

导出：

- `SconeNotificationProvider`
- `SconeNotificationProviderProps`
- `SconeNotificationItem`
- `NotificationOptions`
- `NotificationPlacement`
- `NotificationCloseReason`
- `NotificationService`
- `notification`

类型字段：

| 类型 | 字段 |
| --- | --- |
| `NotificationPlacement` | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` |
| `NotificationCloseReason` | `"closeButton" \| "programmatic"` |
| `NotificationOptions` | `id?: string`、`title: React.ReactNode`、`description?: React.ReactNode`、`tone?: SconeTone`、`time?: React.ReactNode`、`persistent?: boolean`、`action?: React.ReactNode`、`onAction?: (id: string) => void`、`onClose?: (id: string, reason: NotificationCloseReason) => void` |
| `SconeNotificationItem` | 继承 `NotificationOptions`，并将 `id` 固定为必填 `string` |
| `SconeNotificationProviderProps` | `children: React.ReactNode`、`placement?: NotificationPlacement`、`maxVisible?: number`、`onOpenChange?: (items: SconeNotificationItem[]) => void` |
| `NotificationService` | `open(options: NotificationOptions): string`、`update(id: string, options: Partial<NotificationOptions>): void`、`close(id: string, reason?: NotificationCloseReason): void`、`clear(): void` |

前端控件和操作：

- 控件：Provider viewport、notification item、标题、说明、时间、action 控件、关闭按钮。
- 操作：调用 `notification.open` 入队；调用 `notification.update` 更新指定 id；点击 action 调用 `onAction(id)`；点击关闭按钮触发 `onClose(id, "closeButton")`；程序关闭触发 `programmatic`；`persistent=true` 不自动关闭。

## Task Breakdown

### Task 1: 状态反馈组件

目标文件 4 个：

- `src/components/feedback-overlay/alert.tsx`
- `src/components/feedback-overlay/empty.tsx`
- `src/components/feedback-overlay/loading.tsx`
- `src/components/feedback-overlay/progress.tsx`

测试文件 4 个：

- `src/components/feedback-overlay/alert.test.tsx`
- `src/components/feedback-overlay/empty.test.tsx`
- `src/components/feedback-overlay/loading.test.tsx`
- `src/components/feedback-overlay/progress.test.tsx`

验收点：

- `SconeAlert` 渲染 tone、icon、title、description、action，错误说明可读。
- `SconeEmpty` 渲染 image、title、description、action，action 可点击。
- `SconeLoading` 在 `loading=true` 时设置 `aria-busy`，`type="spinner"` 和 `type="skeleton"` 都可验证。
- `SconeProgress` 设置可量化进度语义，`value/max/status/showLabel/label` 都可验证。

### Task 2: 阻断浮层组件

目标文件 3 个：

- `src/components/feedback-overlay/drawer.tsx`
- `src/components/feedback-overlay/dialog.tsx`
- `src/components/feedback-overlay/confirm.tsx`

测试文件 3 个：

- `src/components/feedback-overlay/drawer.test.tsx`
- `src/components/feedback-overlay/dialog.test.tsx`
- `src/components/feedback-overlay/confirm.test.tsx`

验收点：

- `SconeDrawer` 和 `SconeDialog` 保留 focus trap、focus restore、Escape 和 outside interaction。
- `SconeDrawer` 和 `SconeDialog` 的关闭按钮、Escape、outside、footer 显式关闭入口分别触发 `closeButton`、`escape`、`outside`、`footerAction`。
- `SconeDrawer` 长内容有明确滚动内容区，footer 固定。
- `SconeConfirm` 默认焦点落在取消或安全动作上。
- `SconeConfirm` 的 `destructive=true` 必须有可读 `description`。
- `SconeConfirm` 异步 `onConfirm` pending 期间防止重复调用。

### Task 3: 队列反馈 service

目标文件 2 个：

- `src/components/feedback-overlay/toast.tsx`
- `src/components/feedback-overlay/notification.tsx`

测试文件 2 个：

- `src/components/feedback-overlay/toast.test.tsx`
- `src/components/feedback-overlay/notification.test.tsx`

验收点：

- `toast.show/success/error` 返回稳定 id，`toast.update` 只更新指定 id，`toast.dismiss` 和 `toast.clear` 可验证。
- Toast 点击 action 调用 `onAction(id)`，点击关闭按钮、超时和程序关闭分别回传 `closeButton`、`timeout`、`programmatic`。
- `notification.open` 返回稳定 id，`notification.update` 只更新指定 id，`notification.close` 和 `notification.clear` 可验证。
- Notification 点击 action 调用 `onAction(id)`，点击关闭按钮和程序关闭分别回传 `closeButton`、`programmatic`。
- `maxVisible`、`position`、`placement` 不改变队列数据结构，只影响 viewport 展示。

### Task 4: 公共导出和类型回归

目标文件 2 个：

- `src/index.ts`
- `src/index.test.ts`

验收点：

- `src/index.ts` 导出 9 个组件、2 个 Provider、2 个 service 和上述公共类型。
- `src/index.ts` 不导出内部 helper、内部 store、内部 id 生成器。
- `src/index.test.ts` 覆盖导出类型，不新增第二套 `SconeTone`、`SconeStatus` 或 `OverlayCloseReason`。

## Verification

组件族相关测试：

```bash
pnpm test src/components/feedback-overlay src/index.test.ts
```

foundation 类型回归：

```bash
pnpm test src/types/foundation.test.ts
```

全量收口验证：

```bash
pnpm test
```

人工检查重点：

- 所有新增 public props 都能在目标文件或 `src/index.ts` 中找到唯一导出来源。
- Drawer/Dialog/Confirm 不把 Radix 内部事件名暴露为公共 API。
- Toast/Notification 的 close reason 不复用 `OverlayCloseReason`。
- Alert/Empty/Loading/Progress 不只靠颜色表达状态。
- 每个大任务只触碰列出的目标文件和测试文件；如确需改其他文件，先说明原因。

## Closure

任务完成后删除本 RUNBOOK。若执行过程中产生仍有长期价值的验证证据，迁移到 `docs/40-readiness/`；若产生稳定协作规则，迁移到 `docs/00-governance/` 后再删除本 RUNBOOK。
