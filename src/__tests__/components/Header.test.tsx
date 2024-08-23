import { render, screen } from "@testing-library/react";

import { Header } from "../../components";

describe("Header", () => {
    it("renders Header component", () => {
        render(<Header />);

        const component = screen.getByRole("link", { name: "Broccoli & Co" });
        expect(component).toHaveAttribute("href", "#");
    });
});
