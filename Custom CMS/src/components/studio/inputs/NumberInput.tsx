import React from 'react';
import { useController, Control } from 'react-hook-form';
import { NumberField } from '@/lib/schema/types';

interface NumberInputProps {
    field: NumberField;
    control: Control<any>;
    name: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({ field, control, name }) => {
    const {
        field: { onChange, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules: { required: field.validation ? true : false, valueAsNumber: true },
    });

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
                {field.title || field.name}
            </label>
            <input
                type="number"
                value={value === undefined ? '' : value}
                onChange={(e) => onChange(e.target.valueAsNumber)}
                ref={ref}
                placeholder={field.description}
                className={`w-full px-3 py-2 bg-gray-800 border ${error ? 'border-red-500' : 'border-gray-700'
                    } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error.message || 'Invalid number'}</p>}
        </div>
    );
};
