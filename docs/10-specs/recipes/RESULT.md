# Result Recipe

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready Boundary |
| Layer | Recipe |
| Authority | [`README.md`](../README.md) |

Recipe 不导出独立 `Scone*` 组件；按本文档组合底层组件并验证边界。

结果页或结果区块 recipe，用于提交成功、无权限、异常中断或流程完成。

Recipe API：

| 字段          | 类型            | 说明       |
| ------------- | --------------- | ---------- |
| `tone`        | SconeTone | 结果语义。 |
| `title`       | `ReactNode`     | 结果标题。 |
| `description` | `ReactNode`     | 结果说明。 |
| `icon`        | `ReactNode`     | 可选图标。 |
| `actions`     | `ReactNode`     | 操作区。   |
| `className`   | `string`        | 样式。     |

## Usage

- 用 Empty/Alert、Typography、Button 组合结果页。
- 产品侧决定返回、继续创建、查看详情等具体动作。

## Rules

- 默认由 Empty/Alert、Typography、Button 组合。
- 不作为独立组件导出，避免固定产品级结果页结构。
- 需要路由跳转、返回列表或继续创建时由产品侧组合 action。
