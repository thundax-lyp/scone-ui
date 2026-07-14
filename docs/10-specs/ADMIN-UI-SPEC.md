# Admin UI Spec

## Purpose

本文档定义 `scone-ui` admin-ui 组件库的规格入口。`scone-ui` 面向后台管理系统、内部工具、运营平台和数据管理界面，提供比直接使用 `shadcn/ui` 更稳定的 Admin 语义、信息密度、组合规则和迁移约束。

本仓库不是产品应用仓库，不沉淀业务流程、权限策略、接口协议、路由规则或产品专属 UI 政策。

## Positioning

`admin-ui` 的价值不是复制 Ant Design，也不是把每个 `shadcn/ui` 组件重命名为 `Scone*`。

| 对象             | 关系                                                                           |
| ---------------- | ------------------------------------------------------------------------------ |
| `shadcn/ui`      | 作为主要实现基座，复用 Tailwind、CVA、组合式源码和常见组件结构。               |
| Radix primitives | 继承焦点管理、键盘交互、ARIA 语义和受控/非受控模型。二次封装不得破坏这些行为。 |
| Ant Design       | 作为 Admin 场景能力参照，不复制复杂配置对象、历史 API 或完整组件矩阵。         |
| 产品业务组件     | 不进入通用库。业务字段、业务权限、业务流程和接口状态由产品侧组合。             |

## Spec Documents

- [`README.md`](./README.md)：SPEC 工程索引和读取协议，导航到核心合同、单组件 SPEC、Pattern 和 Recipe。
- [`FOUNDATIONS-SPEC.md`](./FOUNDATIONS-SPEC.md)：Layer、API vocabulary、Shared Types、状态、尺寸、响应式和可访问性规则。
- [`COMPONENT-COVERAGE-AUDIT.md`](./COMPONENT-COVERAGE-AUDIT.md)：对照 Ant Design 与 shadcn/ui 的覆盖审计、缺项处理和不纳入清单。
- [`COMPONENT-SELECTION.md`](./COMPONENT-SELECTION.md)：当前实现范围、组件选择指南和能力矩阵。
- [`components/`](./components/)：单组件 API、状态、事件、组合边界和 shadcn/Radix 映射。
- [`ADMIN-PATTERNS-SPEC.md`](./ADMIN-PATTERNS-SPEC.md)：Page、FilterBar、DataTable、FormPage、DetailPage、SettingsPage、DrawerForm 等 Admin Pattern 和 Recipe。

## Source Of Truth

| 信息类型                                        | 权威文件                                                       |
| ----------------------------------------------- | -------------------------------------------------------------- |
| SPEC 入口、读取顺序和文件定位                   | [`README.md`](./README.md)                                     |
| Layer、API 词汇、Shared Types、响应式和状态语义 | [`FOUNDATIONS-SPEC.md`](./FOUNDATIONS-SPEC.md)                 |
| 当前实现范围、导出清单和能力矩阵                | [`COMPONENT-SELECTION.md`](./COMPONENT-SELECTION.md)           |
| Page、Section、DataTable、DrawerForm 等组合模式 | [`ADMIN-PATTERNS-SPEC.md`](./ADMIN-PATTERNS-SPEC.md)           |
| 单组件 API、状态和 shadcn/Radix 映射            | [`README.md`](./README.md) 索引的 `components/**/*.md`         |
| 覆盖审计和不纳入依据                            | [`COMPONENT-COVERAGE-AUDIT.md`](./COMPONENT-COVERAGE-AUDIT.md) |

## Layer Model

每项能力必须归入唯一主层级。允许在文档中引用其他层，但不得跨层倒置依赖。

