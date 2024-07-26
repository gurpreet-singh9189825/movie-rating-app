import { FC, useState } from "react";
import Input from "../../components/input/Input";
import Select from "../../components/select/Select";
import RadioInput from "../../components/radio/RadioInput";
import { Link } from "react-router-dom";
import { object, string, number, ValidationError } from "yup";
import * as Yup from "yup";
import "./register.css";
import { auth, db } from "../../authentication/firebase";
import { ToastContainer, toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { inputs, radios, optionsValues } from "../../assets/data/data";
import {
  collectionGroup,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

type FormData = {
  [key: string]: string;
};

const Register: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    age: "",
    mobileNo: "",
    radioGroup: "",
    country: "",
  });
  const [error, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const registerSchema = object({
    email: string()
      .email()

      .required("email is required"),

    password: string().min(8).required(),
    age: number()
      .required()
      .typeError("age is required")
      .positive("age cannot be negative")
      .moreThan(7)
      .lessThan(100),

    mobileNo: number()
      .positive()
      .typeError("mobile no cant be negative")
      .required()
      .typeError("mobile no is required")
      .test(
        "is-ten-digits",
        "mobile no must be exactly 10 digits long",
        (value) => {
          if (value == null) return false; // Handle null or undefined values
          const strValue = String(value);
          return strValue.length === 10;
        }
      ),

    radioGroup: string().required("Please select one of the options"),

    country: string().required("Please select your country"),
  });

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updateForm = {
      ...formData,
      [name]: value,
    };
    setFormData(updateForm);

    try {
      await registerSchema.validateAt(name, { [name]: value });
      setErrors({
        ...error,
        [name]: "",
      });
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        setErrors({
          ...error,
          [name]: validationError.message,
        });
      }
    }
  };

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const selectUpdate = {
      ...formData,
      [name]: value,
    };
    setFormData(selectUpdate);

    try {
      registerSchema.validateAt(name, { [name]: value });
      setErrors({
        ...error,
        [name]: "",
      });
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        setErrors({
          ...error,
          [name]: validationError.message,
        });
      }
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await registerSchema.validate(formData, { abortEarly: false });
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (userCredential.user) {
        toast.success("Registration successful!", {
          position: "top-right",
        });
        const id = userCredential.user.uid;
        try {
          const dataToSave = {
            email: formData.email,
            age: formData.age,
            mobileNo: formData.mobileNo,
            gender: formData.radioGroup,
            country: formData.country,
          };
          const registerRef = doc(db, "users", id);
          await setDoc(registerRef, dataToSave);
        } catch (error) {
          console.error("Error registering user: ", error);
        }
      }

      if (userCredential.user) {
        navigate("/");
      }
    } catch (validationErrors) {
      if (validationErrors instanceof ValidationError) {
        const newErrors: { [key: string]: string } = {};
        validationErrors.inner.forEach((err) => {
          newErrors[err.path as string] = err.message;
        });

        setErrors(newErrors);
      } else {
        console.error("An unexpected error occurred:", validationErrors);
      }
    }
  };

  const inputsRendered = inputs.map((input) => {
    return (
      <Input
        label={input.label}
        type={input.type}
        name={input.name}
        key={input.label}
        id={input.id}
        onChange={handleInputChange}
        value={formData[input.name]}
        placeholder={input.placeholder}
        error={error[input.name]}
        className={input.className}
      />
    );
  });

  return (
    <div className="bg-image">
      <div className="form-container">
        <h1>Registration Form</h1>
        <form className="registration-form" onSubmit={handleSubmit}>
          {inputsRendered}
          <RadioInput
            options={radios}
            onChange={handleInputChange}
            formData={formData}
            checked={true}
            errors={error}
            fieldsetName="radioGroup"
          />

          <Select
            options={optionsValues}
            onChange={handleSelectChange}
            value={formData.country}
            name="country"
            errors={error}
          />
          <div className="submit">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
          <div className="have-account">
            <div>
              <span>Already have Account</span>
              <Link to="/login" style={{ color: "red", marginLeft: "10px" }}>
                login here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
