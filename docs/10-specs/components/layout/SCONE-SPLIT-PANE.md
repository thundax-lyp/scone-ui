# SconeSplitPane

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Layout                                                   |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

分割布局，用于左右栏、主从视图和可调整区域。

| Prop                              | 类型                                       | 说明                                    |
| --------------------------------- | ------------------------------------------ | --------------------------------------- |
| `orientation`                     | `"horizontal" \| "vertical"`               | 分割方向。                              |
| `defaultSizePreset`               | `"narrow" \| "medium" \| "wide"`           | 默认主面板尺寸预设。                    |
| `sizePreset`                      | `"narrow" \| "medium" \| "wide" \| "fill"` | 受控主面板尺寸预设。                    |
| `onSizePresetChange`              | `(preset: string) => void`                 | 预设尺寸变化。                          |
| `minSizePreset` / `maxSizePreset` | `"narrow" \| "medium" \| "wide" \| "fill"` | 尺寸约束预设。                          |
| `defaultSize`                     | `string`                                   | 可选 CSS 长度覆盖，必须带单位或百分比。 |
| `size`                            | `string`                                   | 受控 CSS 长度覆盖，必须带单位或百分比。 |
| `onSizeChange`                    | `(size: string) => void`                   | 拖拽过程尺寸变化。                      |
| `onSizeCommit`                    | `(size: string) => void`                   | 拖拽结束提交尺寸。                      |
| `children`                        | `ReactNode`                                | 面板。                                  |
| `className`                       | `string`                                   | 样式。                                  |

## Usage

- 主从视图、左右栏编辑和可调整区域使用 SplitPane。
- 窄屏需要提供单列降级 recipe。

## Rules

- 默认使用 size preset；`defaultSize` 仅作为 CSS 长度覆盖，禁止无单位 number。
- 必须定义 min/max preset，避免窄屏不可用。
- 用于 MasterDetail 时，窄屏 recipe 应退化为单列导航。
- 不内置数据加载或选中项状态。
