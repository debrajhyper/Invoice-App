import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Invoice, InvoiceTableMeta } from "@/constants/columns";
import { PageSize } from "./PageSize";
import { PageNumber } from "./PageNumber";
import { Pagination } from "./Pagination";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button, Input, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui";

interface DataTableProps {
    columns: ColumnDef<Invoice, InvoiceTableMeta>[]
    data: Invoice[]
    meta?: InvoiceTableMeta
}

/**
 * DataTable component for displaying invoices
 * @param {ColumnDef<Invoice, InvoiceTableMeta>[]} columns - array of column definitions
 * @param {Invoice[]} data - array of invoices
 * @param {InvoiceTableMeta} [meta] - optional meta data object
 * @returns {JSX.Element}
 */
export function DataTable({ columns, data, meta }: DataTableProps) {
    // State for sorting, column filters, column visibility and row selection
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    // Initialize table with react-table
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        meta,
    })

    // Render the table
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                {/* Input field for filtering invoices */}
                <Input
                    placeholder="Filter invoices..."
                    value={(table.getColumn("invoiceNumber")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("invoiceNumber")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {/* Dropdown menu for toggling column visibility */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {/* Iterate over all columns and render a dropdown menu item for each one */}
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                if (column.id === "invoiceNumber" || column.id === "status" || column.id === "actions") return null
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* Render the table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {/* Render the header groups */}
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {/* Render the header cells */}
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className={`px-0 ${header.column.id === "actions" ? "text-center" : ""} `}>
                                            {/* Render the header cell content */}
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {/* Render the rows */}
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {/* Render the cells */}
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className={`${cell.column.id === 'actions' ? 'text-center' : ''}`}>
                                            {/* Render the cell content */}
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No Invoice Found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* Render the pagination controls */}
            <div className="flex items-center justify-end space-x-10 py-4">
                <PageSize table={table} />
                {
                    table.getPageCount() > 0 &&
                    <PageNumber table={table} />
                }
                <Pagination table={table} />
            </div>
        </div>
    )
}
