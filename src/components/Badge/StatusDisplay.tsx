import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

/**
 * Possible statuses an invoice can have
 */
type InvoiceStatus = 'outstanding' | 'paid' | 'late';

/**
 * Returns an object with the color, background color and icon for a given status
 * @param status - The status to get the details for
 * @returns An object with the color, background color and icon for the given status
 */
const getStatusDetails = (status: string): { color: string; bgColor?: string; icon: JSX.Element | null } => {
    switch (status) {
        case 'paid':
            // Green color for paid invoices
            return { color: 'text-green-500', icon: <CheckCircle className="w-4 h-4" /> };
        case 'outstanding':
            // Yellow color for outstanding invoices
            return { color: 'text-yellow-500', icon: <Clock className="w-4 h-4" /> };
        case 'late':
            // Red color for late invoices
            return { color: 'text-red-500', icon: <AlertTriangle className="w-4 h-4" /> };
        default:
            // Gray color for unknown statuses
            return { color: 'text-gray-500', bgColor: 'bg-gray-100', icon: null };
    }
};

/**
 * Component to display the status of an invoice
 * @param status - The status of the invoice to display
 * @returns A JSX element displaying the status of the invoice
 */
export const StatusDisplay: React.FC<{ status: InvoiceStatus }> = ({ status }) => {
    const { color, bgColor, icon } = getStatusDetails(status);
    return (
        <span className={`flex items-center ${color} ${bgColor ?? ''} px-2 py-1 rounded`}>
            {icon}
            <span className="ml-2 capitalize">{status}</span>
        </span>
    );
};