import { render, screen } from "@testing-library/react";

import { App } from "./app";

describe("App", () => {
    it("renders the component library example", () => {
        render(<App />);

        expect(screen.getByRole("main", { name: "Component library example" })).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: "scone-ui component library", level: 1 }),
        ).toBeInTheDocument();
        expect(screen.getByRole("status")).toHaveTextContent("Library boundary");
        expect(screen.getByRole("searchbox", { name: "Search" })).toHaveAttribute(
            "placeholder",
            "Search component families",
        );
        expect(screen.getByRole("table", { name: "Release queue" })).toBeInTheDocument();
        expect(screen.getByRole("cell", { name: "Admin patterns" })).toBeInTheDocument();
    });
});
