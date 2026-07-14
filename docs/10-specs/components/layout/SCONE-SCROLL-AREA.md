# SconeScrollArea

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Layout                                                   |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

明确的局部滚动容器，用于侧栏列表、Drawer 内容、表格外层和长菜单。

| Prop                | 类型                                 | 说明                 |
| ------------------- | ------------------------------------ | -------------------- |
| `children`          | `ReactNode`                          | 内容。               |
| `onScroll`          | React.UIEventHandler<HTMLDivElement> | viewport 滚动事件。  |
| `className`         | `string`                             | 样式。               |
| `viewportClassName` | `string`                             | viewport slot 样式。 |

## Usage

- 侧栏列表、Drawer 内容、表格外层和长菜单使用 ScrollArea。
- 页面主滚动由 PageContent 负责，不用 ScrollArea 包整页。

## Rules

- 必须由父容器、height preset 或 `className` 明确高度来源；不得靠内容自然高度假装可滚动。
- 不作为页面默认主滚动；页面主滚动由 PageContent 管。
- sticky header/footer 必须绑定到同一滚动上下文。
- Drawer 内容区、DataTable.TableRegion 和长菜单使用同一个 viewport slot 规则，避免多层主滚动。
- shadcn mapping：基于 Scroll Area 样式调整。
