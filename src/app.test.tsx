import { render, screen } from "@testing-library/react";

import { App } from "./app";

describe("App", () => {
    it("renders the project heading", () => {
        render(<App />);

        expect(
            screen.getByRole("heading", {
                name: "React + TailwindCSS frontend project",
            }),
        ).toBeInTheDocument();
    });
});
