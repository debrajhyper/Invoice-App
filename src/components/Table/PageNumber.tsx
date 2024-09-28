import { Table } from "@tanstack/react-table";
import { InvoiceFormValues } from "@/constants/defaultInvoice";

/**
 * Component to display the current page number and total page count
 */
export const PageNumber: React.FC<{ table: Table<InvoiceFormValues> }> = ({ table }) => (
    <span className="flex items-center space-x-2">
        <span>Page</span>
        <span>
            <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
        </span>
    </span>
)