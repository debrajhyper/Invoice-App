import { ColumnDef } from "@tanstack/react-table";
import { StatusDisplay } from "@/components";
import { defaultInvoice } from "./defaultInvoice";
import { ArrowUpDown, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button } from "@/components/ui";

/**
 * Invoice type with all the properties
 */
export type Invoice = typeof defaultInvoice

/**
 * InvoiceTableMeta type with functions to handle status change and open modal
 */
export type InvoiceTableMeta = {
    /**
     * Function to handle status change
     * @param id Invoice id
     * @param status New status
     */
    handleStatusChange: (id: string, status: 'outstanding' | 'paid' | 'late') => void
    /**
     * Function to open modal
     * @param invoice Invoice object
     */
    openModal: (invoice: Invoice) => void
}

/**
 * Columns definition for the invoice table
 */
export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "invoiceNumber",
        /**
         * Function to access the invoice number from the invoice object
         * @param row Invoice object
         */
        accessorFn: (row) => row.details.invoiceNumber,
        header: () => (
            <Button variant="ghost" className="hover:bg-transparent">
                Invoice #
            </Button>
        ),
    },
    {
        accessorKey: "name",
        /**
         * Function to access the client name from the invoice object
         * @param row Invoice object
         */
        accessorFn: (row) => row.receiver.name,
        header: ({ column }) => (
            <Button variant="ghost" className="hover:bg-transparent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Client
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "phone",
        /**
         * Function to access the client phone from the invoice object
         * @param row Invoice object
         */
        accessorFn: (row) => row.receiver.phone,
        header: () => (
            <Button variant="ghost" className="hover:bg-transparent">
                Phone
            </Button>
        )
    },
    {
        accessorKey: "totalAmount",
        /**
         * Function to access the total amount from the invoice object
         * @param row Invoice object
         */
        accessorFn: (row) => row.details.totalAmount,
        header: ({ column }) => (
            <Button variant="ghost" className="hover:bg-transparent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Amount
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalAmount"))
            const formatted = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: row.original.details.currency.code,
            }).format(amount)
            return <div>{formatted}</div>
        },
    },
    {
        accessorKey: "invoiceDate",
        /**
         * Function to access the invoice date from the invoice object
         * @param row Invoice object
         */
        accessorFn: (row) => row.details.invoiceDate,
        header: ({ column }) => (
            <Button variant="ghost" className="hover:bg-transparent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Invoice Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => new Date(row.getValue("invoiceDate")).toLocaleDateString(),
    },
    {
        accessorKey: "dueDate",
        /**
         * Function to access the due date from the invoice object
         * @param row Invoice object
         */
        accessorFn: (row) => row.details.dueDate,
        header: ({ column }) => (
            <Button variant="ghost" className="hover:bg-transparent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Due Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => new Date(row.getValue("dueDate")).toLocaleDateString(),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button variant="ghost" className="hover:bg-transparent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row, table }) => {
            const meta = table.options.meta as InvoiceTableMeta | undefined
            return <Select defaultValue={row.original.status} onValueChange={(value) => meta?.handleStatusChange(row.original.id, value as 'outstanding' | 'paid' | 'late')}>
                <SelectTrigger className="w-44">
                    <SelectValue placeholder="Select a status">
                        <StatusDisplay status={row.original.status} />
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="outstanding" className="cursor-pointer">
                        <StatusDisplay status="outstanding" />
                    </SelectItem>
                    <SelectItem value="paid" className="cursor-pointer">
                        <StatusDisplay status="paid" />
                    </SelectItem>
                    <SelectItem value="late" className="cursor-pointer">
                        <StatusDisplay status="late" />
                    </SelectItem>
                </SelectContent>
            </Select>
        },
    },
    {
        id: "actions",
        header: () => (
            <Button variant="ghost" className="hover:bg-transparent">
                Actions
            </Button>
        ),
        cell: ({ row, table }) => {
            const meta = table.options.meta as InvoiceTableMeta | undefined
            return <Button variant="outline" className="self-center" size="sm" onClick={() => meta?.openModal(row.original)}>
                <Eye className="mr-2 h-4 w-4" />
                View
            </Button>
        },
    },
];
