# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `2. foundation-types`：落实 Foundation 公共类型
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`
    - 范围对象：`src/types/foundation.ts`、`src/types/foundation.test.ts`
    - 处理动作：定义 RUNBOOK 指定的 Foundation 类型和接口字段。
    - 验收点：`Key`、`Breakpoint`、`ResponsiveValue<T>`、`SconeTone`、`SconeSpacingToken`、`SconeControlSize`、`SconeDensity`、`SconeOrientation`、`SconeAlign`、`SconeSide`、`SconeStatus`、`OverlayCloseReason`、`SconeOption<Value = string>`、`SconeBaseItem` 字段和值域与 RUNBOOK 一致。
    - 重要度：10/10

- [ ] `3. cn-utility`：收敛 className 合并工具
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`
    - 范围对象：`src/lib/cn.ts`、`src/lib/utils.ts`、`src/lib/cn.test.ts`
    - 处理动作：将 `cn` 放入独立文件，并让旧 `utils.ts` 只保留兼容转发。
    - 验收点：`cn(...inputs: ClassValue[]): string` 支持条件 class、数组对象输入和 Tailwind 冲突 class 合并，现有 `utils.ts` 导入路径不被破坏。
    - 重要度：9/10

- [ ] `4. compose-refs`：实现 ref 合并工具
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`
    - 范围对象：`src/lib/compose-refs.ts`、`src/lib/compose-refs.test.tsx`
    - 处理动作：实现 `composeRefs` 并验证 callback ref、object ref、空 ref 和 `null` 清理。
    - 验收点：`composeRefs<T>(...refs)` 能同步写入多个 ref，并在节点清理时向 callback ref 和 object ref 传播 `null`。
    - 重要度：8/10

- [ ] `5. controllable-state`：实现受控状态桥接
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`
    - 范围对象：`src/lib/use-controllable-state.ts`、`src/lib/use-controllable-state.test.tsx`
    - 处理动作：实现 `value`、`defaultValue`、`onValueChange` 的受控/非受控状态桥接。
    - 验收点：点击、键盘切换、打开/关闭和值变化等后续控件操作可通过同一 setter 上报，且不在 render 阶段触发副作用或重复通知。
    - 重要度：9/10

- [ ] `6. aria-helpers`：实现基础 ARIA helper
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`
    - 范围对象：`src/lib/aria.ts`、`src/lib/aria.test.ts`
    - 处理动作：实现 id 合并、`aria-describedby` 合并、ARIA boolean 属性和值存在性判断。
    - 验收点：helper 不生成无效 ARIA 属性，能稳定支持控件聚焦、读屏描述读取和错误状态描述更新。
    - 重要度：8/10

- [ ] `7. foundation-type-exports`：导出 Foundation 公共类型
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`
    - 范围对象：`src/index.ts`、`src/index.test.ts`、`src/types/foundation.ts`
    - 处理动作：从库级入口导出本阶段已实现的 Foundation 公共类型。
    - 验收点：`src/index.test.ts` 精确断言 Foundation 类型导出清单，且不预导出任何未实现组件、Pattern、Provider、service 或 docs-only Recipe。
    - 重要度：10/10

- [ ] `8. utility-exports`：导出公共工具函数
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`
    - 范围对象：`src/index.ts`、`src/index.test.ts`、`src/lib/cn.ts`、`src/lib/compose-refs.ts`、`src/lib/use-controllable-state.ts`
    - 处理动作：从库级入口导出 `cn`、`composeRefs`、`useControllableState`。
    - 验收点：`src/index.test.ts` 精确断言公共工具导出清单，且调用方不需要依赖 `src/lib/*` 私有路径。
    - 重要度：10/10

- [ ] `9. aria-exports`：导出公共 ARIA helper
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`
    - 范围对象：`src/index.ts`、`src/index.test.ts`、`src/lib/aria.ts`、`src/lib/aria.test.ts`
    - 处理动作：从库级入口导出已经测试锁定的 ARIA helper。
    - 验收点：`src/index.test.ts` 精确断言 ARIA helper 导出清单，且未导出 Field/Form 专属逻辑或私有 helper。
    - 重要度：9/10

- [ ] `10. verification`：运行 Foundation + Public API 最小验证
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`
    - 范围对象：`package.json`、`src/styles/theme.css`、`src/types/foundation.ts`、`src/lib/aria.ts`、`src/index.ts`
    - 处理动作：运行 `pnpm typecheck`、`pnpm test`、`pnpm lint` 并修复本闭环引入的问题。
    - 验收点：三项验证通过，失败时仅修复与 Foundation + Public API 闭环相关的问题。
    - 重要度：10/10

- [ ] `11. main-sync`：同步 main 分支最新代码
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`、`docs/00-governance/TODO-RULES.md`
    - 范围对象：`main`、`feat/foundation-public-api`
    - 处理动作：在收口前同步 `main` 分支最新代码到当前工作分支。
    - 验收点：当前分支包含 `main` 最新代码，且同步后相关验证仍通过或已记录需要修复的本闭环问题。
    - 重要度：10/10

- [ ] `12. runbook-cleanup`：清理 RUNBOOK 和已完成 TODO
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`、`docs/00-governance/TODO-RULES.md`
    - 范围对象：`main`、`feat/foundation-public-api`、`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`、`TODO.md`
    - 处理动作：任务完成后删除 RUNBOOK，并从 `TODO.md` 删除已完成任务。
    - 验收点：RUNBOOK 已删除或其长期证据已迁移到 `docs/40-readiness/`，已完成 TODO 不保留在 `TODO.md`。
    - 重要度：10/10

## 待审阅任务项

## 待讨论项
