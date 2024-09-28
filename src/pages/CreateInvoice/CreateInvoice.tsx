import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Sidebar, Preview } from "@/components";
import { ScrollArea, Button } from "@/components/ui";
import { useInvoiceStore } from "@/store/invoiceStore";
import { generateInvoiceNumber, generateUUID } from "@/utils";

/**
 * CreateInvoice component
 * Contains the sidebar and preview components
 * Handles the show/hide of the preview component on mobile
 */
export const CreateInvoice: React.FC = () => {
    const { currentInvoice, setCurrentInvoice } = useInvoiceStore();
    const [showPreview, setShowPreview] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    /**
     * onMount, generate a new invoice number and set it to the currentInvoice
     * this is done so that the user can see the new invoice number on first load
     */
    useEffect(() => {
        if (!isInitialized) {
            setCurrentInvoice({
                ...currentInvoice,
                id: generateUUID(),
                details: {
                    ...currentInvoice.details,
                    invoiceNumber: generateInvoiceNumber()
                }
            });
            setIsInitialized(true);
        }
    }, [isInitialized])

    return (
        <div className="lg:mx-0 flex flex-col h-full overflow-hidden">
            {/* Mobile Preview Toggle */}
            <div className="lg:hidden p-4">
                <Button
                    onClick={() => setShowPreview(!showPreview)}
                    className="w-full"
                >
                    {showPreview ? (
                        <>
                            <EyeOff className="mr-2 h-4 w-4" /> Hide Preview
                        </>
                    ) : (
                        <>
                            <Eye className="mr-2 h-4 w-4" /> Show Preview
                        </>
                    )}
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row h-full overflow-hidden">
                {/* Sidebar */}
                <div className={`w-full lg:w-1/2 xl:w-4/6 p-4 ${showPreview ? 'hidden' : 'block'} lg:block`}>
                    <ScrollArea className="w-full h-[calc(100vh-10rem)] lg:h-[calc(100vh-6rem)]">
                        <Sidebar />
                    </ScrollArea>
                </div>

                {/* Preview */}
                <div className={`w-full lg:w-2/2 xl:w-full p-4 ${showPreview ? 'block' : 'hidden'} lg:block`}>
                    <ScrollArea className="h-[calc(100vh-10rem)] lg:h-[calc(100vh-6rem)] w-full rounded-md border">
                        <div className="border p-4 sm:p-6 md:p-10 xl:p-14 pt-4 rounded shadow bg-neutral-200">
                            <h2 className="text-xl font-semibold mb-4">Invoice Preview</h2>
                            <Preview />
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};