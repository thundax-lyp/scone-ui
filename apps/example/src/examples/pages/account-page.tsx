import type * as React from "react";
import { BriefcaseBusiness, Home, MapPin, MessageCircle, Plus, Star, ThumbsUp } from "lucide-react";

import { SconeCard, SconeTabs } from "scone-ui";

type ArticleItem = {
    title: string;
    author: string;
    avatar: string;
    publishedAt: string;
    stars: number;
    likes: number;
    comments: number;
};

type TeamItem = {
    name: string;
    mark: string;
    tone: "blue" | "red" | "cyan" | "purple" | "green" | "dark";
};

const accountTags = ["很有想法的", "专注设计", "辣~", "大长腿", "川妹子", "海纳百川"];

const teams: TeamItem[] = [
    { name: "科学搬砖组", mark: "科", tone: "blue" },
    { name: "全组都是吴彦祖", mark: "吴", tone: "red" },
    { name: "中二少女团", mark: "少", tone: "cyan" },
    { name: "程序员日常", mark: "程", tone: "purple" },
    { name: "高逼格设计天团", mark: "设", tone: "green" },
    { name: "骗你来学计算机", mark: "算", tone: "dark" },
];

const articles: ArticleItem[] = [
    {
        title: "Scone Shell",
        author: "付小小",
        avatar: "付",
        publishedAt: "2026-07-11 09:52",
        stars: 53,
        likes: 79,
        comments: 96,
    },
    {
        title: "Angular",
        author: "曲丽丽",
        avatar: "曲",
        publishedAt: "2026-07-10 14:40",
        stars: 36,
        likes: 36,
        comments: 78,
    },
    {
        title: "Scone UI",
        author: "林东东",
        avatar: "林",
        publishedAt: "2026-07-15 07:08",
        stars: 71,
        likes: 74,
        comments: 26,
    },
    {
        title: "Scone Admin",
        author: "周星星",
        avatar: "周",
        publishedAt: "2026-07-13 20:12",
        stars: 82,
        likes: 13,
        comments: 41,
    },
];

const ArticleList = (): React.JSX.Element => (
    <div className="scone-example-account-list">
        {articles.map((article) => (
            <article key={article.title} className="scone-example-account-article">
                <h3>{article.title}</h3>
                <div className="scone-example-account-tags">
                    <span>Scone UI</span>
                    <span>设计语言</span>
                    <span>组件治理</span>
                </div>
                <p>
                    段落示意：Scone UI 组件平台用最小的接入成本，沉淀稳定的后台组件、
                    设计 token 和示例模式，提供跨越设计与开发的体验解决方案。
                </p>
                <div className="scone-example-account-meta">
                    <span className="scone-example-account-mini-avatar">{article.avatar}</span>
                    <span>{article.author}</span>
                    <span>发布在</span>
                    <a href="#scone-ui-docs">Scone UI 文档</a>
                    <time>{article.publishedAt}</time>
                </div>
                <div className="scone-example-account-actions" aria-label={`${article.title} 反馈`}>
                    <span>
                        <Star aria-hidden="true" />
                        {article.stars}
                    </span>
                    <span>
                        <ThumbsUp aria-hidden="true" />
                        {article.likes}
                    </span>
                    <span>
                        <MessageCircle aria-hidden="true" />
                        {article.comments}
                    </span>
                </div>
            </article>
        ))}
    </div>
);

const ApplicationGrid = (): React.JSX.Element => (
    <div className="scone-example-account-apps">
        {["Scone UI", "Scone Admin", "Scone Docs", "Scone Patterns"].map((name) => (
            <div key={name} className="scone-example-account-app">
                <span>{name.slice(0, 1)}</span>
                <div>
                    <h3>{name}</h3>
                    <p>活跃用户 12,800，团队协作稳定运行中。</p>
                </div>
            </div>
        ))}
    </div>
);

const ProjectGrid = (): React.JSX.Element => (
    <div className="scone-example-account-projects">
        {["Scone Shell", "Scone Forms", "Scone UI", "React", "Vue", "Vite"].map((name) => (
            <div key={name} className="scone-example-account-project">
                <h3>{name}</h3>
                <p>那是一种内在的东西，他们到达不了，也无法触及。</p>
            </div>
        ))}
    </div>
);

export const AccountPage = (): React.JSX.Element => (
    <div className="scone-example-account-page">
        <SconeCard className="scone-example-account-profile-card">
            <div className="scone-example-account-profile">
                <div className="scone-example-account-avatar" aria-hidden="true">
                    <span />
                </div>
                <h2>Serati Ma</h2>
                <p>海纳百川，有容乃大</p>
            </div>

            <dl className="scone-example-account-bio">
                <div>
                    <dt>
                        <BriefcaseBusiness aria-hidden="true" />
                    </dt>
                    <dd>交互专家</dd>
                </div>
                <div>
                    <dt>
                        <Home aria-hidden="true" />
                    </dt>
                    <dd>Scone UI 团队－组件平台－设计系统－体验工程</dd>
                </div>
                <div>
                    <dt>
                        <MapPin aria-hidden="true" />
                    </dt>
                    <dd>浙江省杭州市</dd>
                </div>
            </dl>

            <section className="scone-example-account-section" aria-labelledby="account-tags">
                <h3 id="account-tags">标签</h3>
                <div className="scone-example-account-tags">
                    {accountTags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                    <button type="button" aria-label="添加标签">
                        <Plus aria-hidden="true" />
                    </button>
                </div>
            </section>

            <section className="scone-example-account-section" aria-labelledby="account-team">
                <h3 id="account-team">团队</h3>
                <div className="scone-example-account-teams">
                    {teams.map((team) => (
                        <a key={team.name} href="#team">
                            <span data-tone={team.tone}>{team.mark}</span>
                            {team.name}
                        </a>
                    ))}
                </div>
            </section>
        </SconeCard>

        <SconeCard className="scone-example-account-content-card">
            <SconeTabs
                ariaLabel="个人中心内容"
                className="scone-example-account-tabs"
                defaultValue="articles"
                items={[
                    { value: "articles", label: "文章 (8)", content: <ArticleList /> },
                    { value: "apps", label: "应用 (8)", content: <ApplicationGrid /> },
                    { value: "projects", label: "项目 (8)", content: <ProjectGrid /> },
                ]}
            />
        </SconeCard>
    </div>
);
