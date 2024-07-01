import { BaseObjectSchema, useFieldErrors } from "@m6oss/schema-form";
import { SchemaDefinitions } from "@m6oss/schema-form";
import { JSONSchema7, CustomFields } from "@m6oss/schema-form";
import { renderField } from "@m6oss/schema-form";

/**
 * Object Field Component Template
 * @param {BaseObjectSchema} schema - The schema for the object field.
 * @param {string[]} path - The path to the object field in the form data.
 * @param {SchemaDefinitions} definitions - The definitions object from the schema.
 * @param {CustomFields} customFields - The custom fields object.
 * @returns {JSX.Element} - The object field component.
 * @example
 * <BootstrapObjectField schema={schema} path={path} definitions={definitions} customFields={customFields} />
 *
 */
export const BootstrapObjectField: React.FC<{
  schema: BaseObjectSchema;
  path: string[];
  definitions: SchemaDefinitions;
  customFields?: CustomFields;
}> = ({ schema, path, definitions, customFields = {} }) => {
  const errorsAtPath = useFieldErrors(path);

  return (
    <div className="border border-secondary p-4 my-4 rounded">
      {schema.title && <label className="fw-bold">{schema.title}</label>}
      {schema.description && (
        <small className="text-muted">{schema.description}</small>
      )}
      {errorsAtPath &&
        errorsAtPath.map((error, index) => (
          <div key={index} className="text-danger">
            {error.message}
          </div>
        ))}
      <br />
      {schema.properties &&
        Object.keys(schema.properties).map((key) => (
          <div key={key}>
            {renderField(
              schema.properties?.[key] as JSONSchema7,
              [...path, key],
              definitions,
              customFields
            )}
          </div>
        ))}
    </div>
  );
};
