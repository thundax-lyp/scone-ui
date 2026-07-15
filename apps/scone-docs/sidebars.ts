import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const componentDoc = (id: string, label: string) => ({ type: "doc" as const, id, label });

const sidebars: SidebarsConfig = {
    docsSidebar: [
        "index",
        {
            type: "category",
            label: "指南",
            items: ["guide/quick-start", "guide/ai-usage"],
        },
        {
            type: "category",
            label: "组件",
            items: [
                "components/overview",
                {
                    type: "category",
                    label: "通用",
                    items: [
                        { type: "doc", id: "components/general", label: "总览" },
                        componentDoc("components/general/button", "Button 按钮"),
                        componentDoc("components/general/typography", "Typography 排版"),
                    ],
                },
                {
                    type: "category",
                    label: "布局",
                    items: [
                        { type: "doc", id: "components/layout", label: "总览" },
                        componentDoc("components/layout/stack", "Stack 垂直排列"),
                        componentDoc("components/layout/inline", "Inline 水平排列"),
                        componentDoc("components/layout/compact", "Compact 紧凑组合"),
                        componentDoc("components/layout/toolbar", "Toolbar 工具栏"),
                        componentDoc("components/layout/scroll-area", "ScrollArea 滚动区域"),
                        componentDoc("components/layout/separator", "Separator 分隔线"),
                        componentDoc("components/layout/split-pane", "SplitPane 分隔面板"),
                    ],
                },
                {
                    type: "category",
                    label: "导航",
                    items: [
                        { type: "doc", id: "components/navigation", label: "总览" },
                        componentDoc("components/navigation/breadcrumb", "Breadcrumb 面包屑"),
                        componentDoc("components/navigation/pagination", "Pagination 分页"),
                        componentDoc("components/navigation/tabs", "Tabs 标签页"),
                        componentDoc("components/navigation/segmented", "Segmented 分段控制"),
                        componentDoc("components/navigation/tree", "Tree 树"),
                        componentDoc("components/navigation/dropdown", "Dropdown 下拉菜单"),
                        componentDoc("components/navigation/menu", "Menu 导航菜单"),
                        componentDoc("components/navigation/command", "Command 命令面板"),
                        componentDoc("components/navigation/tooltip", "Tooltip 文字提示"),
                        componentDoc("components/navigation/accordion", "Accordion 手风琴"),
                        componentDoc("components/navigation/collapsible", "Collapsible 折叠区域"),
                    ],
                },
                {
                    type: "category",
                    label: "数据录入",
                    items: [
                        { type: "doc", id: "components/data-entry", label: "总览" },
                        componentDoc("components/data-entry/input", "Input 输入框"),
                        componentDoc("components/data-entry/search-input", "SearchInput 搜索框"),
                        componentDoc("components/data-entry/password-input", "PasswordInput 密码框"),
                        componentDoc("components/data-entry/textarea", "TextArea 文本域"),
                        componentDoc("components/data-entry/number-input", "NumberInput 数字输入"),
                        componentDoc("components/data-entry/select", "Select 选择器"),
                        componentDoc("components/data-entry/combobox", "Combobox 组合框"),
                        componentDoc("components/data-entry/checkbox", "Checkbox 多选框"),
                        componentDoc("components/data-entry/radio-group", "RadioGroup 单选组"),
                        componentDoc("components/data-entry/switch", "Switch 开关"),
                        componentDoc("components/data-entry/slider", "Slider 滑动输入"),
                        componentDoc("components/data-entry/date-picker", "DatePicker 日期选择"),
                        componentDoc("components/data-entry/upload", "Upload 上传"),
                        componentDoc("components/data-entry/form", "Form 表单"),
                        componentDoc("components/data-entry/field", "Field 字段"),
                        componentDoc("components/data-entry/field-group", "FieldGroup 字段组"),
                        componentDoc("components/data-entry/form-section", "FormSection 表单区块"),
                        componentDoc("components/data-entry/form-actions", "FormActions 表单操作"),
                    ],
                },
                {
                    type: "category",
                    label: "数据展示",
                    items: [
                        { type: "doc", id: "components/data-display", label: "总览" },
                        componentDoc("components/data-display/table", "Table 表格"),
                        componentDoc("components/data-display/descriptions", "Descriptions 描述列表"),
                        componentDoc("components/data-display/list", "List 列表"),
                        componentDoc("components/data-display/card", "Card 卡片"),
                        componentDoc("components/data-display/tag", "Tag 标签"),
                        componentDoc("components/data-display/badge", "Badge 徽标"),
                        componentDoc("components/data-display/statistic", "Statistic 统计数值"),
                        componentDoc("components/data-display/timeline", "Timeline 时间轴"),
                    ],
                },
                {
                    type: "category",
                    label: "反馈",
                    items: [
                        { type: "doc", id: "components/feedback", label: "总览" },
                        componentDoc("components/feedback/alert", "Alert 警告提示"),
                        componentDoc("components/feedback/empty", "Empty 空状态"),
                        componentDoc("components/feedback/loading", "Loading 加载"),
                        componentDoc("components/feedback/progress", "Progress 进度条"),
                        componentDoc("components/feedback/dialog", "Dialog 对话框"),
                        componentDoc("components/feedback/drawer", "Drawer 抽屉"),
                        componentDoc("components/feedback/confirm", "Confirm 确认"),
                        componentDoc("components/feedback/toast", "Toast 全局提示"),
                        componentDoc("components/feedback/notification", "Notification 通知"),
                    ],
                },
                {
                    type: "category",
                    label: "其他",
                    items: [
                        { type: "doc", id: "components/media-other", label: "总览" },
                        componentDoc("components/media-other/avatar", "Avatar 头像"),
                        componentDoc("components/media-other/image", "Image 图片"),
                    ],
                },
                "components/patterns",
                "components/recipes",
            ],
        },
    ],
};

export default sidebars;
