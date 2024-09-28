import { InputField } from './Input/InputField';

interface UserData {
    name: string;
    phone: string;
    email: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
}

interface UserFormProps {
    data: UserData;
    onChange: (data: Partial<UserData>) => void;
    title: string;
}

/**
 * A form component to capture user data.
 *
 * @param data - The initial data that is used to populate the form.
 * @param onChange - A callback function that is called whenever a field is changed.
 * @param title - The title of the form.
 */
export const UserForm: React.FC<UserFormProps> = ({ data, onChange, title }) => {
    /**
     * A helper function to handle changes to individual fields.
     * @param name - The name of the field that has changed.
     * @param value - The new value of the field.
     */
    const handleFieldChange = (name: string, value: string) => {
        onChange({ [name]: value });
    };

    /**
     * The list of fields that make up the form.
     */
    const formFields: Array<{ name: keyof UserData; label: string; type: string }> = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'phone', label: 'Phone', type: 'tel' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'address', label: 'Address', type: 'text' },
        { name: 'zipCode', label: 'Pin Code', type: 'text' },
        { name: 'city', label: 'City', type: 'text' },
        { name: 'country', label: 'Country', type: 'text' },
    ];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="space-y-2">
                {formFields.map((field) => (
                    <InputField
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        value={data[field.name]}
                        type={field.type}
                        onChange={handleFieldChange}
                    />
                ))}
            </div>
        </div>
    );
};