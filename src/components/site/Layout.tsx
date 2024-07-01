import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-body">
      <Navbar />
      <main className="p-4 flex-grow-1">
        <div className="container">
          <h1 className="display-4 text-center mb-4">
            @m6oss/schema-form - Bootstrap Example
          </h1>
          {children}
        </div>
      </main>
    </div>
  );
};
