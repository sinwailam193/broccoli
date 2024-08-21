import { useCallback, useState, useEffect } from "react";

import type { ChangeEvent } from "react";

import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../common/ui/dialog";
import { Input } from "../common/ui/input";
import { Button } from "../common/ui/button";
import { Label } from "../common/ui/label";

interface DialogModalProps {
    open: boolean;
}

export default function DialogModal({ open }: DialogModalProps) {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [confirmEmail, setConfirmEmail] = useState<string>("");

    useEffect(() => {
        // reset all values when dialog are closed
        if (!open) {
            setFullName("");
            setEmail("");
            setConfirmEmail("");
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

    return (
        <DialogContent
            className="sm:max-w-[600px]"
            aria-describedby={undefined}
        >
            <DialogHeader className="sm:text-center">
                <DialogTitle>Request an invite</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
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
                <div className="grid grid-cols-4 items-center gap-4">
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
                <div className="grid grid-cols-4 items-center gap-4">
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
            <DialogFooter>
                <Button type="submit">Send</Button>
            </DialogFooter>
        </DialogContent>
    );
}
