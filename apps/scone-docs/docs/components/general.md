---
title: 通用总览
sidebar_position: 2
---

# 通用总览

通用分类收录所有后台界面都会反复使用的基础表达能力。

## 组件

| 能力 | 公共 API | 主要用途 |
| --- | --- | --- |
| 按钮 | `SconeButton` | 普通动作、提交动作、加载动作、危险动作入口。 |
| 排版 | `SconeTypography`、`SconeTitle`、`SconeText`、`SconeParagraph` | 标题、正文、辅助文本和状态文案。 |

## 选择规则

- 交互动作优先使用 `SconeButton`。
- 图标按钮必须提供可见文本或 `ariaLabel`。
- 排版组件只表达文本层级和语义，不承载业务状态判断。
- 危险动作使用 `destructive` 表达语义；确认流程另由 `SconeConfirm` 或 ConfirmationFlow Recipe 承担。

## 边界

- `scone-ui` 不提供独立 `SconeIcon`。业务图标、品牌图形和资源类型图标由调用方传入。
- 精确 props 以当前安装包的 `dist/index.d.ts` 为准。
