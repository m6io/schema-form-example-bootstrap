import { CustomFields } from "@react-formgen/json-schema";
import { BootstrapArrayField } from "./BootstrapArrayField";
import { BootstrapBooleanField } from "./BootstrapBooleanField";
import { BootstrapNumberField } from "./BootstrapNumberField";
import { BootstrapObjectField } from "./BootstrapObjectField";
import { BootstrapStringField } from "./BootstrapStringField";
import { BootstrapFormComponent } from "./BootstrapFormComponent";

/**
 * Custom Fields Object
 */
const bootstrapCustomFields: CustomFields = {
  ArrayField: BootstrapArrayField,
  BooleanField: BootstrapBooleanField,
  NumberField: BootstrapNumberField,
  ObjectField: BootstrapObjectField,
  StringField: BootstrapStringField,
};

export { bootstrapCustomFields, BootstrapFormComponent };
