# Foundation And Public API Runbook

## Purpose

完成 Foundation + Public API 的首个可验收闭环：建立 theme 变量源、公共 Foundation 类型、组件库基础工具函数和库级导出面，并用测试锁定这些公共契约。

## Scope

本次闭环只覆盖以下目标文件：

- `src/styles/theme.css`
- `src/styles.css`
- `src/types/foundation.ts`
- `src/lib/cn.ts`
- `src/lib/utils.ts`
- `src/lib/compose-refs.ts`
- `src/lib/use-controllable-state.ts`
- `src/lib/aria.ts`
- `src/index.ts`

本次闭环必须补齐对应验收测试：

- `src/types/foundation.test.ts`
- `src/lib/cn.test.ts`
- `src/lib/compose-refs.test.tsx`
- `src/lib/use-controllable-state.test.tsx`
- `src/lib/aria.test.ts`
- `src/index.test.ts`

如 `src/styles/theme.css` 需要静态约束，优先纳入 `src/index.test.ts` 或新增明确命名的 theme 静态测试，测试目标必须是公共契约，不测试实现细节。

本次闭环允许按需新增以下测试文件：

- `src/styles/theme.test.ts`

仅当需要精确验证 `src/styles/theme.css` 的变量前缀、token family 覆盖和无第二数值源时才新增该文件。

## Non-goals

- 不实现具体 `Scone*` 组件、Pattern 或 Recipe。
- 不创建 `src/recipes/`。
- 不迁移产品应用级 UI 规则。
- 不引入 dark theme。
- 不创建第二套 token 数值源，例如 `tokens.ts`。
- 不在本闭环中重排现有 shadcn 组件目录。
- 不批量迁移现有组件的 import 路径；`src/lib/utils.ts` 只作为兼容入口转发 `cn`。
- 不预导出尚未实现的 `Scone*` 组件、Pattern、Provider 或 service。

## Plan

### Task 1: Theme Variable Source

相关文件：

- `src/styles/theme.css`
- `src/styles.css`
- `src/styles/theme.test.ts`

目标：

- 新增 `src/styles/theme.css`，作为 Foundation token 的唯一数值源。
- 在 `src/styles.css` 中引入 `src/styles/theme.css`。
- 如新增 `src/styles/theme.test.ts`，只验证变量命名、family 覆盖和无第二套 token 数值源。

CSS variables 必须使用 `--scone-*` 前缀，最小字段如下：

- Color：`--scone-color-background`、`--scone-color-foreground`、`--scone-color-muted`、`--scone-color-muted-foreground`、`--scone-color-border`、`--scone-color-ring`、`--scone-color-primary`、`--scone-color-primary-foreground`、`--scone-color-neutral`、`--scone-color-info`、`--scone-color-success`、`--scone-color-warning`、`--scone-color-danger`
- Spacing：`--scone-spacing-2xs`、`--scone-spacing-xs`、`--scone-spacing-sm`、`--scone-spacing-md`、`--scone-spacing-lg`、`--scone-spacing-xl`
- Radius：`--scone-radius-sm`、`--scone-radius-md`、`--scone-radius-lg`、`--scone-radius-full`
- Shadow：`--scone-shadow-sm`、`--scone-shadow-md`、`--scone-shadow-lg`
- Typography：`--scone-font-body`、`--scone-font-label`、`--scone-font-title`、`--scone-font-mono`
- Focus：`--scone-focus-ring`、`--scone-focus-ring-offset`
- Motion：`--scone-duration-fast`、`--scone-duration-default`、`--scone-easing-standard`
- Z-index：`--scone-z-sticky`、`--scone-z-dropdown`、`--scone-z-popover`、`--scone-z-drawer`、`--scone-z-modal`、`--scone-z-toast`
- Control：`--scone-control-height-sm`、`--scone-control-height-md`、`--scone-control-height-lg`、`--scone-icon-size-sm`、`--scone-icon-size-md`、`--scone-icon-size-lg`、`--scone-hit-area-min`
- Layout preset：`--scone-page-width-narrow`、`--scone-page-width-content`、`--scone-page-width-wide`、`--scone-page-width-full`、`--scone-drawer-width-sm`、`--scone-drawer-width-md`、`--scone-drawer-width-lg`、`--scone-drawer-width-full`

前端验收说明：

- 本任务不新增可见页面、控件或用户操作。
- 后续控件只能通过语义 class 或 CSS variables 消费 token，不在控件实现中写死 hex、shadow、radius、z-index 或 spacing 数值。

### Task 2: Foundation Types

相关文件：

- `src/types/foundation.ts`
- `src/types/foundation.test.ts`
- `src/index.ts`
- `src/index.test.ts`

目标：

- 在 `src/types/foundation.ts` 定义公共 Foundation 类型。
- 在 `src/index.ts` 导出这些公共类型。
- 用 `src/types/foundation.test.ts` 和 `src/index.test.ts` 锁定类型和导出面。

数据结构必须精确到以下字段：

