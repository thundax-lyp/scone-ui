# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

## 待审阅任务项

- [ ] `07-navigation-command`：07 实现 Command
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-NAVIGATION-MEDIA-CLOSURE.md`
    - 范围对象：`src/components/navigation/command.tsx`、`src/components/navigation/command.test.tsx`
    - 处理动作：实现命令搜索输入、过滤结果、分组、loading、empty 和键盘选择。
    - 验收点：搜索过滤、受控 value、selectedKey、group、loading、empty、disabled item、ArrowUp/ArrowDown 和 Enter 选择均有测试覆盖，Command 不写入表单值。
    - 重要度：9/10

- [ ] `08-navigation-tree`：08 实现 Tree
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-NAVIGATION-MEDIA-CLOSURE.md`
    - 范围对象：`src/components/navigation/tree.tsx`、`src/components/navigation/tree.test.tsx`
    - 处理动作：实现自研 ARIA tree 的 selected、checked、expanded、roving focus 和键盘模型。
    - 验收点：受控/非受控 selectedKeys、checkedKeys、expandedKeys、嵌套节点、disabled 节点、multiple selection、checkable、Arrow/Home/End 键盘行为均有测试覆盖。
    - 重要度：10/10

- [ ] `09-media-image-avatar`：09 实现 Image 和 Avatar
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-NAVIGATION-MEDIA-CLOSURE.md`
    - 范围对象：`src/components/media/image.tsx`、`src/components/media/image.test.tsx`、`src/components/media/avatar.tsx`、`src/components/media/avatar.test.tsx`
    - 处理动作：实现 Image fallback/preview/尺寸稳定和 Avatar fallback/icon/size/shape。
    - 验收点：Image alt、fallback、load/error、preview open、width/height/objectFit 和 Avatar fallback、icon、load/error、size、shape 均有测试覆盖。
    - 重要度：8/10

- [ ] `10-public-export`：10 接入 Navigation 和 Media public export
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-NAVIGATION-MEDIA-CLOSURE.md`
    - 范围对象：`src/components/navigation/index.ts`、`src/components/media/index.ts`、`src/index.ts`、`src/index.test.ts`
    - 处理动作：从组件族入口和库入口导出本次 Navigation + Media 组件和 public props type。
    - 验收点：消费者可从 `src/index.ts` 导入本次全部组件和类型，且 `SconePagination` 不从任何入口导出。
    - 重要度：9/10

- [ ] `11-final-main-sync`：11 同步 main 分支代码
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/TODO-RULES.md`
    - 范围对象：当前工作分支 `feat/navigation-media-closure`、上游 `main`
    - 处理动作：在实现任务完成后同步最新 `main` 分支代码并处理由同步引入的冲突。
    - 验收点：当前分支包含最新 `main`，无未解决冲突，Navigation + Media 相关改动未被同步过程回退。
    - 重要度：8/10

- [ ] `12-final-verification`：12 运行最终验证
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-NAVIGATION-MEDIA-CLOSURE.md`
    - 范围对象：`src/components/navigation/*`、`src/components/media/*`、`src/index.ts`、`src/index.test.ts`
    - 处理动作：在同步 main 后运行 Navigation + Media 闭环要求的最终验证命令。
    - 验收点：`pnpm format`、`pnpm lint`、`pnpm typecheck`、`pnpm test -- src/components/navigation src/components/media src/index.test.ts`、`pnpm build` 均通过或失败原因已明确记录。
    - 重要度：10/10

- [ ] `13-implementation-coverage`：13 更新 Implementation Coverage
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-NAVIGATION-MEDIA-CLOSURE.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
    - 处理动作：补充 Navigation + Media 实现覆盖证据。
    - 验收点：coverage 记录包含源码文件、测试文件、覆盖能力、最终验证命令结果，并明确 `SconePagination` 延后到 DataTable worktree。
    - 重要度：10/10

- [ ] `14-runbook-cleanup`：14 清理 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/DOCUMENT-RULES.md`
    - 范围对象：`docs/30-designs/RUNBOOK-NAVIGATION-MEDIA-CLOSURE.md`
    - 处理动作：在实现、验证和 Implementation Coverage 收口后删除临时 RUNBOOK。
    - 验收点：RUNBOOK 文件已删除，长期证据已保留在 `docs/40-readiness/IMPLEMENTATION-COVERAGE.md`。
    - 重要度：10/10

## 待讨论项
