# SconeCard

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

可见分组展示容器，用于摘要卡、对象卡、指标卡和需要独立视觉边界的内容块。

| Prop          | 类型                                  | 说明           |
| ------------- | ------------------------------------- | -------------- |
| `title`       | `ReactNode`                           | 标题。         |
| `description` | `ReactNode`                           | 说明。         |
| `actions`     | `ReactNode`                           | 标题右侧操作。 |
| `footer`      | `ReactNode`                           | 底部区域。     |
| `loading`     | `boolean`                             | 局部加载。     |
| `variant`     | `"plain" \| "outlined" \| "elevated"` | 视觉容器变体。 |
| `children`    | `ReactNode`                           | 内容。         |
| `className`   | `string`                              | 样式。         |

## Usage

- 用于有独立视觉边界的内容块。
- 页面自然分段使用 Section Pattern，不用 Card 套出页面层级。

使用 Card：

- 内容需要独立视觉容器。
- 模块可被复用或移动。
- 局部 loading 需要覆盖容器内容。

不要使用 Card：

- 只是页面自然分段，使用 Section Pattern。
- 已经处在 Card 内部，避免卡片套卡片。
- 需要布局滚动或页面宽度控制，使用 Layout/Page 规则。
