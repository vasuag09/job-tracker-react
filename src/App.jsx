import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import RootLayout from "./pages/Root";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/Error";
import { action as signUpAction } from "./pages/SignupPage";
import { action as loginAction } from "./pages/LoginPage";
import { action as addJobAction } from "./pages/AddJobPage";
import { loader as viewJobLoader } from "./pages/ViewPage";
import { action as editJobAction} from "./pages/EditJobPage"
import { loader as editJobLoader } from "./pages/EditJobPage";
import DashboardPage from "./pages/DashboardPage";
import AddJobPage from "./pages/AddJobPage";
import ViewPage from "./pages/ViewPage";
import EditJobPage from "./pages/EditJobPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signup", element: <SignupPage />, action: signUpAction },
      { path: "login", element: <LoginPage />, action: loginAction },
      {
        path: ":userId/dashboard",
        element: <DashboardPage />,
        children: [
          { path: "addJob", element: <AddJobPage />, action: addJobAction },
          { path: "viewJob", element: <ViewPage /> , loader: viewJobLoader},
          { path: ":jobId/editJob", element: <EditJobPage />, action: editJobAction, loader: editJobLoader}
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
