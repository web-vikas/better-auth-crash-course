import { PageHeader } from "@/components/page-header";
import DashboardLayout from "@/layouts/dashboard-layout";
import { User2 } from "lucide-react";
import { getAllAvatars } from "./action";
import { SyncButton } from "./_components/sync-button";
import { AvatarGrid } from "./_components/avatar-grid";
import { SearchAndPagination } from "./_components/search-and-pagination";

interface PageProps {
    searchParams: {
        page?: string;
        search?: string;
        perPage?: string;
    };
}

export default async function Avatars({ searchParams }: PageProps) {
    const params = await searchParams
    const page = Number(params.page) || 1;
    const perPage = Number(params.perPage) || 16;
    const search = params.search || "";

    const avatars = await getAllAvatars({
        page,
        perPage,
        search,
    });

    return (
        <DashboardLayout>
            <PageHeader
                icon={<User2 />}
                title="Avatars"
                description="Avatars are used to represent a user or an entity."
                count={avatars.meta.total}
                actionButton={<SyncButton />}
            />
            <div className="border">

                <SearchAndPagination
                    totalItems={avatars.meta.total}
                    currentPage={page}
                    perPage={perPage}
                    searchValue={search}
                    showPagination={false}
                />

                <AvatarGrid avatars={avatars.data} />

                <SearchAndPagination
                    totalItems={avatars.meta.total}
                    currentPage={page}
                    perPage={perPage}
                    searchValue={search}
                    showSearch={false}
                />
            </div>
        </DashboardLayout>
    );
}