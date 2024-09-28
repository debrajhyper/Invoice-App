import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { generateInvoiceNumber } from "@/utils";
import { useInvoiceStore } from '@/store/invoiceStore';
import { currencies, defaultInvoice } from '@/constants';
import { CalendarIcon, Check, ChevronsUpDown, RefreshCw } from "lucide-react";
import { Input, Label, Button, Calendar, Popover, PopoverContent, PopoverTrigger, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui";

/**
 * Type of the form fields
 */
type FieldType = 'text' | 'date' | 'number' | 'currency';

/**
 * Form field interface
 */
interface FormField {
    name: keyof typeof defaultInvoice['details'];
    label: string;
    type: FieldType;
}

/**
 * Form fields array
 */
const formFields: FormField[] = [
    { name: 'invoiceNumber', label: 'Invoice Number', type: 'text' },
    { name: 'invoiceDate', label: 'Invoice Date', type: 'date' },
    { name: 'dueDate', label: 'Due Date', type: 'date' },
    { name: 'currency', label: 'Currency', type: 'currency' },
];

/**
 * Invoice details component
 */
export const InvoiceDetails: React.FC = () => {
    const { currentInvoice, setCurrentInvoice } = useInvoiceStore();

    if (!currentInvoice || !currentInvoice.details) {
        return <div>Loading...</div>;
    }

    /**
     * Handle change of a form field
     * @param name Name of the form field
     * @param value New value of the form field
     */
    const handleChange = (name: string, value: string | number | Date | object) => {
        setCurrentInvoice({
            details: {
                ...currentInvoice.details,
                [name]: value
            }
        });
    };

    /**
     * Render a form field based on its type
     * @param field Form field object
     */
    const renderField = (field: FormField) => {
        switch (field.type) {
            case 'date':
                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !currentInvoice.details[field.name] && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {currentInvoice.details[field.name] instanceof Date
                                    ? format(currentInvoice.details[field.name] as Date, "PPP")
                                    : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={currentInvoice.details[field.name] as Date}
                                onSelect={(date) => handleChange(field.name, date as Date)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                );
            case 'currency':
                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    "w-full justify-between",
                                    !currentInvoice.details.currency && "text-muted-foreground"
                                )}
                            >
                                {currentInvoice.details.currency
                                    ? `${currentInvoice.details.currency.code} (${currentInvoice.details.currency.symbol})`
                                    : "Select currency"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder="Search currency..." />
                                <CommandList>
                                    <CommandEmpty>No currency found.</CommandEmpty>
                                    <CommandGroup>
                                        {currencies.map((currency) => (
                                            <CommandItem
                                                key={currency.code}
                                                value={currency.code}
                                                onSelect={() => handleChange('currency', currency)}
                                                className="cursor-pointer"
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        currency.code === currentInvoice.details.currency.code
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {currency.code} ({currency.symbol}) - {currency.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                );
            default:
                if (field.name === 'invoiceNumber') {
                    return (
                        <div className="flex">
                            <Input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                placeholder="INV-001"
                                value={currentInvoice.details[field.name] as string}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                className="rounded-r-none"
                            />
                            <Button
                                type="button"
                                onClick={() => handleChange('invoiceNumber', generateInvoiceNumber())}
                                className="rounded-l-none"
                                variant="outline"
                            >
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                        </div>
                    );
                }
                return (
                    <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder=""
                        value={currentInvoice.details[field.name] as string}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                );
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
            <div className="grid grid-cols-2 gap-4">
                {formFields.map((field, index) => (
                    <div key={index}>
                        <Label htmlFor={field.name}>{field.label}</Label>
                        {renderField(field)}
                    </div>
                ))}
            </div>
        </div>
    );
};