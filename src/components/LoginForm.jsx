import { Form, useActionData, useNavigation } from "react-router-dom";
import Input from "./UI/Input";
export default function LoginForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method="post" className="login-form">
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging In.." : "Login"}
        </button>
      </div>
    </Form>
  );
}
