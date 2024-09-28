import { useInvoiceCalculations } from '@/hooks';
import { useInvoiceStore } from '@/store/invoiceStore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';

/**
 * Preview component
 * Displays a preview of the current invoice
 * Using the Preview component
 */
export const Preview: React.FC = () => {
    const { currentInvoice } = useInvoiceStore();
    const { subtotal, total } = useInvoiceCalculations();

    /**
     * Formats a date as a string
     * @param date The date to format
     */
    const formatDate = (date: Date) => {
        return date.toLocaleDateString() !== 'Invalid Date'
            ? date.toLocaleDateString()
            : 'Not set';
    };

    /**
     * Displays a value or a placeholder if the value is empty
     * @param value The value to display
     * @param placeholder The placeholder to display if the value is empty
     * @param suffix The suffix to add to the value
     */
    const displayValue = (value: string, placeholder: string = '', suffix: string = '') => {
        return value.trim() ? `${value}${suffix}` : placeholder;
    };

    /**
     * Checks if a line item is a LaborLineItem
     * @param item The line item to check
     */
    function isLaborLineItem(item: LineItem): item is LaborLineItem {
        return item.type === 'labor';
    }

    /**
     * Renders the quantity of a line item
     * @param item The line item to render
     */
    const renderQuantity = (item: LineItem) => {
        if (isLaborLineItem(item)) {
            return `${item.hours} hours`;
        } else {
            return `${item.units} units`;
        }
    };

    /**
     * Renders the rate of a line item
     * @param item The line item to render
     */
    const renderRate = (item: LineItem) => {
        if (isLaborLineItem(item)) {
            return `${item.hourlyRate}/hour`;
        } else {
            return `${item.price}/unit`;
        }
    };

    return (
        <div className='grid grid-cols-6 gap-y-0 gap-x-2 rounded-lg bg-white border-2 border-neutral-400 mx-auto px-2 md:px-3 lg:px-4 xl:px-5 py-10 pb-20'>
            <h2 className='col-span-3 row-span-2 text-2xl font-bold text-blue-500'>{displayValue(currentInvoice.sender.name, '')}</h2>
            <h1 className='col-span-3 text-right text-4xl font-extrabold line-clamp-1'>Invoice #</h1>
            <h1 className='col-span-3 text-right font-semibold text-neutral-400'>{displayValue(currentInvoice.details.invoiceNumber, '')}</h1>
            <span className='col-start-2 xl:col-start-4 col-end-7 text-right text-neutral-600 mt-5'>
                <p>{displayValue(currentInvoice.sender.address, '')}</p>
                <p>{displayValue(currentInvoice.sender.city, '', ',')} {displayValue(currentInvoice.sender.zipCode, '')}</p>
                <p>{displayValue(currentInvoice.sender.country, '')}</p>
            </span>
            <span className='col-start-1 col-end-4 xl:col-end-4 row-span-2 text-neutral-600 mt-5'>
                {currentInvoice.receiver.name && <h2 className='font-bold text-neutral-900'>Bill To:</h2>}
                <p className='font-bold text-neutral-900'>{displayValue(currentInvoice.receiver.name, '')}</p>
                <p>{displayValue(currentInvoice.receiver.address, '', ',')} {displayValue(currentInvoice.receiver.zipCode, '')}</p>
                <p>{displayValue(currentInvoice.receiver.city, '', ',')} {displayValue(currentInvoice.receiver.country, '')}</p>
            </span>
            <span className='col-start-4 col-end-7 text-right text-neutral-600 mt-5'>
                <h2 className='font-bold text-neutral-900'>Invoice Date:</h2>
                <p>{formatDate(currentInvoice.details.invoiceDate)}</p>
            </span>
            <span className='col-start-4 col-end-7 text-right text-neutral-600'>
                <h2 className='font-bold text-neutral-900'>Due Date:</h2>
                <p>{formatDate(currentInvoice.details.dueDate)}</p>
            </span>
            <div className='col-span-6 mt-5'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">ITEM</TableHead>
                            <TableHead>QTY</TableHead>
                            <TableHead>Rate</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentInvoice.details.lineItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="align-top text-md font-bold text-neutral-600 min-w-[10%] max-w-[60%] w-full">
                                    {item.type}
                                    <div className='text-xs text-wrap font-normal text-neutral-400'>{item.description}</div>
                                </TableCell>
                                <TableCell className='align-top text-nowrap'>{renderQuantity(item)}</TableCell>
                                <TableCell className='align-top text-nowrap'>{renderRate(item)}</TableCell>
                                <TableCell className="align-top text-nowrap text-right">{item.total.toFixed(2)} {currentInvoice.details.currency.code}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <p className='col-span-6 text-neutral-600 mt-5 flex justify-end items-center'>
                Subtotal:
                <span className='text-neutral-900 ml-2'>
                    {subtotal.toFixed(2)} {currentInvoice.details.currency.code}
                </span>
            </p>
            {
                currentInvoice.details.discount.enabled &&
                currentInvoice.details.discount.amount > 0 &&
                <p className='col-span-6 text-neutral-600 flex justify-end items-center'>
                    Discount:
                    <span className='text-neutral-900 ml-2'>
                        -{currentInvoice.details.discount.amount.toFixed(2)} {currentInvoice.details.discount.isPercentage ? '%' : currentInvoice.details.currency.code}
                    </span>
                </p>
            }
            {
                currentInvoice.details.tax.enabled &&
                currentInvoice.details.tax.amount > 0 &&
                <p className='col-span-6 text-neutral-600 flex justify-end items-center'>
                    Tax:
                    <span className='text-neutral-900 ml-2'>
                        +{currentInvoice.details.tax.amount.toFixed(2)} {currentInvoice.details.tax.isPercentage ? '%' : currentInvoice.details.currency.code}
                    </span>
                </p>
            }
            {
                currentInvoice.details.shipping.enabled &&
                currentInvoice.details.shipping.amount > 0 &&
                <p className='col-span-6 text-neutral-600 flex justify-end items-center'>
                    Shipping:
                    <span className='text-neutral-900 ml-2'>
                        +{currentInvoice.details.shipping.amount.toFixed(2)} {currentInvoice.details.shipping.isPercentage ? '%' : currentInvoice.details.currency.code}
                    </span>
                </p>
            }
            <p className='col-span-6 text-neutral-600 flex justify-end items-center'>
                Total:
                <span className='font-extrabold text-xl text-neutral-900 ml-2'>
                    {total.toFixed(2)} {currentInvoice.details.currency.code}
                </span>
            </p>
            {
                currentInvoice.details.totalAmountInWords.enabled &&
                <p className='col-span-6 text-neutral-600 flex justify-end items-center'>
                    Total in Words:
                    <span className='font-bold ml-2'>
                        {currentInvoice.details.totalAmountInWords.text}
                    </span>
                </p>
            }
            <div className='col-span-5 mt-5'>
                <h2 className='font-bold text-neutral-900'>Additional Notes</h2>
                <p className='text-neutral-600'>{currentInvoice.details.additionalNotes}</p>
            </div>
            <div className='col-span-5 mt-5'>
                <h2 className='font-bold text-neutral-900'>Payment Terms</h2>
                <p className='text-sm text-neutral-600'>Please send the payment to this address</p>
                <p className='text-sm font-semibold text-neutral-900'>
                    Bank:
                    <span className='text-neutral-600 font-bold ml-2'>{currentInvoice.details.paymentInformation.bankName}</span>
                </p>
                <p className='text-sm font-semibold text-neutral-900'>
                    Account Number:
                    <span className='text-neutral-600 font-bold ml-2'>{currentInvoice.details.paymentInformation.accountNumber}</span>
                </p>
                <p className='text-sm font-semibold text-neutral-900'>
                    Account Name:
                    <span className='text-neutral-600 font-bold ml-2'>{currentInvoice.details.paymentInformation.accountName}</span>
                </p>
                <p className='text-sm font-semibold text-neutral-900'>{currentInvoice.details.paymentTerms}</p>
            </div>
            <div className='col-span-6 text-md mt-10'>
                <p className='text-neutral-600'>If you have any questions concerning this invoice, use the following contact information:</p>
                <p className='text-neutral-900 font-semibold'>Email: {currentInvoice.sender.email}</p>
                <p className='text-neutral-900 font-semibold'>Phone: {currentInvoice.sender.phone}</p>
            </div>
            {currentInvoice.details.signature && (
                <div className='col-span-6 mt-10'>
                    <h2 className='font-bold text-neutral-900'>Signature</h2>
                    <div className='mt-2 border-b border-gray-300 pb-2'>
                        <img
                            src={currentInvoice.details.signature}
                            alt="Signature"
                            className='max-h-14 object-contain'
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
