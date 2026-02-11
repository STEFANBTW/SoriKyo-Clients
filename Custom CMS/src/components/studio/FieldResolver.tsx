import React from 'react';
import { FieldType } from '@/lib/schema/types';
import { StringInput } from './inputs/StringInput';
import { ImageInput } from './inputs/ImageInput';
import { TextInput } from './inputs/TextInput';
import { NumberInput } from './inputs/NumberInput';
import { BooleanInput } from './inputs/BooleanInput';
import { ArrayInput } from './inputs/ArrayInput';
import { TiptapInput } from './inputs/TiptapInput';

interface FieldResolverProps {
    field: FieldType;
    control: any; // React Hook Form control
    name: string; // Form field name (path)
}

export const FieldResolver: React.FC<FieldResolverProps> = ({ field, control, name }) => {
    switch (field.type) {
        case 'string':
            return <StringInput field={field} control={control} name={name} />;

        case 'text':
            return <TextInput field={field} control={control} name={name} />;

        case 'image':
            return <ImageInput field={field} control={control} name={name} />;

        case 'number':
            return <NumberInput field={field} control={control} name={name} />;

        case 'boolean':
            return <BooleanInput field={field} control={control} name={name} />;

        case 'block':
            return <TiptapInput field={field} control={control} name={name} />;

        case 'object':
            return (
                <div className="p-4 border border-gray-700 rounded-lg bg-gray-900/50 mb-4">
                    <h3 className="font-bold text-gray-200 mb-2 uppercase text-xs tracking-wider">{field.title || field.name}</h3>
                    {/* Recursive rendering for objects */}
                    {field.fields.map((subField: FieldType) => (
                        <FieldResolver
                            key={subField.name}
                            field={subField}
                            control={control}
                            name={`${name}.${subField.name}`}
                        />
                    ))}
                </div>
            );

        case 'array':
            return <ArrayInput field={field} control={control} name={name} />;

        default:
            return <div className="text-red-500 mb-4">Unknown field type: {(field as any).type}</div>;
    }
};
