import { CameraIcon } from "lucide-react";
import * as React from "react";

import { SconeAvatar, SconeButton, SconeInput, SconeTextArea } from "scone-ui";

const settingsNavItems = [
    { key: "basic", label: "基本设置", title: "基本设置" },
    { key: "security", label: "安全设置", title: "安全设置" },
    { key: "binding", label: "账号绑定", title: "账号绑定" },
    { key: "notification", label: "新消息通知", title: "新消息通知" },
] as const;

const securityItems = [
    { title: "账户密码", description: "当前密码强度：强", action: "修改" },
    { title: "密保手机", description: "已绑定手机：138****8293", action: "修改" },
    {
        title: "密保问题",
        description: "未设置密保问题，密保问题可有效保护账户安全",
        action: "设置",
    },
    { title: "备用邮箱", description: "已绑定邮箱：sco***nui.dev", action: "修改" },
    { title: "MFA 设备", description: "未绑定 MFA 设备，绑定后可进行二次确认", action: "绑定" },
] as const;

const bindingItems = [
    { title: "绑定 GitHub", description: "当前未绑定 GitHub 账号", action: "绑定" },
    { title: "绑定 Slack", description: "当前未绑定 Slack 账号", action: "绑定" },
    { title: "绑定 Figma", description: "当前未绑定 Figma 账号", action: "绑定" },
] as const;

const notificationItems = [
    { title: "账户密码", description: "其他用户的消息将以站内信的形式通知", action: "开启" },
    { title: "系统消息", description: "系统消息将以站内信的形式通知", action: "开启" },
    { title: "待办任务", description: "待办任务将以站内信的形式通知", action: "开启" },
] as const;

type SettingsNavKey = (typeof settingsNavItems)[number]["key"];

export const AccountSettingsPage = (): React.JSX.Element => {
    const [activeKey, setActiveKey] = React.useState<SettingsNavKey>("basic");
    const activeTitle =
        settingsNavItems.find((item) => item.key === activeKey)?.title ?? settingsNavItems[0].title;

    let panel: React.ReactNode;

    if (activeKey === "security") {
        panel = (
            <div className="scone-account-settings-list" aria-label="安全设置列表">
                {securityItems.map((item) => (
                    <div key={item.title} className="scone-account-settings-list-item">
                        <div>
                            <strong>{item.title}</strong>
                            <p>{item.description}</p>
                        </div>
                        <button type="button">{item.action}</button>
                    </div>
                ))}
            </div>
        );
    } else if (activeKey === "binding") {
        panel = (
            <div className="scone-account-settings-list" aria-label="账号绑定列表">
                {bindingItems.map((item) => (
                    <div key={item.title} className="scone-account-settings-list-item">
                        <div>
                            <strong>{item.title}</strong>
                            <p>{item.description}</p>
                        </div>
                        <button type="button">{item.action}</button>
                    </div>
                ))}
            </div>
        );
    } else if (activeKey === "notification") {
        panel = (
            <div className="scone-account-settings-list" aria-label="新消息通知列表">
                {notificationItems.map((item) => (
                    <div key={item.title} className="scone-account-settings-list-item">
                        <div>
                            <strong>{item.title}</strong>
                            <p>{item.description}</p>
                        </div>
                        <button type="button">{item.action}</button>
                    </div>
                ))}
            </div>
        );
    } else {
        panel = (
            <div className="scone-account-settings-body">
                <form className="scone-account-settings-form" aria-label="基本设置表单">
                    <label>
                        <span>邮箱</span>
                        <SconeInput
                            ariaLabel="邮箱"
                            defaultValue="scone@example.com"
                            type="email"
                        />
                    </label>
                    <label>
                        <span>昵称</span>
                        <SconeInput ariaLabel="昵称" defaultValue="Scone UI" />
                    </label>
                    <label>
                        <span>个人简介</span>
                        <SconeTextArea
                            ariaLabel="个人简介"
                            defaultValue="海纳百川，有容乃大"
                            autoSize
                        />
                    </label>
                    <label>
                        <span>国家 / 地区</span>
                        <select aria-label="国家 / 地区" defaultValue="china">
                            <option value="china">中国</option>
                        </select>
                    </label>
                    <label>
                        <span>所在省市</span>
                        <div className="scone-account-settings-location">
                            <select aria-label="省份" defaultValue="zhejiang">
                                <option value="zhejiang">浙江省</option>
                            </select>
                            <select aria-label="城市" defaultValue="hangzhou">
                                <option value="hangzhou">杭州市</option>
                            </select>
                        </div>
                    </label>
                    <label>
                        <span>街道地址</span>
                        <SconeInput ariaLabel="街道地址" defaultValue="西湖区工专路 77 号" />
                    </label>
                    <label>
                        <span>联系电话</span>
                        <SconeInput ariaLabel="联系电话" defaultValue="0752-268888888" />
                    </label>
                    <SconeButton className="scone-account-settings-submit">
                        更新基本信息
                    </SconeButton>
                </form>

                <div className="scone-account-settings-avatar">
                    <span>头像</span>
                    <SconeAvatar
                        size="lg"
                        shape="circle"
                        fallback="A"
                        className="scone-account-settings-avatar-image"
                    />
                    <SconeButton variant="outline" className="scone-account-settings-upload">
                        <CameraIcon aria-hidden="true" />
                        更换头像
                    </SconeButton>
                </div>
            </div>
        );
    }

    return (
        <section className="scone-account-settings-page" aria-labelledby="account-settings-title">
            <aside className="scone-account-settings-nav" aria-label="个人设置导航">
                {settingsNavItems.map((item) => (
                    <button
                        key={item.key}
                        type="button"
                        aria-current={item.key === activeKey ? "page" : undefined}
                        onClick={() => setActiveKey(item.key)}
                    >
                        {item.label}
                    </button>
                ))}
            </aside>

            <div className="scone-account-settings-content">
                <h2 id="account-settings-title">{activeTitle}</h2>
                {panel}
            </div>
        </section>
    );
};
