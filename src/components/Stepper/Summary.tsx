import { useState } from 'react';
import { Signature, Trash } from 'lucide-react';
import { useInvoiceCalculations } from '@/hooks';
import { Switch, Textarea } from '@/components/ui';
import { useInvoiceStore } from '@/store/invoiceStore';
import { SignatureDialog, CurrencyPercentageInput } from '@/components';

/**
 * Summary component for displaying a summary of the invoice and its details.
 * Also allows the user to edit the invoice details.
 */
export const Summary = () => {
    const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
    const { currentInvoice, setCurrentInvoice } = useInvoiceStore();
    const { subtotal, total } = useInvoiceCalculations();

    /**
     * Handle the user removing the signature.
     */
    const handleRemoveSignature = () => {
        setCurrentInvoice({ ...currentInvoice, details: { ...currentInvoice.details, signature: '' } });
    };

    /**
     * Handle the user toggling the total amount in words.
     * @param checked Whether the total amount in words is enabled or not.
     */
    const handleTotalAmountInWordsToggle = (checked: boolean) => {
        setCurrentInvoice({
            ...currentInvoice,
            details: {
                ...currentInvoice.details,
                totalAmountInWords: {
                    ...currentInvoice.details.totalAmountInWords,
                    enabled: checked
                }
            }
        });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Summary</h2>
            <div className='grid grid-cols-2 gap-4 gap-y-6'>
                <div className='relative'>
                    {/* Display the signature if it exists, otherwise display a placeholder to add a signature. */}
                    {currentInvoice.details.signature ? (
                        <>
                            <div
                                className="w-full h-full max-h-auto border-2 border-neutral-300 bg-neutral-50 rounded-md p-2 text-center flex flex-col justify-center items-center cursor-pointer"
                                onClick={() => setIsSignatureDialogOpen(true)}
                            >
                                <img src={currentInvoice.details.signature} alt="Signature" className="max-w-full h-auto rounded" />
                            </div>
                            <Trash onClick={handleRemoveSignature} className='mt-1 text-red-500 cursor-pointer' size={16} />
                        </>
                    ) : (
                        <div
                            className="w-full h-full border-2 border-dashed border-neutral-300 bg-neutral-100 rounded-md p-2 xl:p-4 text-sm xl:text-md text-center flex flex-col justify-center items-center cursor-pointer"
                            onClick={() => setIsSignatureDialogOpen(true)}
                        >
                            <Signature />
                            Click to add signature
                        </div>
                    )}
                    {/* Open the signature dialog when the user clicks on the signature or the placeholder. */}
                    <SignatureDialog
                        isOpen={isSignatureDialogOpen}
                        onClose={() => setIsSignatureDialogOpen(false)}
                        onSave={(signature) => {
                            setCurrentInvoice({
                                ...currentInvoice,
                                details: { ...currentInvoice.details, signature }
                            });
                        }}
                    />
                </div>
                <div className="space-y-4 ml-0 xl:ml-2">
                    {/* Currency percentage input for discount, tax, and shipping. */}
                    <CurrencyPercentageInput
                        label="discount"
                        currentInvoice={currentInvoice}
                        value={currentInvoice.details.discount}
                        onChange={setCurrentInvoice}
                    />
                    <CurrencyPercentageInput
                        label="tax"
                        currentInvoice={currentInvoice}
                        value={currentInvoice.details.tax}
                        onChange={setCurrentInvoice}
                    />
                    <CurrencyPercentageInput
                        label="shipping"
                        currentInvoice={currentInvoice}
                        value={currentInvoice.details.shipping}
                        onChange={setCurrentInvoice}
                    />
                </div>
                <div className="space-y-2 col-span-2 mt-2">
                    {/* Display the subtotal and total of the invoice. */}
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{currentInvoice.details.currency.symbol}{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total Amount:</span>
                        <span>{currentInvoice.details.currency.symbol}{total.toFixed(2)}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2 col-span-2">
                    {/* Switch to enable or disable displaying the total amount in words. */}
                    <span>Include Total in Words?</span>
                    <Switch
                        checked={currentInvoice.details.totalAmountInWords.enabled}
                        onCheckedChange={handleTotalAmountInWordsToggle}
                    />
                </div>
                <div>
                    {/* Textarea for additional notes. */}
                    <h3 className="text-lg font-semibold mb-2">Additional Notes</h3>
                    <Textarea
                        rows={5}
                        placeholder="In case of any discrepancies in the invoice, please respond back at the earliest."
                        value={currentInvoice.details.additionalNotes}
                        onChange={(e) => setCurrentInvoice({ ...currentInvoice, details: { ...currentInvoice.details, additionalNotes: e.target.value } })}
                    />
                </div>
                <div>
                    {/* Textarea for payment terms. */}
                    <h3 className="text-lg font-semibold mb-2">Payment Terms</h3>
                    <Textarea
                        rows={5}
                        placeholder="Net 30, Payment is due within 30 days of the invoice date."
                        value={currentInvoice.details.paymentTerms}
                        onChange={(e) => setCurrentInvoice({ ...currentInvoice, details: { ...currentInvoice.details, paymentTerms: e.target.value } })}
                    />
                </div>
            </div>
        </div>
    );
};