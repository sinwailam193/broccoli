import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { API_URL } from "../../const";
import { Dialog } from "../../common/ui/dialog";
import { DialogModal } from "../../components";

const server = setupServer(
    http.post(`${API_URL}/fake-auth`, () => {
        return HttpResponse.json("Registered");
    })
);

describe("DialogModal", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("renders DialogModal component", () => {
        const dialogOpen = true;
        render(
            <Dialog open={dialogOpen} onOpenChange={() => {}}>
                <DialogModal open={dialogOpen} />
            </Dialog>
        );

        const component = screen.queryByText(/Request an invite/i);
        expect(component).toBeVisible();
    });

    it("dialogOpen is false, should not render the component", () => {
        const dialogOpen = false;
        render(
            <Dialog open={dialogOpen} onOpenChange={() => {}}>
                <DialogModal open={dialogOpen} />
            </Dialog>
        );

        const component = screen.queryByText(/Request an invite/i);
        expect(component).toEqual(null);
    });

    it("updating input values should reflect the change", () => {
        const dialogOpen = true;
        render(
            <Dialog open={dialogOpen} onOpenChange={() => {}}>
                <DialogModal open={dialogOpen} />
            </Dialog>
        );

        const fullNameInput = screen.getByLabelText(
            "fullName-input"
        ) as HTMLInputElement;
        fireEvent.change(fullNameInput, { target: { value: "Test Name" } });
        expect(fullNameInput.value).toBe("Test Name");

        const emailInput = screen.getByLabelText(
            "email-input"
        ) as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: "aweasd@test.com" } });
        expect(emailInput.value).toBe("aweasd@test.com");

        const confirmEmailInput = screen.getByLabelText(
            "confirmEmail-input"
        ) as HTMLInputElement;
        fireEvent.change(confirmEmailInput, {
            target: { value: "aweasd@test.com" },
        });
        expect(confirmEmailInput.value).toBe("aweasd@test.com");
    });

    it("should show error if fullName is less than 3 characters", async () => {
        const dialogOpen = true;
        render(
            <Dialog open={dialogOpen} onOpenChange={() => {}}>
                <DialogModal open={dialogOpen} />
            </Dialog>
        );

        const fullNameInput = screen.getByLabelText(
            "fullName-input"
        ) as HTMLInputElement;
        fireEvent.change(fullNameInput, { target: { value: "ac" } });

        await userEvent.click(screen.getByRole("button", { name: "Send" }));

        const component = screen.queryByText(
            /Full name needs to be at least 3 characters long./i
        );
        expect(component).toBeVisible();
    });

    it("should show error if email is not valid", async () => {
        const dialogOpen = true;
        render(
            <Dialog open={dialogOpen} onOpenChange={() => {}}>
                <DialogModal open={dialogOpen} />
            </Dialog>
        );

        // update fullName to get to email validation
        const fullNameInput = screen.getByLabelText(
            "fullName-input"
        ) as HTMLInputElement;
        fireEvent.change(fullNameInput, { target: { value: "acasda" } });

        const emailInput = screen.getByLabelText(
            "email-input"
        ) as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: "acasdasd" } });

        await userEvent.click(screen.getByRole("button", { name: "Send" }));

        const component = screen.queryByText(/Email is not valid/i);
        expect(component).toBeVisible();
    });

    it("should show error if confirm email is not the same email", async () => {
        const dialogOpen = true;
        render(
            <Dialog open={dialogOpen} onOpenChange={() => {}}>
                <DialogModal open={dialogOpen} />
            </Dialog>
        );

        // update fullName to get to confirm email validation
        const fullNameInput = screen.getByLabelText(
            "fullName-input"
        ) as HTMLInputElement;
        fireEvent.change(fullNameInput, { target: { value: "acasda" } });
        const emailInput = screen.getByLabelText(
            "email-input"
        ) as HTMLInputElement;
        fireEvent.change(emailInput, {
            target: { value: "acasdasd@test.com" },
        });

        const confirmEmailInput = screen.getByLabelText(
            "confirmEmail-input"
        ) as HTMLInputElement;
        fireEvent.change(confirmEmailInput, {
            target: { value: "acasdasd@test1.com" },
        });

        await userEvent.click(screen.getByRole("button", { name: "Send" }));

        const component = screen.queryByText(
            /Email and confirm email do not match./i
        );
        expect(component).toBeVisible();
    });

    it("modal should update successfully if send is successful", async () => {
        const dialogOpen = true;
        render(
            <Dialog open={dialogOpen} onOpenChange={() => {}}>
                <DialogModal open={dialogOpen} />
            </Dialog>
        );

        const fullNameInput = screen.getByLabelText(
            "fullName-input"
        ) as HTMLInputElement;
        fireEvent.change(fullNameInput, { target: { value: "Test Name" } });
        const emailInput = screen.getByLabelText(
            "email-input"
        ) as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: "aweasd@test.com" } });
        const confirmEmailInput = screen.getByLabelText(
            "confirmEmail-input"
        ) as HTMLInputElement;
        fireEvent.change(confirmEmailInput, {
            target: { value: "aweasd@test.com" },
        });

        await userEvent.click(screen.getByRole("button", { name: "Send" }));

        // should render the successful UI modal
        const component = screen.queryByText(/All done!/i);
        expect(component).toBeVisible();
    });

    describe("show error when API return error", () => {
        const errorServer = setupServer(
            http.post(`${API_URL}/fake-auth`, () => {
                return new HttpResponse(
                    JSON.stringify({
                        errorMessage: "Bad Request: Email is already in use",
                    }),
                    { status: 400 }
                );
            })
        );

        beforeAll(() => {
            server.close();
            errorServer.listen();
        });
        afterEach(() => errorServer.resetHandlers());
        afterAll(() => {
            errorServer.close();
            server.listen();
        });

        it("should display the error", async () => {
            const dialogOpen = true;
            render(
                <Dialog open={dialogOpen} onOpenChange={() => {}}>
                    <DialogModal open={dialogOpen} />
                </Dialog>
            );

            const fullNameInput = screen.getByLabelText(
                "fullName-input"
            ) as HTMLInputElement;
            fireEvent.change(fullNameInput, { target: { value: "Test Name" } });
            const emailInput = screen.getByLabelText(
                "email-input"
            ) as HTMLInputElement;
            fireEvent.change(emailInput, {
                target: { value: "usedemail@airwallex.com" },
            });
            const confirmEmailInput = screen.getByLabelText(
                "confirmEmail-input"
            ) as HTMLInputElement;
            fireEvent.change(confirmEmailInput, {
                target: { value: "usedemail@airwallex.com" },
            });

            await userEvent.click(screen.getByRole("button", { name: "Send" }));

            const component = screen.queryByText(/Email is already in use/i);
            expect(component).toBeVisible();
        });
    });
});
