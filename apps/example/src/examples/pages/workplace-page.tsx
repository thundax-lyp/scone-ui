import {
    BlocksIcon,
    ChartNoAxesCombinedIcon,
    ClipboardListIcon,
    DatabaseIcon,
    FolderKanbanIcon,
    GitPullRequestArrowIcon,
    Layers3Icon,
    PlusIcon,
    SettingsIcon,
    ShieldCheckIcon,
    SparklesIcon,
} from "lucide-react";
import type * as React from "react";

import { SconeButton, SconeCard } from "scone-ui";

import { SconeAdminLogo } from "../layout/scone-admin-logo";
import { familyRows } from "./page-data";

type WorkplaceProject = {
    name: string;
    description: string;
    team: string;
    time: string;
    icon: React.ReactNode;
};

type WorkplaceActivity = {
    user: string;
    team?: string;
    action: string;
    target: string;
    time: string;
};

const projects: WorkplaceProject[] = [
    {
        name: "SconeForm",
        description: "字段组合、校验反馈和禁用只读状态",
        team: "Input",
        time: "几秒内",
        icon: <ClipboardListIcon aria-hidden="true" />,
    },
    {
        name: "SconeTable",
        description: "列配置、空态和加载优先级",
        team: "Display",
        time: "9 年前",
        icon: <DatabaseIcon aria-hidden="true" />,
    },
    {
        name: "SconeMenu",
        description: "嵌套菜单、选中态和折叠密度",
        team: "Navigation",
        time: "几秒内",
        icon: <Layers3Icon aria-hidden="true" />,
    },
    {
        name: "DataTable",
        description: "筛选栏、工具栏和分页组合模式",
        team: "Pattern",
        time: "9 年前",
        icon: <FolderKanbanIcon aria-hidden="true" />,
    },
    {
        name: "SconeAlert",
        description: "反馈 tone、role 和恢复操作位置",
        team: "Feedback",
        time: "9 年前",
        icon: <ShieldCheckIcon aria-hidden="true" />,
    },
    {
        name: "SconeTabs",
        description: "分段页面、active 状态和焦点移动",
        team: "Navigation",
        time: "9 年前",
        icon: <BlocksIcon aria-hidden="true" />,
    },
];

const activities: WorkplaceActivity[] = [
    {
        user: "曲丽丽",
        team: "组件治理组",
        action: "新建项目",
        target: "六月迭代",
        time: "几秒内",
    },
    {
        user: "付小小",
        team: "Pattern 工作组",
        action: "补齐清单",
        target: "DataTable 验证",
        time: "几秒内",
    },
    {
        user: "林东东",
        team: "Navigation 组件组",
        action: "新建项目",
        target: "菜单密度校准",
        time: "几秒内",
    },
    {
        user: "周星星",
        action: "将",
        target: "5 月日常迭代更新至已发布状态",
        time: "几秒内",
    },
    {
        user: "朱偏右",
        team: "工程效能",
        action: "发布了",
        target: "组件测试留言",
        time: "几秒内",
    },
    {
        user: "乐哥",
        team: "程序员日常",
        action: "新建项目",
        target: "品牌迭代",
        time: "几秒内",
    },
];

const quickLinks = ["操作一", "操作二", "操作三", "操作四", "操作五", "操作六"];

const teamNames = [
    "Input 组件组",
    "Display 组件组",
    "Navigation 组件组",
    "Pattern 工作组",
    "Feedback 组件组",
    "工程效能",
];

const WorkflowCardTitle = ({
    title,
    action,
}: {
    title: string;
    action?: React.ReactNode;
}): React.JSX.Element => (
    <div className="scone-example-workplace-card-title">
        <span>{title}</span>
        {action ? <span className="scone-example-workplace-card-action">{action}</span> : null}
    </div>
);

