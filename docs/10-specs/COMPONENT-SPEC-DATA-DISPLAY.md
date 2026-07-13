# Data Display Component Spec

## Scope

本规格覆盖 admin-ui 基础数据展示组件。来源统计显示详情、表格、卡片、标签和列表高频出现，但组件库只抽象基础展示能力，不绑定业务数据模型。

## Source Signals

- 详情展示使用 248 处，是最高频展示形态。
- 卡片使用 96 处，说明分组容器需要稳定。
- 表格及封装表格合计 46 处，说明数据网格和操作列需要抽象。
- 标签、徽标、列表、富文本和统计类控件是常见辅助展示。

## Components

### SconeDescriptions

键值详情展示组件。

| Prop        | 类型                        | 说明         |
| ----------- | --------------------------- | ------------ |
| `title`     | `ReactNode`                 | 区块标题     |
| `items`     | `SconeDescriptionItem[]`    | 展示项       |
| `columns`   | `number \| ResponsiveValue` | 列数         |
| `bordered`  | `boolean`                   | 是否展示边框 |
| `size`      | `"sm" \| "md"`              | 尺寸         |
| `className` | `string`                    | 样式         |

规则：

- 优先使用 `items` API，减少重复 JSX。
- `label` 必须是可读文本，不直接展示后端字段名。
- 长文本必须允许换行。

### SconeTable

基础数据表格。

| Prop           | 类型                             | 说明           |
| -------------- | -------------------------------- | -------------- |
| `ariaLabel`    | `string`                         | 表格可访问名称 |
| `columns`      | `SconeTableColumn<T>[]`          | 列定义         |
| `dataSource`   | `T[]`                            | 数据源         |
| `rowKey`       | `string \| ((record: T) => Key)` | 行 key         |
| `rowSelection` | `SconeRowSelection<T>`           | 选择配置       |
| `pagination`   | `SconePagination`                | 分页           |
| `loading`      | `boolean`                        | 加载状态       |
| `empty`        | `ReactNode`                      | 空状态         |
| `scroll`       | `SconeTableScroll`               | 滚动配置       |
| `size`         | `"sm" \| "md"`                   | 尺寸           |
| `onChange`     | `function`                       | 表格变更       |
| `onRow`        | `function`                       | 行事件         |
| `className`    | `string`                         | 样式           |

规则：

- 表格必须有稳定可访问名称。
- 基础表格不内置请求、筛选、权限或业务操作。
- 操作列只提供列定义能力，不规定业务动作集合。

### SconeCard

分组展示容器。

| Prop          | 类型                                | 说明     |
| ------------- | ----------------------------------- | -------- |
| `title`       | `ReactNode`                         | 标题     |
| `description` | `ReactNode`                         | 说明     |
| `extra`       | `ReactNode`                         | 辅助操作 |
| `loading`     | `boolean`                           | 加载     |
| `variant`     | `"plain" \| "outlined" \| "filled"` | 视觉变体 |
| `children`    | `ReactNode`                         | 内容     |
| `className`   | `string`                            | 样式     |

规则：

- `Card` 不作为整页布局默认单位。
- `plain` 用于无边框分组。

### SconeTag

标签组件，用于状态、类型和枚举展示。

| Prop        | 类型                                                        | 说明   |
| ----------- | ----------------------------------------------------------- | ------ |
| `tone`      | `"default" \| "info" \| "success" \| "warning" \| "danger"` | 语义色 |
| `children`  | `ReactNode`                                                 | 文本   |
| `className` | `string`                                                    | 样式   |

规则：

- 业务枚举到 `tone` 的映射由调用方处理。
- 不只依赖颜色表达状态。

### SconeBadge

计数、状态点和轻量状态提示。

建议能力：

- `count`
- `dot`
- `tone`
- `children`
- `className`

### SconeList

基础列表展示。

| Prop         | 类型                     | 说明   |
| ------------ | ------------------------ | ------ |
| `dataSource` | `T[]`                    | 数据源 |
| `renderItem` | `(item: T) => ReactNode` | 项渲染 |
| `loading`    | `boolean`                | 加载   |
| `empty`      | `ReactNode`              | 空状态 |
| `bordered`   | `boolean`                | 边框   |
| `className`  | `string`                 | 样式   |

### SconeTypography

文本、标题、段落的基础排版能力。

建议导出：

- `SconeText`
- `SconeTitle`
- `SconeParagraph`

规则：

- 保持可读对比度。
- 不内置业务文案样式。

### SconeRichContent

富文本或 Markdown 展示。

| Prop        | 类型                             | 说明 |
| ----------- | -------------------------------- | ---- |
| `content`   | `string`                         | 内容 |
| `format`    | `"text" \| "markdown" \| "html"` | 格式 |
| `className` | `string`                         | 样式 |

规则：

- `html` 渲染必须由调用方或组件内部明确处理安全策略。
- Markdown 样式不能影响外层布局。

### SconeStatistic

指标展示 primitive。

建议能力：

- `title`
- `value`
- `prefix`
- `suffix`
- `className`

### SconeTimeline

时间线展示 primitive。

规则：

- 只处理时间线结构和展示，不处理审计业务语义。
