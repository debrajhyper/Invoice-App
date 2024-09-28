import { Table } from "@tanstack/table-core";
import { InvoiceFormValues } from "@/constants/defaultInvoice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";

/**
 * Component to change the page size of the table
 * 
 * @param {Table<InvoiceFormValues>} table The table instance
 * @returns {JSX.Element} The PageSize component
 */
export const PageSize: React.FC<{ table: Table<InvoiceFormValues> }> = ({ table }) => (
    <div className="flex items-center space-x-2">
        {/* Display the current page size and a dropdown to change it */}
        <span className="text-sm font-semibold whitespace-nowrap">Rows per page</span>
        <Select
            /**
             * When the user selects a new page size, update the table state
             * @param {string} value The new page size as a string
             */
            onValueChange={(value) => table.setPageSize(Number(value))}
            /** Set the default value to the current page size */
            defaultValue={String(table.getState().pagination.pageSize)}
        >
            <SelectTrigger className="w-16 h-fit text-xs">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {/* Display options for different page sizes */}
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                        {pageSize}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
)