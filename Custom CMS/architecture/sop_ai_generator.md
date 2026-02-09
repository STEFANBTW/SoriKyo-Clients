# SOP: AI Schema Generator (Agentic Flow)

## Objective
To convert natural language requirements into a valid `schema.ts` file.

## Flow
1. **Trigger:** User types a prompt (e.g., "I need a gallery for luxury cars").
2. **LLM Context:** System sends the prompt along with the `SchemaDefinition` TypeScript type definition to the LLM.
3. **LLM Output:** LLM returns a JSON object following the `SchemaDefinition` structure.
4. **Validation:** System validates the output against a Zod schema.
5. **Code Generation:** System converts the JSON object into TypeScript code (using `defineType` and `defineField`).
6. **Hot-Reload:** System writes the file and triggers a studio reload.

## Prompt Engineering Template
"You are a Senior Content Architect. Based on the user's request, produce a valid TypeScript Schema following the @omni-cms/core standard. Return ONLY the JSON object."

## Human-in-the-loop (HITL)
The user should review the generated fields before the file is written to the disk.
