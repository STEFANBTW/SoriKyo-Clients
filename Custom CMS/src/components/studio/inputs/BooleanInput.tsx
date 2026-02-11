import React from 'react';
import { useController, Control } from 'react-hook-form';
import { BooleanField } from '@/lib/schema/types';

interface BooleanInputProps {
    field: BooleanField;
    control: Control<any>;
    name: string;
}

export const BooleanInput: React.FC<BooleanInputProps> = ({ field, control, name }) => {
    const {
        field: { onChange, value, ref },
    } = useController({
        name,
        control,
    });

    return (
        <div className="mb-4 flex items-center">
            <input
                type="checkbox"
                checked={value || false}
                onChange={(e) => onChange(e.target.checked)}
                ref={ref}
                id={name}
                className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500 focus:ring-2"
            />
            <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-300 cursor-pointer">
                {field.title || field.name}
            </label>
            {field.description && <p className="ml-2 text-xs text-gray-500">({field.description})</p>}
        </div>
    );
};
