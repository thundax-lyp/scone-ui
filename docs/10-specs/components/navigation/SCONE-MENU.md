# SconeMenu

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

菜单结构，用于侧边栏、上下文导航或动作集合。

| Prop                                   | 类型                                               | 说明         |
| -------------------------------------- | -------------------------------------------------- | ------------ |
| `items`                                | `SconeNavigationItem[]`                            | 菜单项。     |
| `selectedKeys` / `defaultSelectedKeys` | `string[]`                                         | 当前选中项。 |
| `openKeys` / `defaultOpenKeys`         | `string[]`                                         | 展开分组。   |
| `onSelect`                             | `(key: string, item: SconeNavigationItem) => void` | 选择回调。   |
| `onOpenChange`                         | `(keys: string[]) => void`                         | 展开变化。   |
| `orientation`                          | `"vertical" \| "horizontal"`                       | 方向。       |
| `collapsed`                            | `boolean`                                          | 折叠展示。   |
| `className`                            | `string`                                           | 样式。       |

## Usage

- 侧栏、上下文导航和动作集合使用 Menu。
- 路由、权限过滤、菜单数据加载由产品侧提供。

## Rules

- Menu 只处理展示、选中、展开和键盘导航，不内置路由、权限或 URL 解析。
- 路由跳转通过调用方 link 或 `asChild` 组合。
- `selectedKeys` 表达 UI 选中，不等同权限或当前 URL 解析。
- 基座使用自研 menu/list navigation 模型或 Radix Navigation Menu parts，但对外 API 固定为本节字段。

测试：

- selected/open 状态可控；键盘可导航；collapsed 下仍保留可访问名称。
