# DrawerForm Recipe

## Metadata

| Field     | Value                       |
| --------- | --------------------------- |
| Status    | Ready Boundary              |
| Layer     | Recipe                      |
| Authority | [`README.md`](../README.md) |

Recipe 不定义万能组件 API；按本文档组合基础组件、Layout 和 Pattern。

DrawerForm 适合短到中等长度的创建/编辑任务。

- Drawer title 说明任务对象。
- 内容区放 `SconeForm` 和 `FormSection`。
- footer 放取消和提交按钮。
- loading 时禁用重复提交，保持关闭按钮规则由 Drawer SPEC 决定。
- 超长表单、复杂表格和多步骤流程改用 FormPage。

## Dirty Close

DrawerForm 不让 Drawer 内置脏表单判断。Required structure：

1. Drawer 接收 `onRequestClose(reason)`。
2. 调用方判断当前表单是否 dirty。
3. 非 dirty 时直接设置 `open=false`。
4. dirty 时打开 `SconeConfirm`，说明未保存内容的影响。
5. 用户确认放弃后再设置 `open=false`。

`escape`、`outside`、`closeButton` 和 `footerAction` 都走同一拦截入口；提交成功属于调用方 `programmatic` close，不触发二次确认。
