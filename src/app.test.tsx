import { render, screen } from "@testing-library/react";

import { App } from "./app";

describe("App", () => {
    it("renders the demo entry shell", () => {
        render(<App />);

        expect(screen.getByRole("main")).toBeInTheDocument();
        expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
    });
});
