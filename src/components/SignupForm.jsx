import { Form,useNavigation } from "react-router-dom";
import Input from "./UI/Input";
export default function SignupForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method="post" className="sign-up-form">
      <h2>Create Your Account</h2>
      <div className="form-group">
        <Input name="name" id="name" type="name" label="Name: " required />
      </div>
      <div className="form-group">
        <Input name="email" id="email" type="email" label="Email: " required />
      </div>
      <div className="form-group">
        <Input
          name="password"
          id="password"
          type="password"
          label="Password: "
          required
        />
      </div>
      <div className="form-group">
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting.." : "Sign Up"}</button>
      </div>
    </Form>
  );
}
