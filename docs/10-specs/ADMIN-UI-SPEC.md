# Admin UI Component Spec

## Purpose

本文档定义 `scone-ui` admin-ui 基础组件库的规格总览。`docs/ADMIN-WEB-CONTROLS-INVENTORY.md` 只作为使用率和场景信号来源；本规格不照搬源项目组件命名、业务页面组合或 Ant Design API。

目标是从现有 admin-web 控件使用中抽象出可复用、业务中性、可长期维护的基础组件。

## Source Signals

- 高频操作：`Button` 使用 350 处。
- 高频输入：`Input` 系列约 186 处，`Select` 97 处，`Form` / `Form.Item` 201 处。
- 高频展示：`Descriptions` 248 处，`Card` 96 处，`Table` / 封装表格合计 46 处。
- 高频布局：空间布局类合计约 196 处。
- 高频浮层和反馈：抽屉 45 处，提示 51 处，弹窗确认 12 处。

这些信号只用于判断优先级和基础能力，不作为组件 API 的直接来源。

## Spec Documents

- [`COMPONENT-SPEC-LAYOUT.md`](./COMPONENT-SPEC-LAYOUT.md)：基础布局 primitives、容器、间距、工具栏和分割布局。
- [`COMPONENT-SPEC-DATA-DISPLAY.md`](./COMPONENT-SPEC-DATA-DISPLAY.md)：表格、详情、列表、标签、卡片、富文本和统计展示。
- [`COMPONENT-SPEC-FORM.md`](./COMPONENT-SPEC-FORM.md)：按钮、输入、选择、表单、开关、日期、数字和上传。
- [`COMPONENT-SPEC-FEEDBACK-OVERLAY.md`](./COMPONENT-SPEC-FEEDBACK-OVERLAY.md)：抽屉、弹窗、确认、提示、加载、空状态和进度。
- [`COMPONENT-SPEC-NAVIGATION-MEDIA.md`](./COMPONENT-SPEC-NAVIGATION-MEDIA.md)：Tabs、Segmented、Tree、Menu、Dropdown、Tooltip、Image、Avatar 和 Logo。

## Priority

| 优先级 | 来源信号           | 基础组件族                                                                    | 处理策略                                   |
| ------ | ------------------ | ----------------------------------------------------------------------------- | ------------------------------------------ |
| P0     | 高频且跨页面通用   | Button、Input、Select、Form、Stack、Table、Descriptions                       | 首批实现，定义稳定 API、可访问性和测试标准 |
| P1     | 高频但可按场景扩展 | Card、Alert、Drawer、Tag、List、Toolbar、Empty、Loading                       | 建立基础能力和状态表达，保留组合空间       |
| P2     | 中频或交互较强     | Modal、Confirm、Tree、Tabs、Segmented、Dropdown、Tooltip                      | 做轻量基础封装，不绑定业务流程             |
| P3     | 低频或依赖资源形态 | Upload、Image、Avatar、Timeline、Statistic、Progress、Logo、RichContentViewer | 先定义基础边界，等真实复用稳定后扩展       |

## Naming

- 组件库导出统一使用 `Scone*` 前缀。
- 基础组件使用通用名词，例如 `SconeButton`、`SconeInput`、`SconeTable`、`SconeDrawer`。
- 页面级组合如 `ListPage`、`PageShell`、`FilterPanel` 暂不作为首批基础组件；可以在 patterns 文档或后续组件族中讨论。
- 不沿用源项目的 `Kuzhambu*` 命名。
- 不复制 Ant Design prop 命名作为唯一标准；只保留被证明高频、稳定、业务中性的能力。

## API Principles

- 高频 props 进入显式 API；低频能力进入 `className`、`style`、`children`、`slots` 或受控组合。
- 所有组件必须支持 `className`；样式覆盖优先通过 Tailwind utility 和设计 token。
- 可交互组件必须具备稳定可访问名称；优先可见文本，其次 `aria-label` 或 `aria-labelledby`。
- 数据型组件必须明确 `loading`、`empty`、`error` 的表达方式。
- 危险操作只提供视觉和语义能力；确认流程由 `SconeConfirm` 或调用方组合。
- 不把产品业务语义、权限、接口请求、路由、菜单数据或页面流程写入基础组件库。

## Composition Boundary

基础组件库优先提供 primitives：

- Layout primitives：`Stack`、`Inline`、`Toolbar`、`Panel`、`SplitPane`
- Form primitives：`Button`、`Input`、`Select`、`Form`、`FormItem`
- Data primitives：`Table`、`Descriptions`、`Card`、`Tag`、`List`
- Feedback primitives：`Drawer`、`Modal`、`Confirm`、`Alert`、`Empty`、`Loading`

页面级组合不作为默认目标：

- 不内置数据请求。
- 不内置权限判断。
- 不内置业务路由。
- 不内置产品级文案。
- 不要求业务页面必须使用某个完整 page template。

## Verification

每个基础组件至少覆盖：

- 类型导出稳定。
- 基础渲染成功。
- 可访问名称可被 Testing Library 查询。
- `className` 透传到稳定 DOM 边界。
- 核心状态可检查，例如 `loading`、`disabled`、`empty`、`error`。
