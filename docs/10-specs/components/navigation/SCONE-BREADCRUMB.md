# SconeBreadcrumb

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

层级位置导航，用于 PageHeader 或详情页上方。

| Prop          | 类型                                  | 说明         |
| ------------- | ------------------------------------- | ------------ |
| `items`       | `SconeBreadcrumbItem[]`               | 路径项。     |
| `separator`   | `ReactNode`                           | 分隔符。     |
| `maxItems`    | `number`                              | 折叠阈值。   |
| `onItemClick` | `(item: SconeBreadcrumbItem) => void` | 点击路径项。 |
| `ariaLabel`   | `string`                              | 可访问名称。 |
| `className`   | `string`                              | 样式。       |

## Usage

- 多层页面位置提示使用 Breadcrumb。
- 主导航、权限菜单和路由匹配不放进 Breadcrumb。

## Rules

- Breadcrumb 表达当前位置路径，不替代主导航。
- 最后一项表示当前页，默认不可点击并设置 `aria-current="page"`。
- item 可通过 `asChild` 组合路由链接。
- shadcn mapping：基于 Breadcrumb 样式调整。

测试：

- 当前页语义、链接项、折叠项和分隔符可查询。
