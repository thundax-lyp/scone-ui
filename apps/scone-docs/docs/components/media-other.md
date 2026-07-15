---
title: 其他总览
sidebar_position: 8
---

# 其他总览

媒体组件用于头像、图片和 fallback 展示。Ant Design 的“其他”分类中包含全局配置、固钉、水印等能力；Scone UI 当前只公开与后台组件库通用性明确相关的媒体能力和公共工具。

## 组件

| 能力 | 公共 API | 主要用途 |
| --- | --- | --- |
| 头像 | `SconeAvatar` | 用户、组织、资源头像和文字 fallback。 |
| 图片 | `SconeImage` | 图片展示、占位和失败状态。 |

## 公共工具

`scone-ui` 还导出少量 helper 和 hook，供 wrapper 或组合组件使用。精确清单以当前安装包 `dist/index.d.ts` 为准。

| 能力 | 典型用途 |
| --- | --- |
| `cn` | 合并 className。 |
| `composeRefs` | 组合多个 React ref。 |
| `useControllableState` | 受控/非受控状态桥接。 |
| ARIA helpers | 可访问属性组合。 |

## 非目标

- 不提供独立 `SconeIcon`，图标由调用方传入。
- 不内置产品 Logo、权限图标、资源类型图标或品牌资产。
- 不复制 AntD `ConfigProvider`、`App`、`Watermark`、`Affix` 等完整“其他”矩阵。
