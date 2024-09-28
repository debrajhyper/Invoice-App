import { PlusCircle, Trash2 } from "lucide-react";
import { useInvoiceStore } from '@/store/invoiceStore';
import { Input, Button, Label, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";

/**
 * Component for displaying and editing the line items of an invoice.
 *
 * @returns A component with a list of line items and a button to add a new one.
 */
export const LineItems: React.FC = () => {
    const { currentInvoice, setCurrentInvoice } = useInvoiceStore();

    /**
     * Adds a new line item to the invoice.
     */
    const addLineItem = () => {
        const newLineItem: LaborLineItem = {
            type: 'labor',
            description: '',
            hourlyRate: 0,
            hours: 0,
            total: 0,
        };

        setCurrentInvoice({
            details: {
                ...currentInvoice.details,
                lineItems: [...currentInvoice.details.lineItems, newLineItem]
            }
        });
    };

    /**
     * Updates a line item in the invoice.
     *
     * @param index The index of the line item to update.
     * @param field The field of the line item to update.
     * @param value The new value of the line item.
     */
    const updateLineItem = (index: number, field: string, value: string | number) => {
        const updatedLineItems = currentInvoice.details.lineItems.map((item, i) => {
            if (i === index) {
                let updatedItem: LineItem;
                if (field === 'type') {
                    if (value === 'labor') {
                        updatedItem = {
                            type: 'labor',
                            description: item?.description,
                            hourlyRate: 'hourlyRate' in item ? item.hourlyRate : 0,
                            hours: 'hours' in item ? item.hours : 0,
                            total: 0,
                        };
                    } else {
                        updatedItem = {
                            type: value as 'material' | 'work-related',
                            description: item.description,
                            price: 'price' in item ? item.price : 0,
                            units: 'units' in item ? item.units : 0,
                            total: 0,
                        };
                    }
                } else {
                    updatedItem = { ...item, [field]: value } as LineItem;
                }
                if (updatedItem.type === 'labor') {
                    updatedItem.total = updatedItem.hours * updatedItem.hourlyRate;
                } else {
                    updatedItem.total = updatedItem.units * updatedItem.price;
                }
                return updatedItem;
            }
            return item;
        });

        setCurrentInvoice({
            details: {
                ...currentInvoice.details,
                lineItems: updatedLineItems
            }
        });
    };

    /**
     * Removes a line item from the invoice.
     *
     * @param index The index of the line item to remove.
     */
    const removeLineItem = (index: number) => {
        const updatedLineItems = currentInvoice.details.lineItems.filter((_, i) => i !== index);
        setCurrentInvoice({
            details: {
                ...currentInvoice.details,
                lineItems: updatedLineItems
            }
        });
    };

    /**
     * Renders the fields for a line item based on its type.
     *
     * @param item The line item to render.
     * @param index The index of the line item.
     * @returns The rendered fields for the line item.
     */
    const renderLineItemFields = (item: LineItem, index: number) => {
        switch (item.type) {
            case 'labor':
                return (
                    <>
                        <div>
                            <Label htmlFor={`hourlyRate-${index}`}>Hourly Rate</Label>
                            <Input
                                id={`hourlyRate-${index}`}
                                type="number"
                                value={item.hourlyRate}
                                onChange={(e) => updateLineItem(index, 'hourlyRate', Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <Label htmlFor={`hours-${index}`}>Number of Hours</Label>
                            <Input
                                id={`hours-${index}`}
                                type="number"
                                value={item.hours}
                                onChange={(e) => updateLineItem(index, 'hours', Number(e.target.value))}
                            />
                        </div>
                    </>
                );
            case 'material':
            case 'work-related':
                return (
                    <>
                        <div>
                            <Label htmlFor={`price-${index}`}>Price</Label>
                            <Input
                                id={`price-${index}`}
                                type="number"
                                value={item.price}
                                onChange={(e) => updateLineItem(index, 'price', Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <Label htmlFor={`units-${index}`}>Number of Units</Label>
                            <Input
                                id={`units-${index}`}
                                type="number"
                                value={item.units}
                                onChange={(e) => updateLineItem(index, 'units', Number(e.target.value))}
                            />
                        </div>
                    </>
                );
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Line Items</h2>
            {currentInvoice.details.lineItems.map((item, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                            <Label htmlFor={`type-${index}`}>Type</Label>
                            <Select
                                onValueChange={(value: LineItemType) => updateLineItem(index, 'type', value)}
                                value={item.type}
                            >
                                <SelectTrigger id={`type-${index}`}>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="labor">Labor</SelectItem>
                                    <SelectItem value="material">Material</SelectItem>
                                    <SelectItem value="work-related">Work-related Expense</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor={`description-${index}`}>Description</Label>
                            <Textarea
                                id={`description-${index}`}
                                value={item.description}
                                placeholder={
                                    item.type === 'labor'
                                        ? 'Describe the work'
                                        : item.type === 'material'
                                            ? 'Describe the purchased material'
                                            : item.type === 'work-related'
                                                ? 'Describe the work-related expense'
                                                : 'Enter a description'
                                }
                                onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                            />
                        </div>
                        {renderLineItemFields(item, index)}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <div><span className="text-neutral-500">Total:</span> <b>{currentInvoice.details.currency.symbol}{item.total.toFixed(2)}</b></div>
                        <Button variant="destructive" size="sm" onClick={() => removeLineItem(index)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Remove
                        </Button>
                    </div>
                </div>
            ))}
            <Button onClick={addLineItem}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Line Item
            </Button>
        </div>
    );
};