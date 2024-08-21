import { useState } from "react";

import { Dialog, DialogTrigger } from "../common/ui/dialog";
import DialogModal from "./DialogModal";

export default function Content() {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    return (
        <div className="bg-white">
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            A better way to enjoy every day.
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Be the first to know when this is launched.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Dialog
                                open={dialogOpen}
                                onOpenChange={(value) => setDialogOpen(value)}
                            >
                                <DialogTrigger asChild>
                                    <a
                                        href="#"
                                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Request invite
                                    </a>
                                </DialogTrigger>
                                <DialogModal open={dialogOpen} />
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
