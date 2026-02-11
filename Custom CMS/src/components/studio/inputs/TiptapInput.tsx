import React from 'react';
import { useController, Control } from 'react-hook-form';
import { TiptapEditor } from './Tiptap/Editor';

interface TiptapInputProps {
    field: any;
    control: Control<any>;
    name: string;
}

export const TiptapInput: React.FC<TiptapInputProps> = ({ field, control, name }) => {
    const {
        field: { onChange, value },
    } = useController({
        name,
        control,
    });

    return (
        <div className="mb-6">
            <label className="block text-sm font-bold text-gray-200 mb-2">
                {field.title || field.name}
            </label>
            <TiptapEditor value={value} onChange={onChange} />
            {field.description && <p className="mt-1 text-xs text-gray-500">{field.description}</p>}
        </div>
    );
};
