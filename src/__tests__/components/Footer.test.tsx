import { render, screen } from "@testing-library/react";

import { Footer } from "../../components";

describe("Footer", () => {
    it("renders Footer component", () => {
        render(<Footer />);

        const component = screen.queryByText(
            /Broccoli & Co. All rights reserved./i
        );
        expect(component).toBeVisible();
    });
});
