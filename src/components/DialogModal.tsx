import { useCallback, useState, useEffect } from "react";

import type { ChangeEvent, SyntheticEvent } from "react";

import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../common/ui/dialog";
import { Input } from "../common/ui/input";
import { Button } from "../common/ui/button";
import { Label } from "../common/ui/label";
import { validateFormInput } from "../utils";
import { API_URL } from "../const";

interface DialogModalProps {
    open: boolean;
}

export default function DialogModal({ open }: DialogModalProps) {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [confirmEmail, setConfirmEmail] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

    useEffect(() => {
        // reset all values when dialog are closed
        if (!open) {
            setFullName("");
            setEmail("");
            setConfirmEmail("");
            setRegisterSuccess(false);
            setErrorMessage("");
        }
    }, [open]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case "fullName":
                setFullName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "confirmEmail":
                setConfirmEmail(value);
                break;
            default:
                break;
        }
    }, []);

    const handleSubmit = useCallback(
        async (event: SyntheticEvent) => {
            event.preventDefault();

            const result = validateFormInput(fullName, email, confirmEmail);
            if (result) {
                setErrorMessage(result);
                return;
            }
            setErrorMessage("");
            setIsLoading(true);

            try {
                const result = await fetch(`${API_URL}/fake-auth`, {
                    method: "POST",
                    body: JSON.stringify({
                        name: fullName.trim(),
                        email: email.trim(),
                    }),
                }).then(async (res) => {
                    if (!res.ok) {
                        const errorText = await res.json();
                        throw errorText.errorMessage;
                    }

                    return res.json();
                });
                setRegisterSuccess(result === "Registered");
            } catch (err: unknown) {
                const error = err as Error;
                const errorText = error.toString();
                // remove of "Bad Request: " in the beginning
                setErrorMessage(errorText.replace(/Bad Request: /g, ""));
            } finally {
                setIsLoading(false);
            }
        },
        [fullName, email, confirmEmail]
    );

    function renderContent() {
        if (registerSuccess) {
            return (
                <div className="my-12 px-4">
                    <p className="text-center">
                        You will be receiving an email to be notified when we
                        launched Broccoli & Co
                    </p>
                </div>
            );
        }

        return (
            <div className="grid gap-4 py-4">
                <div className="items-center space-y-2">
                    <Label htmlFor="name" className="text-right">
                        Full name
                    </Label>
                    <Input
                        placeholder="Enter your full name"
                        name="fullName"
                        value={fullName}
                        className="col-span-3"
                        onChange={handleChange}
                    />
                </div>
                <div className="items-center space-y-2">
                    <Label htmlFor="name" className="text-right">
                        Email
                    </Label>
                    <Input
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        className="col-span-3"
                        onChange={handleChange}
                    />
                </div>
                <div className="items-center space-y-2">
                    <Label htmlFor="username" className="text-right">
                        Confirm email
                    </Label>
                    <Input
                        placeholder="Confirm your email"
                        name="confirmEmail"
                        value={confirmEmail}
                        className="col-span-3"
                        onChange={handleChange}
                    />
                </div>
            </div>
        );
    }

    return (
        <DialogContent
            className="sm:max-w-[600px] py-20 px-10"
            aria-describedby={undefined}
        >
            <DialogHeader className="sm:text-center">
                <DialogTitle>
                    {registerSuccess ? "All done!" : "Request an invite"}
                </DialogTitle>
            </DialogHeader>
            {renderContent()}
            <DialogFooter className="w-full">
                {registerSuccess ? (
                    <DialogTrigger asChild>
                        <Button type="submit">ok</Button>
                    </DialogTrigger>
                ) : (
                    <>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                            onClick={handleSubmit}
                        >
                            {isLoading ? "Sending, please wait..." : "Send"}
                        </Button>
                        {errorMessage && (
                            <div className="mt-2 text-center">
                                <p className="text-red-400">{errorMessage}</p>
                            </div>
                        )}
                    </>
                )}
            </DialogFooter>
        </DialogContent>
    );
}
