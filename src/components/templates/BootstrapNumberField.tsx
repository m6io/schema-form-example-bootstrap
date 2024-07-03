import { NumberSchema, useFieldData, useFieldErrors } from "@react-formgen/json-schema";

/**
 * Number Field Component Template
 * @param {NumberSchema} schema - The schema for the number field.
 * @param {string[]} path - The path to the number field in the form data.
 * @returns {JSX.Element} - The number field component.
 * @example
 * <BootstrapNumberField schema={schema} path={path} />
 *
 */
export const BootstrapNumberField: React.FC<{
  schema: NumberSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path);
  const errorsAtPath = useFieldErrors(path);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAtPath(event.target.value ? Number(event.target.value) : null);
  };

  return (
    <div className="mb-3">
      {schema.title && (
        <label className="form-label fw-bold">{schema.title}</label>
      )}
      <input
        type="number"
        value={valueAtPath ?? ""}
        onChange={handleChange}
        placeholder={schema.title || ""}
        list={
          Array.isArray(schema.examples)
            ? `${path.join("-")}-datalist`
            : undefined
        }
        className="form-control"
      />
      {schema.description && (
        <small className="form-text text-muted">{schema.description}</small>
      )}
      {Array.isArray(schema.examples) && (
        <datalist id={`${path.join("-")}-datalist`}>
          {schema.examples.map((example, index) => (
            <option key={index} value={example as number} />
          ))}
        </datalist>
      )}
      {errorsAtPath &&
        errorsAtPath.map((error, index) => (
          <div key={index} className="text-danger">
            {error.message}
          </div>
        ))}
    </div>
  );
};
