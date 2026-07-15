---
title: SconeButton
sidebar_position: 20
---

# SconeButton

按钮、提交、加载和危险动作入口。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeButton` |
| 分类 | 通用 / 数据录入 |
| 导入 | `import { SconeButton } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeButton } from "scone-ui";
import type { SconeButtonProps } from "scone-ui";
```

## 使用

按钮、提交、加载和危险动作入口。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

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

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

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

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
- `destructive` 只表达危险语义，不替代影响说明、二次确认或权限判断。
