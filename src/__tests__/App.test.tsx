import { render, screen } from "@testing-library/react";

import App from "../App";

describe("App", () => {
    it("renders App component", () => {
        render(<App />);

        const component = screen.queryByText(
            /A better way to enjoy every day./i
        );
        expect(component).toBeVisible();
    });
});
