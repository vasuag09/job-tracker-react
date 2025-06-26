import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Header from "../components/Header";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "Something went wrong.";

  // Handle different error types
  if (isRouteErrorResponse(error)) {
    // If the error is a Response from a rejected loader/action
    title = `Error ${error.status}`;
    message = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <>
      <Header />
      <main className="error-page">
        <h1>{title}</h1>
        <p>{message}</p>
      </main>
    </>
  );
}
