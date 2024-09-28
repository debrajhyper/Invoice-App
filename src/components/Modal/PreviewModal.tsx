import { useInvoiceStore } from '@/store/invoiceStore';
import { Preview, StatusDisplay } from '@/components';
import { ScrollArea, Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui";

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * PreviewModal component
 * Displays a modal with a preview of the current invoice
 * Using the Preview component
 * @param isOpen whether the modal is open or not
 * @param onClose callback when the user closes the modal
 */
export const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose }) => {
    const { currentInvoice } = useInvoiceStore();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='!min-w-[calc(100vw-1rem)] md:!min-w-[calc(100vw-10rem)] lg:!min-w-[calc(100vw-30rem)] xl:!min-w-[calc(100vw-50rem)] h-[calc(100vh-4rem)] bg-neutral-50'>
                <DialogHeader className='flex flex-row justify-start items-center gap-4'>
                    <DialogTitle>View Invoice</DialogTitle>
                    <StatusDisplay status={currentInvoice.status} />
                </DialogHeader>
                <ScrollArea className="w-full h-full">
                    <Preview />
                </ScrollArea>
            </DialogContent>
        </Dialog >
    )
}