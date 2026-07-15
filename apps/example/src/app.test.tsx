import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { App } from "./app";

describe("App", () => {
    beforeEach(() => {
        window.history.replaceState(null, "", "/");
    });

    it("renders the admin component example shell and switches menu sections", async () => {
        render(<App />);

        expect(
            screen.getByRole("main", { name: "Scone UI component example" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: "分析页 / Analysis", level: 1 }),
        ).toBeInTheDocument();
        await waitFor(() => expect(window.location.pathname).toBe("/dashboard/analysis"));
        expect(
            screen.getByRole("navigation", { name: "组件示例 / Component examples" }),
        ).toBeInTheDocument();
        expect(screen.getByRole("searchbox", { name: "Search" })).toHaveAttribute(
            "placeholder",
            "搜索组件 / Search components",
        );
        expect(
            screen.getByRole("table", { name: "组件发布队列 / Component release queue" }),
        ).toBeInTheDocument();
        expect(screen.getAllByLabelText("Scone Admin").length).toBeGreaterThan(0);

        fireEvent.click(screen.getByRole("button", { name: "下一页" }));
        expect(screen.getByRole("cell", { name: "SconeTabs" })).toBeInTheDocument();

        fireEvent.click(screen.getByRole("menuitem", { name: "表单页" }));
        fireEvent.click(screen.getByRole("menuitem", { name: "基础表单" }));

        expect(
            screen.getByRole("heading", { name: "基础表单 / Basic Form", level: 1 }),
        ).toBeInTheDocument();
        expect(window.location.pathname).toBe("/form/basic-form");
        expect(screen.getByRole("textbox", { name: "标题" })).toBeInTheDocument();

        fireEvent.click(screen.getByRole("menuitem", { name: "列表页" }));
        fireEvent.click(screen.getByRole("menuitem", { name: "查询表格" }));

        expect(screen.getByRole("table", { name: "查询表格" })).toBeInTheDocument();
        expect(window.location.pathname).toBe("/list/table-list");
        expect(screen.getByRole("cell", { name: "TradeCode 99" })).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: "Next" }));
        expect(screen.getByRole("cell", { name: "TradeCode 93" })).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: "新建" }));
        expect(screen.getByRole("cell", { name: "TradeCode 100" })).toBeInTheDocument();
        expect(screen.getByText("1-5 / 8")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("menuitem", { name: "标准列表" }));

        expect(
            screen.getByRole("heading", { name: "标准列表 / Basic List", level: 1 }),
        ).toBeInTheDocument();
        expect(window.location.pathname).toBe("/list/basic-list");
        expect(screen.getByRole("searchbox", { name: "标准列表搜索" })).toHaveAttribute(
            "placeholder",
            "请输入",
        );
        expect(screen.getByText("Scone Shell")).toBeInTheDocument();
    });
});
