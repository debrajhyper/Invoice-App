import { Input, Label } from "@/components/ui";

interface InputFieldProps {
    name: string;
    label: string;
    type: string;
    value: string;
    onChange: (name: string, value: string) => void;
}

/**
 * A single input field component.
 *
 * @param name - The name of the field.
 * @param label - The label to display next to the field.
 * @param type - The type of the input field. Defaults to 'text'.
 * @param value - The current value of the field.
 * @param onChange - A callback function to call when the value changes.
 */
export const InputField: React.FC<InputFieldProps> = ({ name, label, type = 'text', value, onChange }) => {
    return (
        <div>
            {/* The label for the input field. */}
            <Label htmlFor={name}>{label}</Label>
            {/* The input field itself. */}
            <Input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
            />
        </div>
    );
};