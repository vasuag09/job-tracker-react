import { redirect, json } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return <LoginForm />;
}

export async function action({ request }) {
  const data = await request.formData();
  const enteredData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enteredData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw json(
      { message: errorData.message || "Login Failed" },
      { status: 401 }
    );
  }
  const resData = await response.json();
  localStorage.setItem("user", JSON.stringify(resData.user));
  return redirect(`/${resData.user.id}/dashboard`);
}
