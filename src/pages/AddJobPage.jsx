import { json, redirect } from "react-router-dom";
import AddJob from "../components/AddJob";

export default function AddJobPage() {
  return <AddJob />;
}

export async function action({ request, params }) {
  const userId = params.userId;
  const data = await request.formData();
  const enteredData = {
    userId: Number(userId),
    title: data.get("title"),
    company: data.get("company"),
    location: data.get("location"),
    type: data.get("type"),
    status: data.get("status"),
    appliedDate: data.get("appliedDate"),
    salary: data.get("salary"),
    notes: data.get("notes"),
  };
  const response = await fetch("http://localhost:3000/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enteredData),
  });
  if (!response.ok) {
    throw json({ message: "Error adding job" }, { status: 401 });
  }
  const resData = await response.json();
  localStorage.setItem("newJob", JSON.stringify(resData.job));
  return redirect(`/${resData.job.userId}/dashboard/viewJob`);
}