| 层级               | 定义                                                               | 准入条件                                 | 示例                                                             | 禁止事项                            |
| ------------------ | ------------------------------------------------------------------ | ---------------------------------------- | ---------------------------------------------------------------- | ----------------------------------- |
| Foundation         | 跨组件共享规则。                                                   | 影响多个组件族，且应统一维护。           | spacing、size、density、tone、state、responsive、accessibility。 | 写入业务场景或组件私有实现。        |
| Primitive          | 底层交互或语义能力，通常继承 Radix 或原生 HTML。                   | 行为稳定、组合粒度低、可被上层复用。     | Dialog primitive、Select primitive、Menu primitive。             | 重写 Radix 焦点、键盘和 ARIA 模型。 |
| Component          | 有稳定语义、结构和可复用 API 的 UI 单元。                          | 业务中性，可单独实现和测试。             | `SconeButton`、`SconeInput`、`SconeTable`、`SconeDrawer`。       | 内置请求、权限、路由或产品文案。    |
| Layout             | 只负责空间、排列、滚动和区域组织的组件。                           | 不表达业务状态，不生成业务动作。         | `SconeStack`、`SconeInline`、`SconeToolbar`、`SconeSplitPane`。  | 把整页工作流封装为布局组件。        |
| Admin Pattern      | 多个组件组成的高频 Admin 结构，有推荐 anatomy 但不固定为单一 API。 | 多个页面反复出现，且规则可业务中性表达。 | Page、PageHeader、FilterBar、DataTable、FormPage、DetailPage。   | 把具体业务字段或流程写入 Pattern。  |
| Recipe             | 针对常见情境的组合规范。                                           | 可复制为起点，但不形成正式组件 API。     | DrawerForm、SearchableTable、ConfirmationFlow。                  | 为一次性场景新增公共组件。          |
| Business Component | 与具体领域模型、业务流程或产品身份耦合。                           | 不进入 `admin-ui`。                      | 权限菜单树、特定资源选择器、业务审批流。                         | 迁移到通用库。                      |

依赖方向：Foundation -> Primitive -> Component/Layout -> Admin Pattern -> Recipe。业务组件只能依赖前面各层，不能反向影响通用 SPEC。

## shadcn/ui And Radix Strategy

封装必须提供明确系统价值：统一 token、统一 Admin 语义、补充必要状态、提供稳定 slots、修复一致性问题或沉淀高频组合。仅为统一导出名而包装不成立。

### Source Strategy

`shadcn/ui` 是源码基座，不是普通运行时依赖。每个能力必须在 [`COMPONENT-SELECTION.md`](./COMPONENT-SELECTION.md) 标注下列一种 source strategy，并明确是否产生 `Scone*` export。

| Source strategy    | 使用条件                                                       | 是否产生 `Scone*` export | 要求                                                  |
| ------------------ | -------------------------------------------------------------- | ------------------------ | ----------------------------------------------------- |
| `vendored-shadcn`  | 复制 shadcn/Radix 组件源码，仅做 token、密度或 class 调整。    | 可选                     | 保留原组合模型、`ref`、`asChild` 和 DOM 语义。        |
| `scone-wrapper`    | 需要统一 `tone`、`size`、`loading`、`ariaLabel` 或稳定 slots。 | 是                       | wrapper 不吞掉 compound parts，不隐藏底层可访问行为。 |
| `pattern-only`     | 单个底层组件不足以表达 Admin 场景。                            | 只导出明确 Pattern parts | 不定义万能配置对象。                                  |
| `direct-docs-only` | 底层组件已经满足需求，admin-ui 只给使用边界。                  | 否                       | 文档记录选择规则，不创建无价值 wrapper。              |
| `custom`           | `shadcn/ui`/Radix 无成熟基座或 Admin 语义明显不同。            | 按 SPEC 决定             | 必须单独定义键盘、ARIA、状态和测试策略。              |
| `no-component`     | 通用价值不足或业务耦合高。                                     | 否                       | 在选择指南中说明替代组合方式。                        |

通用保留规则：

