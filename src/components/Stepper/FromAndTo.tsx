import { UserForm } from '../Form/UserForm';
import { useInvoiceStore } from '@/store/invoiceStore';

/**
 * FromAndTo component
 * Contains two UserForm components for editing sender and receiver information
 * Saves changes to the currentInvoice in the store
 */
export const FromAndTo: React.FC = () => {
    const { currentInvoice, setCurrentInvoice } = useInvoiceStore();

    /**
     * Handles changes to the sender's information
     * @param data Partial sender data
     */
    const handleSenderChange = (data: Partial<typeof currentInvoice.sender>) => {
        setCurrentInvoice({
            ...currentInvoice,
            sender: { ...currentInvoice.sender, ...data }
        });
    };

    /**
     * Handles changes to the receiver's information
     * @param data Partial receiver data
     */
    const handleReceiverChange = (data: Partial<typeof currentInvoice.receiver>) => {
        setCurrentInvoice({
            ...currentInvoice,
            receiver: { ...currentInvoice.receiver, ...data }
        });
    };

    return (
        <div className='grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 xl:gap-10'>
            <UserForm
                data={currentInvoice.sender}
                onChange={handleSenderChange}
                title="Bill From"
            />
            <UserForm
                data={currentInvoice.receiver}
                onChange={handleReceiverChange}
                title="Bill To"
            />
        </div>
    );
};