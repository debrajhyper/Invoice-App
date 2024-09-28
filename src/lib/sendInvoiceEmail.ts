import emailjs from '@emailjs/browser';
import { InvoiceFormValues } from '@/constants/defaultInvoice';

const SERVICE_ID = import.meta.env.VITE_EMAIL_JS_SERVICE_ID!;
const TEMPLATE_ID = import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID!;
const USER_ID = import.meta.env.VITE_EMAIL_JS_USER_ID!;

/**
 * Send an invoice email using EmailJS
 * @param {InvoiceFormValues} invoice - Invoice data
 * @param {string} htmlContent - Email content
 * @returns {Promise<void>}
 */
export async function sendInvoiceEmail(invoice: InvoiceFormValues, htmlContent: string): Promise<void> {
    try {
        // Check if EmailJS service configuration is set
        if (!USER_ID || !SERVICE_ID || !TEMPLATE_ID) {
            throw new Error('Missing Email service configuration');
        }

        // Check if receiver email is set
        if (!invoice.receiver.email) {
            throw new Error('Missing receiver email');
        }

        // Send email using EmailJS
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            // Receiver name and email
            to_name: invoice.receiver.name,
            to_email: invoice.receiver.email,
            // Sender name and email
            from_name: invoice.sender.name,
            from_email: invoice.sender.email,
            // Invoice number
            invoice_number: invoice.details.invoiceNumber,
            // Email subject
            subject: `New Invoice ${invoice.details.invoiceNumber}`,
            // Email content
            message: htmlContent,
        }, USER_ID);

        // Check if email was sent successfully
        if (response.status !== 200) {
            throw new Error('Failed to send invoice email');
        }
    } catch (error) {
        // Log error
        console.error('Error sending invoice email:', error);
        // Re-throw error
        throw error;
    }
}