- 保留 Radix 的 focus trap、focus restore、roving focus、typeahead、Escape、outside interaction 和 ARIA 语义。
- 支持 `className` 透传到稳定 DOM 边界；样式通过 Tailwind utility 和 token 覆盖。
- 需要 polymorphic 行为时优先沿用 `asChild`，不得改成不兼容的 `as` API。
- 支持 `ref` 转发；不得因 wrapper 破坏测量、聚焦和动画控制。
- CVA 只管理稳定变体，不承载业务状态推导。

## Implementation Scope

当前 SPEC 只描述可直接进入实现、导出和测试的能力。候选但未纳入当前范围的组件不保留实现级 props，统一在 [`COMPONENT-COVERAGE-AUDIT.md`](./COMPONENT-COVERAGE-AUDIT.md) 的排除清单中说明原因。

所有组件、Pattern 和 Recipe 的工程入口统一为 [`README.md`](./README.md)。实现时不得绕过 README 直接按文件名猜测 API 归属。

## API Principles

统一词汇以 [`FOUNDATIONS-SPEC.md`](./FOUNDATIONS-SPEC.md) 为准。组件文件只说明自身差异，不重复定义跨组件语义。

- React 组件 API 使用 `ariaLabel` 表示组件级可访问名称，底层透传为 `aria-label`；原生 attributes 仍可通过 rest props 传入。
- header 右侧操作统一为 `actions`；底部区域统一为 `footer`；单个提示动作使用 `action`。
- `tone` 表示语义色；`status` 表示流程或任务状态；危险动作使用 `destructive`，不再新增 `danger` boolean。
- `size` 表示控件尺寸；`density` 表示信息密度；容器宽度使用 `widthPreset` 或布局 token，不复用 `size`。
- 数据展示组件必须明确 `loading`、`empty`、`error` 的优先级：`loading` 优先，其次 `error`，最后 `empty`。

## Props And Events Policy

- 组件 SPEC 表必须列出组件新增语义 props、受控状态、非原生事件和稳定 slot。
- `value/defaultValue/onValueChange`、`open/defaultOpen/onOpenChange`、`checked/defaultChecked/onCheckedChange` 是受控/非受控命名基线。
- 用户明确动作使用 `onSelect`、`onConfirm`、`onCancel`、`onClear`、`onApply`、`onReset`、`onDismiss` 等动词事件，不塞入通用 `onChange`。
- 原生 DOM 事件和属性通过 rest props 透传到文档定义的稳定 DOM 边界，例如 `onClick`、`onFocus`、`onBlur`、`onKeyDown`、`id`、`name`、`role`、`data-*`。只有会改变组件语义或状态所有权的事件才在组件表中显式列出。
- Callback 不发起请求、不判断权限、不修改路由；它只把用户意图和当前 UI 状态交给调用方。
- 同一状态不得同时由多个事件表达。例如 Select 选值只用 `onValueChange`，打开状态只用 `onOpenChange`。

## Non-goals

- 不实现完整 Ant Design Table、Form 或 Modal API。
- 不为每个 `shadcn/ui` 组件增加 `Scone*` wrapper。
- 不提供产品级 `ListPage`、权限菜单、请求状态机、路由绑定或业务字典映射。
- 不把 Dashboard、审批、资源选择等业务页面封装为通用组件。
- 不在 SPEC 阶段固定所有 TypeScript 类型；但语义、状态和组合边界必须稳定。

## Verification

每个进入实现的组件至少覆盖：

- 类型导出稳定，`className` 和 `ref` 透传到文档定义的稳定边界。
- 可访问名称可被 Testing Library 查询；复合组件的 label、description、message 关联可验证。
- 核心状态可检查，例如 `loading`、`disabled`、`readOnly`、`invalid`、`empty`、`error`。
- Radix/shadcn 基座组件的键盘、焦点和关闭行为未被 wrapper 破坏。
- 示例符合本 SPEC 的层级、词汇和选择规则。
