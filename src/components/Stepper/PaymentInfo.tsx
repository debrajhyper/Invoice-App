import { Input, Label } from "@/components/ui";
import { useInvoiceStore } from '@/store/invoiceStore';

/**
 * Payment information component
 * 
 * This component is used to input the payment information for an invoice. It
 * displays a form with fields for bank name, account name, and account number.
 * The values of these fields are stored in the invoice store and can be accessed
 * through the useInvoiceStore hook.
 */
export const PaymentInfo: React.FC = () => {
    const { currentInvoice, setCurrentInvoice } = useInvoiceStore();

    /**
     * Handle change of a form field
     * @param e - the event to process
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // update the invoice store with the new value of the field
        setCurrentInvoice({
            details: {
                ...currentInvoice.details,
                paymentInformation: {
                    ...currentInvoice.details.paymentInformation,
                    [name]: value
                }
            }
        });
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                        id="bankName"
                        name="bankName"
                        placeholder="State Bank of India"
                        // display the current value of the bank name field
                        value={currentInvoice.details.paymentInformation.bankName}
                        // call the handleChange function when the value of the field changes
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                        id="accountName"
                        name="accountName"
                        placeholder="Debraj Karmakar"
                        // display the current value of the account name field
                        value={currentInvoice.details.paymentInformation.accountName}
                        // call the handleChange function when the value of the field changes
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                        id="accountNumber"
                        name="accountNumber"
                        placeholder="1234567890"
                        // display the current value of the account number field
                        value={currentInvoice.details.paymentInformation.accountNumber}
                        // call the handleChange function when the value of the field changes
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};