# SconeConfirm

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

确认交互，基于 AlertDialog 语义，用于危险、不可逆或影响较大的动作。

| Prop           | 类型                          | 说明               |
| -------------- | ----------------------------- | ------------------ |
| `open`         | `boolean`                     | 可选受控打开状态。 |
| `defaultOpen`  | `boolean`                     | 默认打开。         |
| `onOpenChange` | `(open: boolean) => void`     | 状态变化。         |
| `title`        | `ReactNode`                   | 确认标题。         |
| `description`  | `ReactNode`                   | 影响说明。         |
| `onConfirm`    | `() => void \| Promise<void>` | 确认回调。         |
| `onCancel`     | `() => void`                  | 取消回调。         |
| `cancelText`   | `string`                      | 取消文案。         |
| `confirmText`  | `string`                      | 确认文案。         |
| `destructive`  | `boolean`                     | 危险语义。         |
| `disabled`     | `boolean`                     | 禁用确认。         |
| `loading`      | `boolean`                     | 外部受控提交中。   |
| `ariaLabel`    | `string`                      | 无可见标题时必填。 |

## Usage

- 危险、不可逆或影响较大的动作使用 Confirm。
- 普通提示使用 Alert；短反馈使用 Toast。

## Rules

- Confirm 只表达确认语义，不执行业务删除、权限判断或请求。
- 危险确认必须有 `description`，`destructive` 不替代影响说明。
- 异步 `onConfirm` 执行期间确认按钮进入 loading，并防止重复提交。
- service recipe 可以基于该组件，但不得成为唯一 API。
- shadcn mapping：基于 AlertDialog。

测试：

- 默认焦点落在取消或安全动作上。
- 异步确认期间重复点击不会重复调用 `onConfirm`。
- destructive 视觉语义和 description 均可验证。
