# App Shell

## Metadata

| Field     | Value                                                 |
| --------- | ----------------------------------------------------- |
| Status    | Ready                                                 |
| Layer     | Admin Pattern                                         |
| Authority | [`ADMIN-PATTERNS-SPEC.md`](../ADMIN-PATTERNS-SPEC.md) |

Pattern 的层级、导出和组合边界以 [`ADMIN-UI-SPEC.md`](../ADMIN-UI-SPEC.md) 与 [`COMPONENT-SELECTION.md`](../COMPONENT-SELECTION.md) 为准。

Export status: Admin Pattern export. 导出 `AppShell.Root/Sidebar/Header/Main/Aside` compound parts；菜单数据、路由和权限仍由产品侧提供。

## Scope

App Shell 定义后台应用的全局空间：Sidebar、Header、Main 和可选辅助栏。它不定义菜单数据、权限、路由或产品 logo。

## Anatomy

- `AppShell.Root`：应用级 grid/flex 容器。
- `AppShell.Sidebar`：全局或模块导航区域。
- `AppShell.Header`：跨页面全局操作区域。
- `AppShell.Main`：唯一页面入口，只承载一个 `Page.Root`。
- `AppShell.Aside`：可选辅助栏。

## Props And Slots

| Part               | 关键 props / events                                                         | 说明                               |
| ------------------ | --------------------------------------------------------------------------- | ---------------------------------- |
| `AppShell.Root`    | `children`、`className`                                                     | 应用级布局容器。                   |
| `AppShell.Sidebar` | `collapsed`、`defaultCollapsed`、`onCollapsedChange(collapsed)`、`children` | 只管理展示折叠，不管理路由或权限。 |
| `AppShell.Header`  | `children`、`actions`、`className`                                          | 全局操作区域。                     |
| `AppShell.Main`    | `children`、`className`                                                     | 页面入口和收缩边界。               |
| `AppShell.Aside`   | `children`、`open`、`defaultOpen`、`onOpenChange(open)`                     | 可选辅助栏。                       |

## Rules

- `Sidebar` 承载全局或模块导航，窄屏可折叠为 drawer 或 icon rail。
- `Header` 承载全局搜索、用户入口、环境标识或页面外全局动作。
- `Main` 内只放 `Page`，主滚动容器应唯一。
- 产品级导航结构由应用侧提供，组件库只提供布局 recipe。
- App Shell 不拥有页面滚动；滚动从 `AppShell.Main` 进入 `Page.Content`。
- `AppShell.Main` 必须允许内部滚动区域收缩，默认约束为 `min-height: 0` / `min-width: 0` 等价行为，避免 PageContent 被内容撑破。
