---
title: 快速开始
sidebar_position: 1
---

# 快速开始

安装组件库：

```bash
pnpm add scone-ui
```

在应用入口引入样式：

```ts
import "scone-ui/styles.css";
```

使用组件：

```tsx
import { SconeButton } from "scone-ui";

export const Example = (): React.JSX.Element => {
    return <SconeButton>保存</SconeButton>;
};
```

## 文档维护约定

- 面向公共组件、模式和使用指南编写内容。
- 不写产品业务规则、后端契约或具体应用工作流。
- 当组件 API、样式入口或安装方式变化时，同步更新文档。
