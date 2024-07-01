import { StringSchema, useFieldData, useFieldErrors } from "@m6oss/schema-form";

export const BootstrapStringField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  // Early return if the schema has oneOf or enum options.
  if (schema.enum || schema.oneOf) {
    return <BootstrapSelectField schema={schema} path={path} />;
  } // Check if the schema has a format of date, datetime, or date-time. If so, return the BootstrapDateField component.
  else if (
    schema.format &&
    ["date", "datetime", "date-time"].includes(schema.format)
  ) {
    return <BootstrapDateField schema={schema} path={path} />;
  } // Check if the schema has a uiSchema of textarea. If so, return the BootstrapTextareaField component.
  else if (schema.uiSchema?.component === "textarea") {
    return <BootstrapTextareaField schema={schema} path={path} />;
  }
  return <BootstrapInputField schema={schema} path={path} />;
};

/**
 * Input Field Component Template
 * @param {StringSchema} schema - The schema for the input field.
 * @param {string[]} path - The path to the input field in the form data.
 * @returns {JSX.Element} - The input field component.
 * @example
 * <BootstrapInputField schema={schema} path={path} />
 */
const BootstrapInputField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path);
  const errorsAtPath = useFieldErrors(path);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAtPath(event.target.value);
  };

  const inputType =
    schema.format && ["password", "email", "url"].includes(schema.format)
      ? schema.format
      : schema.uiSchema?.component === "tel"
        ? "tel"
        : "text";

  return (
    <div className="mb-3">
      {schema.title && (
        <label className="form-label fw-bold">{schema.title}</label>
      )}
      <input
        type={inputType}
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
            <option key={index} value={example as string} />
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

/**
 * Textarea Field Component Template
 * @param {StringSchema} schema - The schema for the textarea field.
 * @param {string[]} path - The path to the textarea field in the form data.
 * @returns {JSX.Element} - The textarea field component.
 * @example
 * <BootstrapTextareaField schema={schema} path={path} />
 */
const BootstrapTextareaField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path);
  const errorsAtPath = useFieldErrors(path);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValueAtPath(event.target.value);
  };

  return (
    <div className="mb-3">
      {schema.title && (
        <label className="form-label fw-bold">{schema.title}</label>
      )}
      <textarea
        value={valueAtPath ?? ""}
        onChange={handleChange}
        placeholder={schema.title || ""}
        className="form-control"
      />
      {schema.description && (
        <small className="form-text text-muted">{schema.description}</small>
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

/**
 * Select Field Component Template
 * @param {StringSchema} schema - The schema for the select field.
 * @param {string[]} path - The path to the select field in the form data.
 * @returns {JSX.Element} - The select field component.
 * @example
 * <BootstrapSelectField schema={schema} path={path} />
 */
const BootstrapSelectField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path, "");
  const errorsAtPath = useFieldErrors(path);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValueAtPath(event.target.value);
  };

  return (
    <div className="mb-3">
      {schema.title && (
        <label className="form-label fw-bold">{schema.title}</label>
      )}
      <select
        value={valueAtPath}
        onChange={handleChange}
        className="form-select"
      >
        <option value=""></option>
        {schema.enum
          ? schema.enum.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))
          : schema.oneOf?.map((option) => (
              <option key={option.const} value={option.const}>
                {option.title}
              </option>
            ))}
      </select>
      {schema.description && (
        <small className="form-text text-muted">{schema.description}</small>
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

/**
 * Date Field Component Template
 * @param {StringSchema} schema - The schema for the date field.
 * @param {string[]} path - The path to the date field in the form data.
 * @returns {JSX.Element} - The date field component.
 * @example
 * <BootstrapDateField schema={schema} path={path} />
 */
const BootstrapDateField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path, "");
  const errorsAtPath = useFieldErrors(path);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAtPath(event.target.value);
  };

  const inputType =
    schema.format === "datetime" ? "datetime-local" : schema.format;

  return (
    <div className="mb-3">
      {schema.title && (
        <label className="form-label fw-bold">{schema.title}</label>
      )}
      <input
        type={inputType}
        value={valueAtPath}
        onChange={handleChange}
        placeholder={schema.title || ""}
        className="form-control"
      />
      {schema.description && (
        <small className="form-text text-muted">{schema.description}</small>
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
