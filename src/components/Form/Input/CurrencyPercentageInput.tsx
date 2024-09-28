import { Percent } from 'lucide-react';
import { Input, Switch } from '@/components/ui';
import { InvoiceFormValues } from '@/constants/defaultInvoice';

interface CurrencyPercentageValue {
    enabled: boolean;
    amount: number;
    isPercentage: boolean;
}

interface CurrencyPercentageInputProps {
    label: 'discount' | 'tax' | 'shipping';
    value: CurrencyPercentageValue;
    currentInvoice: InvoiceFormValues;
    onChange: (updatedInvoice: InvoiceFormValues) => void;
}

/**
 * A component to input a currency amount with a switch to toggle its enabled
 * state and a button to toggle between a percentage and a fixed amount
 * 
 * @param label - the label to display next to the input field ('discount', 'tax', or 'shipping')
 * @param value - the current value of the input
 * @param currentInvoice - the current invoice
 * @param onChange - the function to call when the value of the input changes
 */
export const CurrencyPercentageInput: React.FC<CurrencyPercentageInputProps> = ({ label, value, currentInvoice, onChange }) => {
    /**
     * Toggles the enabled state of the input
     */
    const toggleChecked = () => {
        onChange({ ...currentInvoice, details: { ...currentInvoice.details, [label]: { ...value, enabled: !value.enabled } } });
    }

    /**
     * Updates the value of the input
     * @param e - the event to process
     */
    const updateValue = (e: { target: { value: string; }; }) => {
        onChange({ ...currentInvoice, details: { ...currentInvoice.details, [label]: { ...value, amount: Number(e.target.value) } } });
    }

    /**
     * Toggles the type of the input between a percentage and a fixed amount
     */
    const toggleType = () => {
        onChange({ ...currentInvoice, details: { ...currentInvoice.details, [label]: { ...value, isPercentage: !value.isPercentage } } });
    };

    return (
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center space-y-2 xl:space-y-0 space-x-2 min-h-10">
            <span className='flex items-center gap-2'>
                <Switch
                    checked={value.enabled}
                    onCheckedChange={toggleChecked}
                />
                <span>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
            </span>
            {value.enabled && (
                <span className='flex ml-auto gap-2'>
                    <Input
                        type="number"
                        value={value.amount}
                        onChange={updateValue}
                        className="w-24"
                        min={0}
                    />
                    <button onClick={toggleType} className='w-full'>
                        {value.isPercentage ? <Percent size={16} /> : <span className=''>{currentInvoice.details.currency.symbol}</span>}
                    </button>
                </span>
            )}
        </div>
    );
};