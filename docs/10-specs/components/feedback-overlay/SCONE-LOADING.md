# SconeLoading

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

未知时长加载状态。

| Prop        | 类型                      | 说明             |
| ----------- | ------------------------- | ---------------- |
| `loading`   | `boolean`                 | 是否加载。       |
| `type`      | `"spinner" \| "skeleton"` | 加载表达方式。   |
| `size`      | `"sm" \| "md" \| "lg"`    | spinner 尺寸。   |
| `children`  | `ReactNode`               | 可被覆盖的内容。 |
| `className` | `string`                  | 样式。           |

## Usage

- 未知时长等待使用 Loading。
- 可量化任务进度使用 Progress。

## Rules

- 页面级初次加载优先 skeleton。
- 操作级加载优先 Button loading。
- 使用 `type`，不把 loading 表达方式混入 `variant`。
- 区域级 loading 设置 `aria-busy`。
