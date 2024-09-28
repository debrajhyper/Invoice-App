import { useMemo } from 'react';
import { numberToWords } from '@/utils';
import { useInvoiceStore } from '@/store/invoiceStore';

/**
 * useInvoiceCalculations hook
 * 
 * Calculates the subtotal, total, and totalAmountInWords of an invoice
 * based on the line items, discount, tax, shipping, and currency.
 * 
 * The hook also updates the invoice store with the calculated values.
 * 
 * @returns an object containing the calculated values
 */
export const useInvoiceCalculations = () => {
    const { currentInvoice, setCurrentInvoice } = useInvoiceStore();

    /**
     * Calculate the subtotal of the invoice
     */
    const subtotal = useMemo(() => {
        return currentInvoice.details.lineItems.reduce((total, item) => total + item.total, 0);
    }, [currentInvoice.details.lineItems]);

    /**
     * Calculate the total of the invoice
     * taking into account the discount, tax, and shipping
     */
    const total = useMemo(() => {
        let total = subtotal;
        if (currentInvoice.details.discount.enabled && currentInvoice.details.discount.amount > 0) {
            const discountAmount = currentInvoice.details.discount.isPercentage
                ? total * (currentInvoice.details.discount.amount / 100)
                : currentInvoice.details.discount.amount;
            total -= discountAmount;
        }
        if (currentInvoice.details.tax.enabled && currentInvoice.details.tax.amount > 0) {
            const taxAmount = currentInvoice.details.tax.isPercentage
                ? total * (currentInvoice.details.tax.amount / 100)
                : currentInvoice.details.tax.amount;
            total += taxAmount;
        }
        if (currentInvoice.details.shipping.enabled && currentInvoice.details.shipping.amount > 0) {
            const shippingAmount = currentInvoice.details.shipping.isPercentage
                ? total * (currentInvoice.details.shipping.amount / 100)
                : currentInvoice.details.shipping.amount;
            total += shippingAmount;
        }
        return total;
    }, [subtotal, currentInvoice.details.discount, currentInvoice.details.tax, currentInvoice.details.shipping]);

    /**
     * Calculate the total amount in words
     * if the totalAmountInWords feature is enabled
     */
    const totalAmountInWords = useMemo(() => {
        if (currentInvoice.details.totalAmountInWords.enabled) {
            const currency = currentInvoice.details.currency;
            const wholePart = Math.floor(total);
            const decimalPart = Math.round((total - wholePart) * 100);
            const wholeWords = numberToWords(wholePart);

            let result = `${wholeWords} ${currency.mainUnit}${wholePart !== 1 ? 's' : ''}`;

            if (decimalPart > 0 && currency.subUnit) {
                result += ` and ${numberToWords(decimalPart)} ${currency.subUnit}${decimalPart !== 1 ? 's' : ''}`;
            }

            return result;
        }
        return '';
    }, [total, currentInvoice.details.totalAmountInWords.enabled, currentInvoice.details.currency]);

    // Update the invoice store whenever subtotal, total, or totalAmountInWords changes
    useMemo(() => {
        setCurrentInvoice({
            details: {
                ...currentInvoice.details,
                subTotal: subtotal,
                totalAmount: total,
                totalAmountInWords: {
                    ...currentInvoice.details.totalAmountInWords,
                    text: totalAmountInWords
                }
            }
        });
    }, [subtotal, total, totalAmountInWords, setCurrentInvoice]);

    return { subtotal, total, totalAmountInWords };
};