import { FC, useState } from "react";
import Input from "../../components/input/Input";
import "./login.css";
import { Link } from "react-router-dom";
import { object, string, ValidationError } from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../authentication/firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  [key: string]: string;
};

const Login: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [error, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const loginSchema = object({
    email: string()
      .email()

      .required("email is required"),

    password: string().required(),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    loginSchema
      .validateAt(event.target.name, {
        [event.target.name]: event.target.value,
      })
      .then(() => {
        setErrors({ ...error, [event.target.name]: "" });
      })
      .catch((validationError: ValidationError) => {
        setErrors({ ...error, [event.target.name]: validationError.message });
      });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await loginSchema.validate(formData, { abortEarly: false });

      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (userCredential.user) {
        toast.success("Login successful!", {
          position: "top-right",
        });
        navigate("/");
      } else {
        toast.error("Invalid credentials", {
          position: "top-right",
        });
      }
    } catch (errors) {
      if (errors instanceof ValidationError) {
        const newErrors: { [key: string]: string } = {};
        errors.inner.forEach((err) => {
          newErrors[err.path as string] = err.message;
        });

        setErrors(newErrors);
      } else {
        console.error("An unexpected error occurred:", errors);
        toast.error("Login failed. invalid credentials.", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="bg-image-login">
      <div className="form-container-login">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login Form</h1>
          <Input
            type="email"
            id="username"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="username"
            error={error["email"]}
          />

          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            error={error["password"]}
          />
          <div className="submit">
            <button type="submit" className="submit-button">
              Login
            </button>
          </div>
          <div>
            <span>Dont have Account,</span>
            <Link to="/register" style={{ color: "red", marginLeft: "10px" }}>
              Register here
            </Link>
            <span style={{ marginLeft: "10px" }}> Back to </span>
            <Link to="/" style={{ color: "red", marginLeft: "10px" }}>
              Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
