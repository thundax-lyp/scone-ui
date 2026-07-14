# SconeCollapsible

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

单个区域的展开收起。

| Prop                   | 类型                      | 说明       |
| ---------------------- | ------------------------- | ---------- |
| `open` / `defaultOpen` | `boolean`                 | 展开状态。 |
| `onOpenChange`         | `(open: boolean) => void` | 状态变化。 |
| `trigger`              | `ReactNode`               | 触发器。   |
| `children`             | `ReactNode`               | 内容。     |
| `className`            | `string`                  | 样式。     |

## Usage

- 筛选更多项、详情补充信息或高级设置使用 Collapsible。
- 多个同类区域使用 Accordion。

## Rules

- 用于筛选更多项、详情补充信息或高级设置。
- trigger 必须有可访问名称，并暴露 expanded 状态。
- 不承载复杂异步生命周期；内容加载由调用方控制。

测试：

- trigger 的 expanded 状态、键盘切换和受控状态可验证。
