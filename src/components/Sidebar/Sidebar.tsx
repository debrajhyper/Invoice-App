import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { renderToStaticMarkup } from 'react-dom/server';
import { useToast } from "@/hooks";
import { HOME_PATH } from "@/routes";
import { EmailPreview } from "@/components";
import { defaultInvoice } from "@/constants";
import { Summary } from "../Stepper/Summary";
import { LineItems } from "../Stepper/LineItems";
import { FromAndTo } from "../Stepper/FromAndTo";
import { PaymentInfo } from "../Stepper/PaymentInfo";
import { InvoiceDetails } from "../Stepper/InvoiceDetails";
import { useInvoiceStore } from "@/store/invoiceStore";
import { sendInvoiceEmail } from "@/lib/sendInvoiceEmail";
import { Button, Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui";
import { ArrowLeft, ArrowRight, FileCheck2, Loader2, MailCheck } from 'lucide-react';

const tabs = [
    { value: 'From & To', Component: <FromAndTo /> },
    { value: 'Details', Component: <InvoiceDetails /> },
    { value: 'Line Items', Component: <LineItems /> },
    { value: 'Payment', Component: <PaymentInfo /> },
    { value: 'Summary', Component: <Summary /> },
];

/**
 * Sidebar component
 * Displays the sidebar for the invoice creation
 * Using the Tabs component
 */
export const Sidebar: React.FC = () => {
    const { currentInvoice, setCurrentInvoice, addInvoice } = useInvoiceStore();
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    /**
     * Handles the next button click
     * If the current tab is not the last one, goes to the next one
     */
    const handleNext = () => {
        if (currentTabIndex < tabs.length - 1) {
            setCurrentTabIndex(currentTabIndex + 1);
        }
    };

    /**
     * Handles the previous button click
     * If the current tab is not the first one, goes to the previous one
     */
    const handlePrevious = () => {
        if (currentTabIndex > 0) {
            setCurrentTabIndex(currentTabIndex - 1);
        }
    };

    /**
     * Handles the send invoice by email button click
     * Sends the invoice to the receiver email
     */
    const handleSendInvoiceByEmail = async () => {
        setIsSendingEmail(true);
        try {
            const htmlContent = renderToStaticMarkup(<EmailPreview currentInvoice={currentInvoice} />);
            await sendInvoiceEmail(currentInvoice, htmlContent);
            toast({
                title: "Invoice Sent",
                description: `Invoice ${currentInvoice.details.invoiceNumber} has been sent to ${currentInvoice.receiver.email}`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to send the invoice. Please try again",
                variant: "destructive",
            });
        } finally {
            setIsSendingEmail(false);
        }
    };

    /**
     * Handles the submit invoice button click
     * Adds the invoice to the store and goes back to the home page
     */
    const handleSubmitInvoice = async () => {
        addInvoice(currentInvoice);
        setCurrentInvoice(defaultInvoice);
        setCurrentTabIndex(0);
        navigate(HOME_PATH);
        toast({
            title: 'Invoice created',
            description: 'Invoice created successfully',
        });
    }

    return (
        <Tabs defaultValue="From & To" value={tabs[currentTabIndex].value} className="text-right px-0 xl:px-2 h-full">
            <TabsList className="w-full flex justify-between items-center h-full">
                {
                    tabs.map((tab, index) => (
                        <TabsTrigger
                            key={index}
                            value={tab.value}
                            className="w-full text-xs md:text-sm"
                            onClick={() => setCurrentTabIndex(index)}
                        >
                            {tab.value}
                        </TabsTrigger>
                    ))
                }
            </TabsList>
            {tabs.map((tab, index) => (
                <TabsContent
                    key={index}
                    value={tab.value}
                    className="pt-2 text-left"
                >
                    {tab.Component}
                </TabsContent>
            ))}
            <div className="flex justify-between mt-4">
                {currentTabIndex > 0 && (
                    <Button onClick={handlePrevious}>
                        <ArrowLeft className="mr-2 size-5" />
                        Previous
                    </Button>
                )}
                {
                    currentTabIndex < tabs.length - 1
                        ? (
                            <Button onClick={handleNext} className={currentTabIndex === 0 ? 'ml-auto' : ''}>
                                Next
                                <ArrowRight className="ml-2 size-5" />
                            </Button>
                        )
                        : (
                            <div className="space-x-4">
                                <Button variant="outline" className={currentTabIndex === 0 ? 'ml-auto' : ''} onClick={handleSendInvoiceByEmail} disabled={isSendingEmail}>
                                    {
                                        isSendingEmail
                                            ? <Loader2 className="mr-2 size-5 animate-spin" />
                                            : <MailCheck className="mr-2 size-5" />
                                    }
                                    Send Email
                                </Button>
                                <Button onClick={handleSubmitInvoice} type="submit" className={currentTabIndex === 0 ? 'ml-auto' : ''}>
                                    <FileCheck2 className="mr-2 size-5" />
                                    Done
                                </Button>
                            </div>
                        )
                }
            </div>
        </Tabs>
    )
}