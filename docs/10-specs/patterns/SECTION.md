# Section

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Admin Pattern |
| Authority | [`ADMIN-PATTERNS-SPEC.md`](../ADMIN-PATTERNS-SPEC.md) |

Pattern 的层级、导出和组合边界以 [`ADMIN-UI-SPEC.md`](../ADMIN-UI-SPEC.md) 与 [`COMPONENT-SELECTION.md`](../COMPONENT-SELECTION.md) 为准。

Export status: Admin Pattern export. Section 是页面结构分段，不是 Card 变体。

Section 是无装饰结构分段，用于表单区块、详情分区、设置分组和数据区域。

## Anatomy

- `Section.Root`：语义分区，默认渲染 `section`。
- `Section.Header`：可选标题、description 和 `actions`。
- `Section.Content`：分区内容。
- `Section.Footer`：可选底部说明或局部动作。

## Props

| Part              | 关键 props                                                | 说明                                     |
| ----------------- | --------------------------------------------------------- | ---------------------------------------- |
| `Section.Root`    | `title`、`description`、`actions`、`density`、`className` | shorthand props 自动生成 Header。        |
| `Section.Header`  | `title`、`description`、`actions`                         | Header 内 actions 是分区级，不是页面级。 |
| `Section.Content` | `children`                                                | 不建立新的主滚动。                       |
| `Section.Footer`  | `children`                                                | 只放分区说明或局部操作。                 |

使用 Section：

- 需要标题、说明和内容分组，但不需要视觉卡片边框。
- 页面中已有背景或分割线，不希望卡片套卡片。
- 需要在窄屏保持自然流式布局。

使用 Card：

- 需要独立视觉容器。
- 内容来自可复用模块，例如指标卡、摘要卡、对象卡片。
- 需要 loading skeleton 覆盖局部容器。

## Panel Boundary

- 当前 SPEC 不保留独立 `Panel` 组件。历史或产品侧 Panel 应按语义迁移为 Section、Card、Drawer 或 Popover。
- 如果 Panel 只是视觉盒子，使用 Card；如果 Panel 是页面结构分段，使用 Section；如果 Panel 是侧向任务容器，使用 Drawer。

## Rules

- Section 不增加边框、阴影或背景层级；视觉容器使用 Card。
- Section 可以包含 Card 列表；Card 不应再包多个 Section 模拟页面。
- 表单语境下 `SconeFormSection` 是 Section 的 helper/shorthand，slot 规则与 Section 对齐。
