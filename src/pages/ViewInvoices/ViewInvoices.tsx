import { useState } from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';
import { columns, defaultInvoice } from '@/constants';
import { DataTable, PreviewModal } from '@/components';

/**
 * ViewInvoices component
 * 
 * This component displays a table of all invoices
 * and allows the user to view a specific invoice in a modal.
 */
export const ViewInvoices: React.FC = () => {
    const { invoices, updateInvoice, setCurrentInvoice } = useInvoiceStore();
    const [openInvoicePreview, setOpenInvoicePreview] = useState(false);

    /**
     * Opens the modal to view an invoice
     * @param invoice The invoice to view
     */
    const openModal = (invoice: typeof defaultInvoice) => {
        setOpenInvoicePreview(true);
        setCurrentInvoice(invoice);
    };

    /**
     * Closes the modal
     */
    const closeModal = () => {
        setOpenInvoicePreview(false);
        setCurrentInvoice(defaultInvoice);
    };

    /**
     * Updates the status of an invoice
     * @param id The id of the invoice
     * @param newStatus The new status of the invoice
     */
    const handleStatusChange = (id: string, newStatus: 'outstanding' | 'paid' | 'late') => {
        updateInvoice(id, { status: newStatus });
    };

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-2xl font-bold mb-4">View Invoices</h2>
            <DataTable columns={columns} data={invoices} meta={{ handleStatusChange, openModal }} />
            {
                openInvoicePreview && <PreviewModal isOpen={openInvoicePreview} onClose={closeModal} />
            }
        </div>
    );
};