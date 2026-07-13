# SconeAccordion

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

可展开内容组，用于设置分区、FAQ 类说明或低频详情折叠。

| Prop                     | 类型                                  | 说明         |
| ------------------------ | ------------------------------------- | ------------ |
| `type`                   | `"single" \| "multiple"`              | 展开模式。   |
| `value` / `defaultValue` | `string \| string[]`                  | 当前展开。   |
| `onValueChange`          | `(value: string \| string[]) => void` | 变化回调。   |
| `collapsible`            | `boolean`                             | 单项可收起。 |
| `items`                  | `SconeAccordionItem[]`                | 简单项。     |
| `className`              | `string`                              | 样式。       |

## Usage

- 多个相关内容区的展开收起使用 Accordion。
- 单个区域展开收起使用 Collapsible。

## Rules

- Accordion 用于多个相关区域的展开收起。
- 单个区域的展开收起使用 Collapsible。
- 不用于主导航；导航层级使用 Menu/Tree。
- shadcn mapping：基于 Accordion，保留键盘和 ARIA 行为。

测试：

- single/multiple 行为、键盘导航、expanded 状态和 content 关联可验证。
