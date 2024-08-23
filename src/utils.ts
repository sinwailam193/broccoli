import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function validateFormInput(
    fullName: string,
    email: string,
    confirmEmail: string
) {
    if (!fullName) {
        return "Full name is required.";
    }
    if (fullName.length < 3) {
        return "Full name needs to be at least 3 characters long.";
    }

    if (!email) {
        return "Email is required";
    }
    const validateEmailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validateEmailRegex)) {
        return "Email is not valid";
    }

    if (!confirmEmail) {
        return "Confirm email is required";
    }

    if (email !== confirmEmail) {
        return "Email and confirm email do not match.";
    }

    return "";
}
