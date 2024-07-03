import formSchema from "./schema.json";
import { JSONSchema7, FormProvider } from "@react-formgen/json-schema";
import { Layout } from "./components/site/Layout";
import {
  bootstrapCustomFields,
  BootstrapFormComponent,
} from "./components/templates";

const App: React.FC = () => {
  const schema: JSONSchema7 = formSchema as JSONSchema7;

  const initialData = {
    firstName: "John Doe",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",
    homepage: "https://example.com",
    birthday: "1990-01-01",
    is_active: true,
    address: {
      street_address: "123 Main St",
      city: "Somewhere",
      state: "CA",
    },
  };

  return (
    <Layout>
      <div className="container pb-4">
        <FormProvider schema={schema} initialData={initialData}>
          <BootstrapFormComponent
            onSubmit={(data) => console.log("Form submitted:", data)}
            onError={(errors) => console.error("Form errors:", errors)}
            customFields={bootstrapCustomFields}
          />
        </FormProvider>
      </div>
    </Layout>
  );
};

export default App;
