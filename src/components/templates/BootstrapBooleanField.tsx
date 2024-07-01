import {
  BooleanSchema,
  useFieldData,
  useFieldErrors,
} from "@m6oss/schema-form";

/**
 * Boolean Field Component Template
 * @param {BooleanSchema} schema - The schema for the boolean field.
 * @param {string[]} path - The path to the boolean field in the form data.
 * @returns {JSX.Element} - The boolean field component.
 * @example
 * <BootstrapBooleanField schema={schema} path={path} />
 *
 */
export const BootstrapBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  // Early return if no oneOf options. This is the default boolean field.
  if (!schema.oneOf) {
    return <BootstrapCheckboxBooleanField schema={schema} path={path} />;
  }

  // Return the appropriate boolean field based on the uiSchema.
  switch (schema.uiSchema?.component) {
    case "radio":
      return <BootstrapRadioBooleanField schema={schema} path={path} />;
    case "switch":
      return <BootstrapSwitchBooleanField schema={schema} path={path} />;
    default: // in the case that the uiSchema does not match radio or switch
      return <BootstrapCheckboxBooleanField schema={schema} path={path} />;
  }
};

/**
 * Radio Boolean Field Component Template.
 *
 * For schemas defined like this:
 * ```json
 *    {
 *      "type": "boolean",
 *      "uiSchema": "radio",
 *      "oneOf": [
 *        {
 *          "const": true,
 *          "title": "Yes"
 *        },
 *        {
 *          "const": false,
 *          "title": "No"
 *        }
 *      ]
 *    }
 * ```
 * @param {BooleanSchema} schema - The schema for the radio boolean field.
 * @param {string[]} path - The path to the radio boolean field in the form data.
 * @returns {JSX.Element} - The radio boolean field component.
 * @example
 * <BootstrapRadioBooleanField schema={schema} path={path} />
 *
 */
export const BootstrapRadioBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path, false);
  const errorsAtPath = useFieldErrors(path);

  if (!schema.oneOf || schema.uiSchema?.component !== "radio") {
    return;
  } else {
    return (
      <div className="d-flex flex-column">
        {schema.title && <label className="fw-bold">{schema.title}</label>}
        {schema.oneOf.map((option) => (
          <div className="form-check" key={option.title}>
            <input
              className="form-check-input"
              type="radio"
              checked={valueAtPath === option.const}
              onChange={() => setValueAtPath(option.const)}
            />
            <label className="form-check-label">{option.title}</label>
          </div>
        ))}
        {schema.description && (
          <small className="text-muted">{schema.description}</small>
        )}
        {errorsAtPath &&
          errorsAtPath.map((error, index) => (
            <div key={index} className="text-danger">
              {error.message}
            </div>
          ))}
      </div>
    );
  }
};

/**
 * Switch Boolean Field Component Template.
 *
 * For schemas defined like this:
 * ```json
 *    {
 *      "type": "boolean",
 *      "uiSchema": "switch",
 *      "oneOf": [
 *        {
 *          "const": true,
 *          "title": "On"
 *        },
 *        {
 *          "const": false,
 *          "title": "Off"
 *        }
 *      ]
 *    }
 * ```
 * @param {BooleanSchema} schema - The schema for the switch boolean field.
 * @param {string[]} path - The path to the switch boolean field in the form data.
 * @returns {JSX.Element} - The switch boolean field component.
 * @example
 * <BootstrapSwitchBooleanField schema={schema} path={path} />
 *
 */
export const BootstrapSwitchBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path, false);
  const errorsAtPath = useFieldErrors(path);

  if (!schema.oneOf || schema.uiSchema?.component !== "switch") {
    return;
  } else {
    return (
      <div className="d-flex flex-column">
        {schema.title && <label className="fw-bold">{schema.title}</label>}
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={valueAtPath}
            onChange={(event) => setValueAtPath(event.target.checked)}
          />
          <label className="form-check-label">
            {schema.oneOf.find((option) => option.const === valueAtPath)?.title}
          </label>
        </div>
        {schema.description && (
          <small className="text-muted">{schema.description}</small>
        )}
        {errorsAtPath &&
          errorsAtPath.map((error, index) => (
            <div key={index} className="text-danger">
              {error.message}
            </div>
          ))}
      </div>
    );
  }
};

/**
 * Checkbox Boolean Field Component Template.
 *
 * For schemas defined like this:
 * ```json
 *    {
 *      "type": "boolean"
 *    }
 * ```
 * @param {BooleanSchema} schema - The schema for the checkbox boolean field.
 * @param {string[]} path - The path to the checkbox boolean field in the form data.
 * @returns {JSX.Element} - The checkbox boolean field component.
 * @example
 * <BootstrapCheckboxBooleanField schema={schema} path={path} />
 *
 */
export const BootstrapCheckboxBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path, false);
  const errorsAtPath = useFieldErrors(path);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAtPath(event.target.checked);
  };

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        checked={valueAtPath}
        onChange={handleChange}
      />
      {schema.title && (
        <label className="form-check-label">{schema.title}</label>
      )}
      {schema.description && (
        <small className="text-muted">{schema.description}</small>
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
