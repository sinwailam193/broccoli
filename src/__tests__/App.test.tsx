import { render, screen } from "@testing-library/react";

import App from "../App";

describe("App", () => {
    it("renders App component", async () => {
        render(<App />);

        const component = await screen.queryByText(
            /A better way to enjoy every day./i
        );
        expect(component).toBeVisible();
    });
});
