# Page

## Metadata

| Field     | Value                                                 |
| --------- | ----------------------------------------------------- |
| Status    | Ready                                                 |
| Layer     | Admin Pattern                                         |
| Authority | [`ADMIN-PATTERNS-SPEC.md`](../ADMIN-PATTERNS-SPEC.md) |

Pattern 的层级、导出和组合边界以 [`ADMIN-UI-SPEC.md`](../ADMIN-UI-SPEC.md) 与 [`COMPONENT-SELECTION.md`](../COMPONENT-SELECTION.md) 为准。

Export status: Admin Pattern export. 可导出 `Page` compound parts，命名可为 `SconePage` 或命名空间 `Page`，但 slot 结构必须保持稳定。

## Anatomy

- `Page.Root`: 页面根区域，建立宽度、滚动上下文和垂直 rhythm。默认渲染为 `main` 或由 App Shell 的 `main` 包裹时渲染为 `div`。
- `Page.Header`: 标题、description、breadcrumb/eyebrow 和 `actions`。默认在内容滚动区域顶部，不默认 sticky。
- `Page.Content`: 页面主体，承载 Section、DataTable、Form 或 Detail；这是页面主滚动容器。
- `Page.StickyActions`: 可选底部吸附操作区，绑定到 `Page.Content` 滚动上下文。

## Props And Slots

| Part                 | 关键 props                                                 | 说明                                                          |
| -------------------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| `Page.Root`          | `maxWidth`、`density`、`className`                         | `maxWidth` 使用 preset：`narrow`、`content`、`wide`、`full`。 |
| `Page.Header`        | `title`、`description`、`breadcrumb`、`actions`、`eyebrow` | `actions` 只放页面级动作。                                    |
| `Page.Content`       | `children`、`className`                                    | 唯一页面主滚动容器。                                          |
| `Page.StickyActions` | `children`、`position`                                     | `position` 默认 `bottom`，不承载提交逻辑。                    |

## Rules

- Page 不内置数据请求、权限判断或路由。
- `PageHeader.actions` 放页面级主操作，Table 批量操作不放这里。
- `PageContent` 是页面主滚动容器；不要再包页面级 `SconeScrollArea`。
- `Page.Root` 与父级 App Shell 必须形成可收缩区域，默认等价于 `min-height: 0`；`Page.Content` 才设置 overflow。
- 页面 section 间距使用 Foundation `SconeSpacingToken`。
- 宽屏内容默认受 `maxWidth` recipe 控制；数据管理页可使用 full width。
- `maxWidth` 不接受任意 number 作为主 API；特殊页面用 `className` 局部覆盖。
- `Page.StickyActions` 必须给 `Page.Content` 留出底部 padding，避免遮挡最后一个字段。
- 不适用场景：全局导航框架使用 App Shell recipe；Card 内局部布局使用 Stack/Section，不嵌套 Page。
