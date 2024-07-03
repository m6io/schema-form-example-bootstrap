import { SchemaDefinitions, useArrayField } from "@react-formgen/json-schema";
import { JSONSchema7, BaseArraySchema, CustomFields } from "@react-formgen/json-schema";
import { renderField } from "@react-formgen/json-schema";
import { HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";

/**
 * Array Field Component Template
 * @param {BaseArraySchema} schema - The schema for the array field.
 * @param {string[]} path - The path to the array field in the form data.
 * @param {SchemaDefinitions} definitions - The definitions object from the schema.
 * @param {CustomFields} customFields - The custom fields object.
 * @returns {JSX.Element} - The array field component.
 * @example
 * <BootstrapArrayField schema={schema} path={path} definitions={definitions} customFields={customFields} />
 */
export const BootstrapArrayField: React.FC<{
  schema: BaseArraySchema;
  path: string[];
  definitions: SchemaDefinitions;
  customFields?: CustomFields;
}> = ({ schema, path, definitions, customFields = {} }) => {
  const { valueAtPath, errorsAtPath, moveItem, removeItem, addItem } =
    useArrayField(path, schema, definitions, []);

  return (
    <div className="border border-secondary p-4 my-4 d-flex flex-column rounded">
      {schema.title && <label className="fw-bold">{schema.title}</label>}
      {schema.description && (
        <small className="text-muted">{schema.description}</small>
      )}
      <br />
      {schema.items &&
        Array.isArray(valueAtPath) &&
        valueAtPath.map((_, index: number) => (
          <div className="position-relative" key={index}>
            <div
              className="btn-group position-absolute top-0 end-0"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => moveItem(index, "up")}
                disabled={index === 0}
              >
                <HiChevronUp />
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => moveItem(index, "down")}
                disabled={index === valueAtPath.length - 1}
              >
                <HiChevronDown />
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeItem(index)}
              >
                <HiX />
              </button>
            </div>

            {renderField(
              schema.items as JSONSchema7,
              [...path, index.toString()],
              definitions,
              customFields
            )}
          </div>
        ))}
      <button className="mt-4 btn btn-primary" type="button" onClick={addItem}>
        Add Item
      </button>
      {errorsAtPath &&
        errorsAtPath.map((error, index) => (
          <div key={index} className="text-danger">
            {error.message}
          </div>
        ))}
    </div>
  );
};
