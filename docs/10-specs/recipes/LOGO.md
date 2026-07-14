# Logo Recipe

## Metadata

| Field     | Value                       |
| --------- | --------------------------- |
| Status    | Ready Boundary              |
| Layer     | Recipe                      |
| Authority | [`README.md`](../README.md) |

Recipe 不导出独立 `Scone*` 组件；按本文档组合底层组件并验证边界。

Logo 是产品身份 recipe，不作为 `SconeLogo` 通用组件导出。

Recipe API：

| 字段        | 类型        | 说明           |
| ----------- | ----------- | -------------- |
| `mark`      | `ReactNode` | 图形标识。     |
| `label`     | `ReactNode` | 产品名称。     |
| `href`      | `string`    | 可选跳转地址。 |
| `children`  | `ReactNode` | 自定义内容。   |
| `className` | `string`    | 样式。         |

## Usage

- App Shell 的 brand slot 中组合产品 logo、名称和跳转。
- 不导出 `SconeLogo`，避免把产品身份写入通用库。

## Rules

- 产品名、品牌图形和跳转目标由产品侧决定。
- 如需统一布局，在 App Shell recipe 中提供 brand slot。
