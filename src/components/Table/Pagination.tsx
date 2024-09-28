import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui";
import { InvoiceFormValues } from "@/constants/defaultInvoice";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

/**
 * Pagination component for navigating through table pages
 * @param {Table<InvoiceFormValues>} table - tanstack/react-table instance
 * @returns {JSX.Element} - pagination buttons
 */
export const Pagination = ({ table }: { table: Table<InvoiceFormValues> }) => (
    <div className="space-x-2">
        {/* Go to first page button */}
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
        >
            <ChevronsLeft className="h-4 w-auto" />
        </Button>
        {/* Previous page button */}
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
        >
            <ChevronLeft className="h-4 w-auto" />
        </Button>
        {/* Next page button */}
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
        >
            <ChevronRight className="h-4 w-auto" />
        </Button>
        {/* Go to last page button */}
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
        >
            <ChevronsRight className="h-4 w-auto" />
        </Button>
    </div>
)