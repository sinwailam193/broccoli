import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Content } from "../../components";

describe("Content", () => {
    it("renders Content component", () => {
        render(<Content />);

        const titleText = screen.queryByText(
            /A better way to enjoy every day./i
        );
        const subtitleText = screen.queryByText(
            /Be the first to know when this is launched./i
        );
        expect(titleText).toBeVisible();
        expect(subtitleText).toBeVisible();
    });

    it('clicking "Request invite" should trigger dialogOpen state', async () => {
        render(<Content />);

        await userEvent.click(
            screen.getByRole("link", { name: "Request invite" })
        );

        // clicking request invite should trigger the dialog to appear with the title Request an invite
        const component = screen.queryByText(/Request an invite/i);
        expect(component).toBeVisible();
    });
});
