# Navigation And Media Component Spec

## Scope

本规格覆盖 admin-ui 基础导航、菜单、媒体和辅助展示组件。

## Source Signals

- Tree 用于层级选择和权限/目录类场景，说明需要基础树组件。
- Tabs / Segmented 用于页内视图和模式切换。
- Dropdown / Menu / Tooltip 用于更多操作、导航和辅助说明。
- Image / Avatar / Logo 用于资源、用户和品牌占位展示。

## Components

### SconeTabs

页内视图切换。

建议能力：

- `items`
- `activeKey`
- `onChange`
- `aria-label`
- `className`

规则：

- 用于同一对象或同一工作区内的视图切换。
- 不承载产品全局导航约束。

### SconeSegmented

轻量模式切换。

建议能力：

- `options`
- `value`
- `onChange`
- `aria-label`
- `className`

规则：

- 选项数量建议 2-5 个。
- 长文案使用 tabs 或 select。

### SconeTree

层级数据展示和选择。

建议能力：

- `treeData`
- `selectedKeys`
- `checkedKeys`
- `expandedKeys`
- `defaultExpandAll`
- `checkable`
- `selectable`
- `blockNode`
- `onSelect`
- `onCheck`
- `onExpand`
- `className`

规则：

- 节点 key 必须稳定。
- 大数据量树的虚拟滚动或异步加载作为显式能力，不隐式开启。

### SconeDropdown

下拉浮层和更多操作入口。

建议能力：

- `items`
- `trigger`
- `children`
- `className`

规则：

- 入口必须有可见文本或稳定可访问名称。
- 危险操作只提供 `danger` 语义，不内置业务确认。

### SconeMenu

菜单。

建议能力：

- `items`
- `mode`
- `selectedKeys`
- `defaultOpenKeys`
- `onSelect`
- `className`

规则：

- 菜单只处理展示和选择，不内置路由。

### SconeTooltip

短提示。

建议能力：

- `content`
- `children`
- `placement`
- `className`

规则：

- Tooltip 只放短解释，不放复杂交互。
- 阻断性错误必须使用 Alert 或表单错误。

### SconeImage

图片展示。

建议能力：

- `src`
- `alt`
- `preview`
- `width`
- `height`
- `className`

规则：

- `alt` 必须传入。
- 预览能力默认可关闭。

### SconeAvatar

头像或对象标识图。

建议能力：

- `src`
- `fallback`
- `icon`
- `size`
- `alt`
- `className`

### SconeLogo

品牌占位 primitive。

建议能力：

- `label`
- `mark`
- `children`
- `className`

规则：

- 不写死产品名称。
- 产品侧通过 `label`、`mark` 或 `children` 组合。
