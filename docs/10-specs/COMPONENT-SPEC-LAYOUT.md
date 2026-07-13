# Layout Component Spec

## Scope

本规格覆盖 admin-ui 基础布局 primitives。来源统计显示空间布局、页面标题区、筛选区和操作区重复出现，但基础组件库不直接沉淀完整业务页面模板。

## Source Signals

- 空间布局类使用约 196 处，说明间距、排列和紧凑组合是首要基础能力。
- 页面头部、列表页、筛选面板、批量操作条在源项目中重复出现，说明需要工具栏、面板和组合容器 primitives。
- `Row` / `Col` / `Layout` / `Splitter` 说明仍需要基础网格和分割布局。

## Components

### SconeStack

垂直间距容器。

| Prop                  | 类型                                        | 说明       |
| --------------------- | ------------------------------------------- | ---------- |
| `gap`                 | `"xs" \| "sm" \| "md" \| "lg" \| number`    | 子项间距   |
| `align`               | `"start" \| "center" \| "end" \| "stretch"` | 交叉轴对齐 |
| `children`            | `ReactNode`                                 | 子项       |
| `className` / `style` | 通用                                        | 样式       |

规则：

- 默认只处理布局，不处理业务状态。
- 不改变子项语义。

### SconeInline

水平排列容器，用于操作按钮、短字段、标签组和行内布局。

| Prop                  | 类型                                         | 说明     |
| --------------------- | -------------------------------------------- | -------- |
| `gap`                 | `"xs" \| "sm" \| "md" \| "lg" \| number`     | 子项间距 |
| `align`               | `"start" \| "center" \| "end" \| "baseline"` | 对齐     |
| `wrap`                | `boolean`                                    | 是否换行 |
| `split`               | `ReactNode`                                  | 分隔符   |
| `children`            | `ReactNode`                                  | 子项     |
| `className` / `style` | 通用                                         | 样式     |

### SconeCompact

紧凑组合容器，用于按钮组、输入组合和表格行操作。

规则：

- 默认水平排列。
- 子项之间不添加业务文案。
- 必须支持 `className`。

### SconeToolbar

操作区布局 primitive。

| Prop        | 类型        | 说明       |
| ----------- | ----------- | ---------- |
| `start`     | `ReactNode` | 左侧内容   |
| `end`       | `ReactNode` | 右侧内容   |
| `children`  | `ReactNode` | 自定义内容 |
| `className` | `string`    | 样式       |

规则：

- 只处理操作区布局，不判断选中状态、不处理权限。
- 批量操作、页级操作、筛选触发都可以通过 `start` / `end` 组合。

### SconePanel

通用内容容器，用于分组、设置区、详情块和表单块。

| Prop          | 类型                                | 说明     |
| ------------- | ----------------------------------- | -------- |
| `title`       | `ReactNode`                         | 标题     |
| `description` | `ReactNode`                         | 说明     |
| `actions`     | `ReactNode`                         | 操作     |
| `children`    | `ReactNode`                         | 内容     |
| `variant`     | `"plain" \| "outlined" \| "filled"` | 视觉变体 |
| `className`   | `string`                            | 样式     |

规则：

- `Panel` 是容器 primitive，不是页面模板。
- 不嵌套多个装饰性 `Panel` 制造层级。

### SconeSplitPane

分割布局，用于左右栏、主从视图和可调整区域。

| Prop          | 类型                         | 说明     |
| ------------- | ---------------------------- | -------- |
| `orientation` | `"horizontal" \| "vertical"` | 分割方向 |
| `defaultSize` | `number \| string`           | 默认尺寸 |
| `min` / `max` | `number \| string`           | 尺寸约束 |
| `children`    | `ReactNode`                  | 面板     |
| `className`   | `string`                     | 样式     |

## Deferred Patterns

以下内容来自源项目高频组合，但不作为首批基础组件：

- `PageShell`
- `ListPage`
- `FilterPanel`
- `BatchActionBar`

这些更接近页面 pattern。只有当多个项目复用同一组合，且 API 能保持业务中性时，才进入组件库。