```ts
export type Key = string | number;

export type Breakpoint = "sm" | "md" | "lg" | "xl";

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

export type SconeTone = "neutral" | "info" | "success" | "warning" | "danger";

export type SconeSpacingToken = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type SconeControlSize = "sm" | "md" | "lg";

export type SconeDensity = "compact" | "default" | "comfortable";

export type SconeOrientation = "horizontal" | "vertical";

export type SconeAlign = "start" | "center" | "end";

export type SconeSide = "top" | "right" | "bottom" | "left";

export type SconeStatus = "idle" | "active" | "success" | "error";

export type OverlayCloseReason =
    | "escape"
    | "outside"
    | "closeButton"
    | "footerAction"
    | "programmatic";

export interface SconeOption<Value = string> {
    value: Value;
    label: React.ReactNode;
    disabled?: boolean;
    description?: React.ReactNode;
}

export interface SconeBaseItem {
    key: Key;
    label: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    description?: React.ReactNode;
}
```

前端验收说明：

- 本任务不新增可见页面、控件或用户操作。
- `SconeControlSize` 只服务 Button、Input、Select 等控件高度。
- `SconeDensity` 只服务 Table、List、Descriptions、Toolbar 等信息密度。
- `OverlayCloseReason` 后续只表达 Drawer、Dialog、Confirm 的关闭来源，不表达业务取消原因。

### Task 3: Utility Functions

相关文件：

- `src/lib/cn.ts`
- `src/lib/utils.ts`
- `src/lib/compose-refs.ts`
- `src/lib/use-controllable-state.ts`
- `src/lib/aria.ts`
- `src/lib/cn.test.ts`
- `src/lib/compose-refs.test.tsx`
- `src/lib/use-controllable-state.test.tsx`
- `src/lib/aria.test.ts`

目标：

- 将 className 合并能力收敛到 `src/lib/cn.ts`。
- `src/lib/utils.ts` 保留兼容入口，只 re-export `cn`。
- 新增 `composeRefs`、`useControllableState` 和基础 ARIA helper。

工具函数 API 必须精确到以下输入输出边界：

- `cn(...inputs: ClassValue[]): string`：接受 `clsx` 支持的字符串、数组、对象、falsey 值，并通过 `tailwind-merge` 处理 Tailwind 冲突 class。
- `composeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T>`：同步写入 callback ref 与 object ref；节点变为 `null` 时同步清理。
- `useControllableState<T>(options)`：`options.value?: T`、`options.defaultValue?: T | (() => T)`、`options.onValueChange?: (value: T) => void`；返回 `[value: T | undefined, setValue: (next: T | ((previous: T | undefined) => T)) => void]`。
- `aria` helper 只覆盖基础字段：id 合并、`aria-describedby` 合并、ARIA boolean 属性和值存在性判断；不包含 Field/Form 专属状态机。

前端验收说明：

- `composeRefs` 后续用于所有支持 `ref` 的控件根节点。
- `useControllableState` 后续用于 Select、Tabs、Dialog、Drawer、Switch、Checkbox 等受控/非受控控件；用户操作颗粒度是点击、键盘切换、打开/关闭和值变化。
- `aria` helper 后续用于 label、description、message 与控件的 id 关联；用户操作颗粒度是聚焦控件、读屏读取描述、错误状态更新。

### Task 4: Public API Boundary

相关文件：

- `src/index.ts`
- `src/index.test.ts`
- `src/types/foundation.ts`
- `src/lib/cn.ts`
- `src/lib/compose-refs.ts`
- `src/lib/use-controllable-state.ts`
- `src/lib/aria.ts`

目标：

- `src/index.ts` 只导出 Task 2 和 Task 3 已实现且承诺稳定的公共类型与工具函数。
- 不导出私有 helper、测试 fixture、未实现组件、Pattern、Provider、service 或 docs-only Recipe。
- `src/index.test.ts` 必须精确断言本阶段导出名称清单。

本阶段公共导出清单：

- 类型：`Key`、`Breakpoint`、`ResponsiveValue`、`SconeTone`、`SconeSpacingToken`、`SconeControlSize`、`SconeDensity`、`SconeOrientation`、`SconeAlign`、`SconeSide`、`SconeStatus`、`OverlayCloseReason`、`SconeOption`、`SconeBaseItem`
- 工具：`cn`、`composeRefs`、`useControllableState`
- ARIA helper：按 `src/lib/aria.ts` 实际命名导出，导出前必须在 `src/lib/aria.test.ts` 固定行为。

前端验收说明：

- 本任务不新增可见页面、控件或用户操作。
- 导出面是后续前端控件接入的唯一公共入口；组件实现不得让调用方依赖 `src/lib/*` 的私有路径。

## Verification

执行以下最小验证：

```sh
pnpm typecheck
pnpm test
pnpm lint
```

必须覆盖的验收点：

- `src/styles/theme.css` 是唯一 token 数值源，CSS variables 使用 `--scone-*` 前缀。
- `ResponsiveValue<T>` 不接受数组形态。
- `SconeOption<Value = string>` 保持默认泛型。
- `OverlayCloseReason` 与 Foundation 设计定义一致。
- `cn` 合并条件 class、数组对象输入和 Tailwind 冲突 class。
- `composeRefs` 同步写入 callback ref 与 object ref，并在卸载清理时传播 `null`。
- `useControllableState` 在受控与非受控模式下都只通过约定回调上报值变化。
- `aria` helper 不生成无效 ARIA 属性，并能稳定合并描述 id。
- `src/index.ts` 只公开 Foundation 类型与公共工具，不公开私有 helper、组件内部实现或 Recipe。

## Closure

任务关闭前删除本 RUNBOOK。若本次闭环产生仍需长期保留的验证证据，将证据沉淀到 `docs/40-readiness/` 下的 readiness 文档后再删除 RUNBOOK。
