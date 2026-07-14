# SconeTree

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

层级数据展示和选择，用于权限树、分类树、目录树和可展开层级列表。

| Prop                                   | 类型                                                                      | 说明           |
| -------------------------------------- | ------------------------------------------------------------------------- | -------------- |
| `treeData`                             | `SconeTreeNode[]`                                                         | 节点数据。     |
| `selectedKeys` / `defaultSelectedKeys` | `Key[]`                                                                   | 选中节点。     |
| `checkedKeys` / `defaultCheckedKeys`   | `Key[]`                                                                   | 勾选节点。     |
| `expandedKeys` / `defaultExpandedKeys` | `Key[]`                                                                   | 展开节点。     |
| `checkable`                            | `boolean`                                                                 | 是否可勾选。   |
| `selectable`                           | `boolean`                                                                 | 是否可选择。   |
| `multiple`                             | `boolean`                                                                 | 是否允许多选。 |
| `onSelect`                             | `(keys: Key[], info: { node: SconeTreeNode; selected: boolean }) => void` | 选择变化。     |
| `onCheck`                              | `(keys: Key[], info: { node: SconeTreeNode; checked: boolean }) => void`  | 勾选变化。     |
| `onExpand`                             | `(keys: Key[], info: { node: SconeTreeNode; expanded: boolean }) => void` | 展开变化。     |
| `ariaLabel`                            | `string`                                                                  | 可访问名称。   |
| `className`                            | `string`                                                                  | 样式。         |

## Usage

- 层级展示、层级选择和 TreeSelect recipe 基座使用 Tree。
- 简单导航使用 Menu；大量扁平数据使用 Table/List。

## Rules

- 节点 key 必须稳定。
- 大数据量、异步加载、虚拟滚动和拖拽不隐式开启。
- 基座使用自研 ARIA tree 模型；不依赖未定第三方 tree primitive。
- 必须实现 roving focus、方向键展开/收起、Home/End 和可读 checked/selected 状态。
- 异步加载、虚拟滚动、拖拽排序和 TreeSelect 不进入基础 Tree；需要时以 recipe 或扩展 SPEC 补充。

测试：

- 键盘模型、ARIA tree 语义、受控 selected/checked/expanded 和 disabled 节点均可验证。
