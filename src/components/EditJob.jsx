import { Form, useLoaderData } from "react-router-dom";
import Input from "./UI/Input";

export default function EditJob() {
    const data = useLoaderData()
  return (
    <Form method="post" className="edit-job-form">
      <h2>Edit Job</h2>

      <div className="form-group">
        <Input name="title" id="title" label="Job Title:" type="text" defaultValue={data.title} required />
      </div>

      <div className="form-group">
        <Input name="company" id="company" label="Company Name:" type="text" defaultValue={data.company} required />
      </div>

      <div className="form-group">
        <Input name="location" id="location" label="Location:" defaultValue={data.location} type="text" />
      </div>

      <div className="form-group">
        <label htmlFor="type">Job Type:</label>
        <select id="type" name="type" required>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Job Status:</label>
        <select id="status" name="status" required>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="form-group">
        <Input name="appliedDate" id="appliedDate" label="Date Applied:" defaultValue={data.appliedDate} type="date" />
      </div>

      <div className="form-group">
        <Input name="salary" id="salary" label="Salary:" defaultValue={data.salary} type="text" />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea id="notes" name="notes" rows="4" defaultValue={data.notes} />
      </div>

      <div className="form-group">
        <button type="submit">Update Job</button>
      </div>
    </Form>
  );
}
