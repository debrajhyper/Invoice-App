import { create } from 'zustand';
import { defaultInvoice } from '@/constants';
import { generateInvoiceNumber, generateUUID } from '@/utils';

/**
 * The invoice store
 *
 * This store holds the state of all invoices, the current invoice being edited,
 * and methods to update the state of the invoices and the current invoice.
 */
interface InvoiceState {
    /**
     * The array of all invoices
     */
    invoices: typeof defaultInvoice[];
    /**
     * The current invoice being edited
     */
    currentInvoice: typeof defaultInvoice;
    /**
     * Set the current invoice
     *
     * @param invoice The partial invoice object to update the current invoice with
     */
    setCurrentInvoice: (invoice: Partial<typeof defaultInvoice>) => void;
    /**
     * Add a new invoice to the list of invoices
     *
     * @param invoice The new invoice to add
     */
    addInvoice: (invoice: typeof defaultInvoice) => void;
    /**
     * Update an existing invoice in the list of invoices
     *
     * @param id The id of the invoice to update
     * @param invoice The partial invoice object to update the invoice with
     */
    updateInvoice: (id: string, invoice: Partial<typeof defaultInvoice>) => void;
}

/**
 * The hook to use the invoice store
 *
 * This hook returns the current state of the invoice store and the methods to
 * update the state of the invoices and the current invoice.
 */
export const useInvoiceStore = create<InvoiceState>((set) => ({
    /**
     * The initial state of the invoices
     */
    invoices: [],
    /**
     * The initial state of the current invoice
     */
    currentInvoice: {
        ...defaultInvoice,
        id: generateUUID(),
        details: {
            ...defaultInvoice.details,
            invoiceNumber: generateInvoiceNumber()
        }
    },
    /**
     * Set the current invoice
     *
     * This method updates the current invoice with the given partial invoice object.
     * If the given invoice does not have an id, a new id is generated.
     * If the given invoice does not have an invoice number, a new invoice number is generated.
     *
     * @param invoice The partial invoice object to update the current invoice with
     */
    setCurrentInvoice: (invoice) => set((state) => ({
        currentInvoice: {
            ...state.currentInvoice,
            ...invoice,
            id: invoice.id || state.currentInvoice.id || generateUUID(),
            details: {
                ...state.currentInvoice.details,
                ...invoice.details,
                invoiceNumber: invoice.details?.invoiceNumber || state.currentInvoice.details.invoiceNumber || generateInvoiceNumber()
            }
        }
    })),
    /**
     * Add a new invoice to the list of invoices
     *
     * This method adds the given invoice to the list of invoices.
     *
     * @param invoice The new invoice to add
     */
    addInvoice: (invoice) => set((state) => ({
        invoices: [...state.invoices, invoice],
    })),
    /**
     * Update an existing invoice in the list of invoices
     *
     * This method updates the invoice with the given id with the given partial
     * invoice object.
     *
     * @param id The id of the invoice to update
     * @param invoice The partial invoice object to update the invoice with
     */
    updateInvoice: (id, invoice) => set((state) => ({
        invoices: state.invoices.map((inv) => inv.id === id ? { ...inv, ...invoice } : inv)
    })),
}));