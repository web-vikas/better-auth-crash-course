"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { syncAvatars } from "../action";
import { LoadingSwap } from "@/components/ui/loading-swap";

export function SyncButton() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSync = () => {
        startTransition(async () => {
            try {
                await syncAvatars();
                toast.success("Avatars synced successfully!");
                router.refresh();
            } catch (error) {
                toast.error("Failed to sync avatars");
                console.error(error);
            }
        });
    };

    return (
        <Button onClick={handleSync} disabled={isPending}>
            <LoadingSwap
                isLoading={isPending}
                className="inline-flex items-center gap-2"
            >
                {isPending ? "Syncing..." : "Sync With Provider"}
            </LoadingSwap>
        </Button>
    );
}