import { forwardRef, useState } from 'react';
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button, Popover, PopoverContent, PopoverTrigger, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui";

interface ComboboxOption {
    value: string;
    label: string;
}

interface ComboboxProps {
    options: ComboboxOption[];
    placeholder: string;
    onChange: (value: string) => void;
    value: string;
}

/**
 * A combo box component that accepts an array of options, a placeholder, an onChange
 * handler, and a value. It renders a button with the placeholder text and a chevron.
 * When the button is clicked, it opens a popover with a list of options. The user can
 * search the options by typing in the input field. When the user selects an option, the
 * popover is closed and the onChange handler is called with the value of the selected
 * option.
 */
export const ComboBox = forwardRef<HTMLButtonElement, ComboboxProps>(
    ({ options, placeholder, onChange, value }, ref) => {
        const [open, setOpen] = useState(false);

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                        ref={ref}
                    >
                        {/* display the placeholder text if there is no value */}
                        {value
                            ? options.find((option) => option.value === value)?.label
                            : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
                        <CommandList>
                            {/* display a message if there are no options */}
                            <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
                            {/* group the options in a single group */}
                            <CommandGroup>
                                {/* map over the options and render a CommandItem for each one */}
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={(currentValue) => {
                                            onChange(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        {/* display a checkmark if the option is selected */}
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === option.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {/* display the label of the option */}
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    }
);