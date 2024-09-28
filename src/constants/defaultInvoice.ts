export const defaultInvoice = {
    id: '',
    sender: {
        name: "",
        address: "",
        zipCode: "",
        city: "",
        country: "",
        email: "",
        phone: "",
    },
    receiver: {
        name: "",
        address: "",
        zipCode: "",
        city: "",
        country: "",
        email: "",
        phone: "",
    },
    details: {
        invoiceNumber: "",
        invoiceDate: new Date(),
        dueDate: new Date(),
        currency: {
            code: 'INR', 
            symbol: '₹', 
            name: 'Indian Rupee', 
            mainUnit: 'Rupee', 
            subUnit: 'Paise'
        },
        lineItems: [] as LineItem[],
        paymentInformation: {
            bankName: "",
            accountName: "",
            accountNumber: "",
        },
        signature: "",
        discount: { enabled: false, amount: 0, isPercentage: false },
        tax: { enabled: false, amount: 0, isPercentage: true },
        shipping: { enabled: false, amount: 0, isPercentage: false },
        subTotal: 0,
        totalAmount: 0,
        totalAmountInWords: { enabled: false, text: "", },
        paymentTerms: "",
        additionalNotes: "",
    },
    status: 'outstanding' as 'outstanding' | 'paid' | 'late',
};

export type InvoiceFormValues = typeof defaultInvoice;