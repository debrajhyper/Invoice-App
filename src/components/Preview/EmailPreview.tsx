import { InvoiceFormValues } from '@/constants/defaultInvoice';

export const EmailPreview = ({ currentInvoice }: { currentInvoice: InvoiceFormValues }) => {
    const formatDate = (date: Date) => {
        return date.toLocaleDateString() !== 'Invalid Date'
            ? date.toLocaleDateString()
            : 'Not set';
    };

    const displayValue = (value: string, placeholder: string = '', suffix: string = '') => {
        return value.trim() ? `${value}${suffix}` : placeholder;
    };

    function isLaborLineItem(item: LineItem): item is LaborLineItem {
        return item.type === 'labor';
    }

    const renderQuantity = (item: LineItem) => {
        if (isLaborLineItem(item)) {
            return `${item.hours} hours`;
        } else {
            return `${item.units} units`;
        }
    };

    const renderRate = (item: LineItem) => {
        if (isLaborLineItem(item)) {
            return `${item.hourlyRate}/hour`;
        } else {
            return `${item.price}/unit`;
        }
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#ffffff',
            border: '2px solid #e5e5e5',
            borderRadius: '8px'
        }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tr>
                    <td style={{ width: '50%', paddingBottom: '20px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', margin: '0' }}>{displayValue(currentInvoice.sender.name, '')}</h2>
                    </td>
                    <td style={{ width: '50%', textAlign: 'right' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0' }}>Invoice #</h1>
                        <h1 style={{ fontSize: '18px', fontWeight: 'normal', color: '#9ca3af', margin: '5px 0 0 0' }}>{displayValue(currentInvoice.details.invoiceNumber, '')}</h1>
                    </td>
                </tr>
            </table>

            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <tr>
                    <td style={{ width: '50%', verticalAlign: 'top' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Bill To:</h2>
                        <p style={{ margin: '0', lineHeight: '1.5' }}>
                            <strong>{displayValue(currentInvoice.receiver.name, '')}</strong><br />
                            {displayValue(currentInvoice.receiver.address, '')}<br />
                            {displayValue(currentInvoice.receiver.city, '')}, {displayValue(currentInvoice.receiver.zipCode, '')}<br />
                            {displayValue(currentInvoice.receiver.country, '')}
                        </p>
                    </td>
                    <td style={{ width: '50%', verticalAlign: 'top', textAlign: 'right' }}>
                        <p style={{ margin: '0', lineHeight: '1.5' }}>
                            <strong>Invoice Date:</strong> {formatDate(currentInvoice.details.invoiceDate)}<br />
                            <strong>Due Date:</strong> {formatDate(currentInvoice.details.dueDate)}
                        </p>
                    </td>
                </tr>
            </table>

            <table style={{ width: '100%', marginTop: '30px', borderCollapse: 'collapse' }}>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                    <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>ITEM</th>
                    <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>QTY</th>
                    <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>Rate</th>
                    <th style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #e5e5e5' }}>Amount</th>
                </tr>
                {currentInvoice.details.lineItems.map((item, index) => (
                    <tr key={index}>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e5e5e5' }}>
                            <strong>{item.type}</strong>
                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>{item.description}</div>
                        </td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e5e5e5' }}>{renderQuantity(item)}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e5e5e5' }}>{renderRate(item)}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e5e5e5', textAlign: 'right' }}>{item.total.toFixed(2)} {currentInvoice.details.currency.code}</td>
                    </tr>
                ))}
            </table>

            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <tr>
                    <td style={{ textAlign: 'right', padding: '5px 0' }}>
                        Subtotal: <strong>{currentInvoice.details.subTotal.toFixed(2)} {currentInvoice.details.currency.code}</strong>
                    </td>
                </tr>
                {currentInvoice.details.discount.enabled && currentInvoice.details.discount.amount > 0 && (
                    <tr>
                        <td style={{ textAlign: 'right', padding: '5px 0' }}>
                            Discount: <strong>-{currentInvoice.details.discount.amount.toFixed(2)} {currentInvoice.details.discount.isPercentage ? '%' : currentInvoice.details.currency.code}</strong>
                        </td>
                    </tr>
                )}
                {currentInvoice.details.tax.enabled && currentInvoice.details.tax.amount > 0 && (
                    <tr>
                        <td style={{ textAlign: 'right', padding: '5px 0' }}>
                            Tax: <strong>+{currentInvoice.details.tax.amount.toFixed(2)} {currentInvoice.details.tax.isPercentage ? '%' : currentInvoice.details.currency.code}</strong>
                        </td>
                    </tr>
                )}
                {currentInvoice.details.shipping.enabled && currentInvoice.details.shipping.amount > 0 && (
                    <tr>
                        <td style={{ textAlign: 'right', padding: '5px 0' }}>
                            Shipping: <strong>+{currentInvoice.details.shipping.amount.toFixed(2)} {currentInvoice.details.shipping.isPercentage ? '%' : currentInvoice.details.currency.code}</strong>
                        </td>
                    </tr>
                )}
                <tr>
                    <td style={{ textAlign: 'right', padding: '10px 0', fontSize: '18px', fontWeight: 'bold' }}>
                        Total: {currentInvoice.details.totalAmount.toFixed(2)} {currentInvoice.details.currency.code}
                    </td>
                </tr>
                {currentInvoice.details.totalAmountInWords.enabled && (
                    <tr>
                        <td style={{ textAlign: 'right', padding: '5px 0' }}>
                            Total in Words: <strong>{currentInvoice.details.totalAmountInWords.text}</strong>
                        </td>
                    </tr>
                )}
            </table>

            {currentInvoice.details.additionalNotes && (
                <div style={{ marginTop: '30px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Additional Notes</h2>
                    <p style={{ margin: '0' }}>{currentInvoice.details.additionalNotes}</p>
                </div>
            )}

            <div style={{ marginTop: '30px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Payment Terms</h2>
                <p style={{ margin: '0', fontSize: '14px' }}>Please send the payment to this address</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Bank:</strong> {currentInvoice.details.paymentInformation.bankName}<br />
                    <strong>Account Number:</strong> {currentInvoice.details.paymentInformation.accountNumber}<br />
                    <strong>Account Name:</strong> {currentInvoice.details.paymentInformation.accountName}
                </p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>{currentInvoice.details.paymentTerms}</p>
            </div>

            <div style={{ marginTop: '30px' }}>
                <p style={{ margin: '0', fontSize: '14px' }}>If you have any questions concerning this invoice, use the following contact information:</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Email:</strong> {currentInvoice.sender.email}<br />
                    <strong>Phone:</strong> {currentInvoice.sender.phone}
                </p>
            </div>

            {currentInvoice.details.signature && (
                <div style={{ marginTop: '30px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Signature</h2>
                    <div style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '10px' }}>
                        <img
                            src={currentInvoice.details.signature}
                            alt="Signature"
                            style={{ maxHeight: '56px', objectFit: 'contain' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};