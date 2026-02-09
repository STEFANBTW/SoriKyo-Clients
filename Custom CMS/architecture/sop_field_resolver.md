# SOP: Recursive Field Resolver

## Objective
To dynamically generate a React form from a JSON schema definition.

## Logic Overview
1. **Input:** Receives a field definition object (e.g., `{ name: 'title', type: 'string' }`).
2. **Registry:** Matches the `type` to a corresponding React input component.
3. **Internal Recursion:** If the type is `object` or `array`, it calls itself for all nested fields.
4. **State Management:** Uses `react-hook-form` to track the overall document state.

## Component Mapping
- `string` -> `StringInput` (Standard input)
- `number` -> `NumberInput` (Numeric input)
- `image` -> `ImageInput` (Supabase Storage upload)
- `array` -> `ArrayInput` (DND list of sub-resolvers)
- `reference` -> `ReferenceInput` (Search/Select from `documents` table)
- `slug` -> `SlugInput` (Auto-generate from string)
- `block` -> `TiptapEditor` (Portable Text JSON)

## Implementation Pattern
```tsx
const FieldResolver = ({ field, control }) => {
  const Component = getComponent(field.type);
  if (field.type === 'object') {
    return field.fields.map(f => <FieldResolver field={f} control={control} />);
  }
  return <Component field={field} control={control} />;
}
```
