# Admin UI Verification Design

## Verification Design

依据文件：

- `docs/10-specs/ADMIN-UI-SPEC.md`
- `docs/10-specs/FOUNDATIONS-SPEC.md`
- `docs/10-specs/COMPONENT-SELECTION.md`

本文档只定义后续验证策略，不表示测试文件已经创建。

| 能力类型 | 验证对象 | 验证行为 | 目标入口 |
| --- | --- | --- | --- |
| Foundation/theme | CSS variables、Tailwind 映射、token 消费 | `src/styles/theme.css` 是唯一数值源；Tailwind 只映射变量；不创建第二套 `tokens.ts` 数值源。 | `src/types/foundation.test.ts`、静态检查 |
| Public exports | `src/index.ts`、组件族入口、Pattern 入口 | Export Groups 与 `docs/10-specs/COMPONENT-SELECTION.md` 一致；docs-only Recipe 不导出。 | `src/index.test.ts` |
| Component 基础行为 | `className`、`ref`、可访问名称、核心状态 | 每个组件的稳定 DOM 边界可透传 `className` 和 ref；无可见 label 时支持 `ariaLabel`。 | 与组件文件同目录的 `*.test.tsx` |
| Radix/shadcn wrapper | focus、keyboard、ARIA、close、`asChild` | wrapper 不破坏 focus trap、focus restore、roving focus、typeahead、Escape、outside interaction、ARIA 和 `asChild`。 | 与 wrapper 文件同目录的 `*.test.tsx` |
| Custom component | keyboard、ARIA、受控/非受控、边界条件 | Tree、SplitPane、NumberInput、DatePicker、Upload、Timeline 等 custom 能力必须单独验证交互模型。 | 与组件文件同目录的 `*.test.tsx` |
| Pattern | slot 组合、状态归属、滚动/sticky、业务职责不进入 | Page 主滚动唯一；DataTable 状态由调用方拥有并只留 adapter/interface；Pattern 不发起请求或判断权限。 | 与 Pattern 文件同目录的 `*.test.tsx` |
| Recipe | 组合可复制、无新增正式 API、关键状态可验证 | docs-only Recipe 明确无源码落点；不创建 `src/recipes/` 源码入口。 | 文档和示例验证 |
| Type/data structure | 公共类型导出、私有类型不泄漏、事件 payload、service options、ref 类型 | 公共类型从约定入口导出；回调不承载业务对象；service 类型不泄漏内部 queue/store。 | `src/types/foundation.test.ts`、`src/index.test.ts` |

最小验证清单：

- Form：label、description、message、invalid、required、disabled、readOnly 与 control 关联。
- Data Display：Table/List 的 `loading > error > empty` 优先级；Table 不承接 pagination、selection、请求。
- Layout：ScrollArea viewport、SplitPane 键盘 resize、Toolbar wrap 和 density。
- Feedback/Overlay：Drawer/Dialog/Confirm 的 focus trap、focus restore、close reason、ariaLabel/title。
- Navigation：Tabs ARIA 关联、Dropdown/Menu 键盘、Tree ARIA tree、Pagination state。
- Media：Image/Avatar fallback、alt、preview open。
- Pattern：DataTable.TableRegion、Page.Content 主滚动、Section 非 Card、FilterBar submit intent。
- Recipe：DrawerForm dirty close、ConfirmationFlow destructive description、Popover/Logo/Result docs-only。
