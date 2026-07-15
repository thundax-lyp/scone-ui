---
title: SconeButton
sidebar_position: 20
---

# SconeButton

按钮、提交、加载和危险动作入口。

## 定位

- 站点分类：通用 / 数据录入
- 导入入口：`"scone-ui"`
- API 权威：当前安装包的 `scone-ui/dist/index.d.ts`
- 规则来源：`scone-ui/PACKAGE-AI-GUIDE.md` 和仓库 specs

## 导入

```tsx
import { SconeButton } from "scone-ui";
import type { SconeButtonProps } from "scone-ui";
```

类型也从 `"scone-ui"` 导入；封装组件时优先复用公共 props 类型，不要重新声明不完整 props。

## 何时使用

- 触发页面、表单、列表行或工具栏中的明确动作。
- 表达提交、保存、取消、重置、删除等用户意图。
- 需要加载态时，用 `loading` 保持按钮尺寸并避免重复触发。
- 危险动作用 `destructive` 表达语义；确认流程另用 `SconeConfirm` 或 ConfirmationFlow Recipe。

需要业务请求、权限判断、路由跳转、校验 schema 或产品文案时，由调用方应用组合，不写入组件内部。

## 基础用法

```tsx
import { SconeButton } from "scone-ui";

export function Actions() {
    return (
        <>
            <SconeButton variant="primary">保存</SconeButton>
            <SconeButton variant="secondary">取消</SconeButton>
            <SconeButton variant="ghost">更多</SconeButton>
        </>
    );
}
```

## 提交按钮

```tsx
import { SconeButton, SconeForm } from "scone-ui";

export function SubmitAction() {
    return (
        <SconeForm onSubmit={(event) => event.preventDefault()}>
            <SconeButton type="submit" variant="primary">
                提交
            </SconeButton>
        </SconeForm>
    );
}
```

## 加载和危险动作

```tsx
import { SconeButton } from "scone-ui";

export function DangerAction() {
    return (
        <SconeButton destructive loading>
            删除中
        </SconeButton>
    );
}
```

## Props

下表来自 Scone specs，用于快速阅读组件能力。精确类型、默认值、泛型和 compound parts 仍以当前安装版本的 `scone-ui/dist/index.d.ts` 为准。

| Prop          | 类型                                            | 说明                         |
| ------------- | ----------------------------------------------- | ---------------------------- |
| `variant`     | `"primary" \| "secondary" \| "ghost" \| "link"` | 视觉层级。                   |
| `tone`        | SconeTone                                       | 语义色，默认 `default`。     |
| `destructive` | `boolean`                                       | 危险动作语义。               |
| `size`        | `"sm" \| "md" \| "lg"`                          | 控件尺寸。                   |
| `block`       | `boolean`                                       | 是否占满可用宽度。           |
| `type`        | `"button" \| "submit" \| "reset"`               | 原生按钮类型。               |
| `onClick`     | React.MouseEventHandler&lt;HTMLButtonElement&gt;      | 点击事件。                   |
| `asChild`     | `boolean`                                       | 保留 shadcn/Radix 组合能力。 |
| `icon`        | `ReactNode`                                     | 图标。                       |
| `loading`     | `boolean`                                       | 加载。                       |
| `disabled`    | `boolean`                                       | 禁用。                       |
| `ariaLabel`   | `string`                                        | 无可见文本时必填。           |
| `className`   | `string`                                        | 样式。                       |

## 边界

- 不导入 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不按 Ant Design、shadcn、HTML 或历史记忆猜 props。
- 不在组件内实现产品业务流程。
- `destructive` 只表达危险语义，不替代影响说明、二次确认或权限判断。
