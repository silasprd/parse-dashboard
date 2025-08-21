export function buildClassSchemaData(schema, className, isUnique, uniqueField) {
    const columns = {};
    const userPointers = [];
    const schemaSimplifiedData = {};

    // Get the schema for the specified class
    const classSchema = schema.data.get('classes')?.get(className);
    if (classSchema) {
        schemaSimplifiedData[className] = {};
        classSchema.forEach(({ type, targetClass }, col) => {
            // Populate simplified schema and column metadata
            schemaSimplifiedData[className][col] = { type, targetClass };
            columns[col] = { type, targetClass };

            // Skip objectId or other columns when uniqueness is enforced
            if (col === 'objectId' || (isUnique && col !== uniqueField)) return;

            // Track user pointers and array columns separately
            if ((type === 'Pointer' && targetClass === '_User') || type === 'Array') {
                userPointers.push(col);
            }
        });
    }

    return { columns, userPointers, schemaSimplifiedData };
}