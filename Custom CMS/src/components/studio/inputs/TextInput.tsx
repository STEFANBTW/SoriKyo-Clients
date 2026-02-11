import React from 'react';
import { useController, Control } from 'react-hook-form';
import { TextField } from '@/lib/schema/types';

interface TextInputProps {
    field: TextField;
    control: Control<any>;
    name: string;
}

export const TextInput: React.FC<TextInputProps> = ({ field, control, name }) => {
    const {
        field: { onChange, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules: { required: field.validation ? true : false },
    });

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
                {field.title || field.name}
            </label>
            <textarea
                value={value || ''}
                onChange={onChange}
                ref={ref}
                rows={field.rows || 3}
                placeholder={field.description}
                className={`w-full px-3 py-2 bg-gray-800 border ${error ? 'border-red-500' : 'border-gray-700'
                    } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error.message || 'This field is required'}</p>}
        </div>
    );
};
