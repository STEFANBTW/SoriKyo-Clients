import React from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import { ArrayField } from '@/lib/schema/types';
import { FieldResolver } from '../FieldResolver'; // Recursive usage for items

interface ArrayInputProps {
    field: ArrayField;
    control: Control<any>;
    name: string;
}

export const ArrayInput: React.FC<ArrayInputProps> = ({ field, control, name }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    // Determine what type of items we are adding
    // For simplicity v1: We assume the array has one 'of' type, or we pick the first one.
    const itemType = field.of[0];

    const handleAddItem = () => {
        // Default value generation based on type
        let defaultValue: any = '';
        if (itemType.type === 'object') defaultValue = {};
        if (itemType.type === 'number') defaultValue = 0;
        if (itemType.type === 'boolean') defaultValue = false;

        append(defaultValue);
    };

    return (
        <div className="mb-6 p-4 border border-gray-800 rounded-lg bg-gray-900/30">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <label className="block text-sm font-bold text-gray-200">
                        {field.title || field.name}
                    </label>
                    <p className="text-xs text-gray-500">{field.description}</p>
                </div>
                <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-xs text-white rounded border border-gray-600 transition-colors"
                >
                    + Add Item
                </button>
            </div>

            <div className="space-y-3">
                {fields.map((item, index) => (
                    <div key={item.id} className="flex gap-2 items-start group">
                        <div className="flex-1">
                            {/* Render the input for this specific item index */}
                            {/* We need to pass a specific field definition for the item */}
                            <FieldResolver
                                field={{ ...itemType, title: `${index + 1}` }} // Hack title for list
                                control={control}
                                name={`${name}.${index}`}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="mt-8 p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-all bg-gray-800/50"
                            title="Remove item"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                        </button>
                    </div>
                ))}

                {fields.length === 0 && (
                    <div className="text-center py-6 border-2 border-dashed border-gray-800 rounded text-gray-600 text-xs">
                        List is empty.
                    </div>
                )}
            </div>
        </div>
    );
};
