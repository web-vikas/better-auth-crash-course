
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SearchAndPaginationProps {
    totalItems: number;
    currentPage: number;
    perPage: number;
    searchValue: string;
    showSearch?: boolean;
    showPagination?: boolean;
}

export function SearchAndPagination({
    totalItems,
    currentPage,
    perPage,
    searchValue,
    showSearch = true,
    showPagination = true,
}: SearchAndPaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState(searchValue);

    const totalPages = Math.ceil(totalItems / perPage);
    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, totalItems);

    const updateURL = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        console.log(params);
        console.log(key, value);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        // Reset to page 1 when searching
        if (key === "search") {
            params.set("page", "1");
            params.set("perPage", perPage.toString());
        }

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        const timeoutId = setTimeout(() => {
            updateURL("search", value);
        }, 500);

        return () => clearTimeout(timeoutId);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            updateURL("page", page.toString());
        }
    };

    const handlePerPageChange = (value: string) => {
        updateURL("perPage", value);
        updateURL("page", "1");
    };

    const clearSearch = () => {
        setSearch("");
        updateURL("search", "");
    };

    return (
        <div className="px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-y">
            {showSearch && (
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search avatars..."
                        className="pl-10 pr-10"
                    />
                    {search && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={clearSearch}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        >
                            <X size={16} />
                        </Button>
                    )}
                </div>
            )}

            {showPagination && (
                <div className="flex items-center gap-4 justify-end w-full">
                    <div className="flex items-center gap-2">
                        <Select
                            value={perPage.toString()}
                            onValueChange={handlePerPageChange}
                        >
                            <SelectTrigger className="w-[70px]" disabled>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="8">8</SelectItem>
                                <SelectItem value="16">16</SelectItem>
                                <SelectItem value="24">24</SelectItem>
                                <SelectItem value="32">32</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-sm text-muted-foreground">per page</span>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        {startItem}-{endItem} of {totalItems}
                    </div>

                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1 || isPending}
                            aria-label="First page"
                        >
                            <ChevronsLeft size={18} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || isPending}
                            aria-label="Previous page"
                        >
                            <ChevronLeft size={18} />
                        </Button>
                        <span className="px-4 py-2 text-sm">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || isPending}
                            aria-label="Next page"
                        >
                            <ChevronRight size={18} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages || isPending}
                            aria-label="Last page"
                        >
                            <ChevronsRight size={18} />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}