export const WorkplacePage = (): React.JSX.Element => (
    <div className="scone-example-workplace">
        <section className="scone-example-workplace-hero" aria-labelledby="workplace-title">
            <div className="scone-example-workplace-breadcrumb">Dashboard / 工作台</div>
            <div className="scone-example-workplace-title-row">
                <h2 id="workplace-title">工作台</h2>
            </div>
            <div className="scone-example-workplace-intro">
                <div className="scone-example-workplace-profile">
                    <SconeAdminLogo size="lg" />
                    <div>
                        <p className="scone-example-workplace-greeting">
                            早安，组件维护者，祝你开心每一天！
                        </p>
                        <p className="scone-example-workplace-role">
                            交互专家 | scone-ui 组件库－治理工作台－示例应用－UED
                        </p>
                    </div>
                </div>
                <div className="scone-example-workplace-stats" aria-label="工作台指标">
                    <div>
                        <span>项目数</span>
                        <strong>56</strong>
                    </div>
                    <div>
                        <span>团队内排名</span>
                        <strong>
                            8 <em>/ 24</em>
                        </strong>
                    </div>
                    <div>
                        <span>项目访问</span>
                        <strong>2,223</strong>
                    </div>
                </div>
            </div>
        </section>

        <div className="scone-example-workplace-content">
            <div className="scone-example-workplace-main">
                <SconeCard
                    className="scone-example-workplace-card scone-example-workplace-project-card"
                    title={
                        <WorkflowCardTitle
                            title="进行中的项目"
                            action={
                                <a href="#all-projects" className="scone-example-workplace-link">
                                    全部项目
                                </a>
                            }
                        />
                    }
                >
                    <div className="scone-example-workplace-projects">
                        {projects.map((project) => (
                            <a
                                key={project.name}
                                href={`#${project.name.toLowerCase()}`}
                                className="scone-example-workplace-project"
                            >
                                <span className="scone-example-workplace-project-icon">
                                    {project.icon}
                                </span>
                                <span className="scone-example-workplace-project-body">
                                    <span className="scone-example-workplace-project-name">
                                        {project.name}
                                    </span>
                                    <span className="scone-example-workplace-project-description">
                                        {project.description}
                                    </span>
                                    <span className="scone-example-workplace-project-meta">
                                        <span>{project.team}</span>
                                        <time>{project.time}</time>
                                    </span>
                                </span>
                            </a>
                        ))}
                    </div>
                </SconeCard>

                <SconeCard
                    className="scone-example-workplace-card scone-example-workplace-activity-card"
                    title={<WorkflowCardTitle title="动态" />}
                >
                    <ol className="scone-example-workplace-activities">
                        {activities.map((activity) => (
                            <li key={`${activity.user}-${activity.target}`}>
                                <SconeAdminLogo size="sm" />
                                <div>
                                    <h3>
                                        <a href="#user">{activity.user}</a>
                                        {activity.team ? (
                                            <>
                                                <span> 在 </span>
                                                <a href="#team">{activity.team}</a>
                                            </>
                                        ) : (
                                            <span> </span>
                                        )}
                                        <span> {activity.action} </span>
                                        <a href="#target">{activity.target}</a>
                                    </h3>
                                    <time>{activity.time}</time>
                                </div>
                            </li>
                        ))}
                    </ol>
                </SconeCard>
            </div>

            <aside className="scone-example-workplace-side" aria-label="快捷工作区">
                <SconeCard
                    className="scone-example-workplace-card"
                    title={<WorkflowCardTitle title="快速开始 / 便捷导航" />}
                >
                    <div className="scone-example-workplace-quick-links">
                        {quickLinks.map((link) => (
                            <a key={link} href="#quick">
                                {link}
                            </a>
                        ))}
                        <SconeButton
                            size="sm"
                            variant="ghost"
                            className="scone-example-workplace-add"
                        >
                            <PlusIcon className="size-4" />
                            添加
                        </SconeButton>
                    </div>
                </SconeCard>

                <SconeCard
                    className="scone-example-workplace-card scone-example-workplace-index-card"
                    title={<WorkflowCardTitle title="XX 指数" />}
                >
                    <div className="scone-example-workplace-index">
                        <ChartNoAxesCombinedIcon aria-hidden="true" />
                        <span>78</span>
                        <p>组件库覆盖度、示例完整度和验证稳定性的综合指数</p>
                    </div>
                </SconeCard>

                <SconeCard
                    className="scone-example-workplace-card"
                    title={
                        <WorkflowCardTitle
                            title="团队"
                            action={<SettingsIcon className="size-4" aria-hidden="true" />}
                        />
                    }
                >
                    <div className="scone-example-workplace-teams">
                        {teamNames.map((team, index) => (
                            <a key={team} href="#team">
                                <span>
                                    {familyRows[index % familyRows.length].component.slice(0, 1)}
                                </span>
                                {team}
                            </a>
                        ))}
                    </div>
                </SconeCard>

                <SconeCard
                    className="scone-example-workplace-card scone-example-workplace-guide-card"
                    title={<WorkflowCardTitle title="组件库治理" />}
                >
                    <div className="scone-example-workplace-guide">
                        <SparklesIcon aria-hidden="true" />
                        <p>示例内容只表达组件库用法，不引入产品业务流程。</p>
                        <a href="#governance">
                            <GitPullRequestArrowIcon aria-hidden="true" />
                            查看迁移支持
                        </a>
                    </div>
                </SconeCard>
            </aside>
        </div>
    </div>
);
