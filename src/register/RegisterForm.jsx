import { useState } from "react";
import RegisterInput from "./RegisterInput";
import RegisterErrorMessage from "./RegisterErrorMessage";
import { useAuth } from "./../hook/use-auth";
import { registerSchema } from "../validate/validate";

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  // console.dir(error);
  // console.log(error.confirmPassword);
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});

    // เพิ่มเงื่อนไขเพื่อตรวจสอบ password เป็น string empty และมี error ให้แสดงที่ confirmPassword
    if (input.password === "" && !result.confirmPassword) {
      result.confirmPassword = "Please enter your password";
    }

    return result;
  }
};

export default function RegisterForm() {
  const { register } = useAuth();

  const [inputRegister, setInputRegister] = useState({
    nameWebsite: "",
    emailOrMobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const handleChangeInput = (e) => {
    console.log(e.target);
    setInputRegister({ ...inputRegister, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const result = validateRegister(inputRegister);
    if (result) {
      setError(result);
    } else {
      setError({});
    }
    register(inputRegister);
  };

  return (
    <form className="flex flex-col gap-3 px-9 py-3" onSubmit={handleSubmitForm}>
      <div>
        <RegisterInput
          placeholder="nameWebSite"
          name="nameWebsite"
          onChange={handleChangeInput}
          value={inputRegister.nameWebsite}
          hasError={error.nameWebsite}
        />
        {error.nameWebsite && (
          <RegisterErrorMessage message={error.nameWebsite} />
        )}
      </div>
      <div>
        <RegisterInput
          placeholder="emailOrMobile"
          name="emailOrMobile"
          onChange={handleChangeInput}
          value={inputRegister.emailOrMobile}
          hasError={error.emailOrMobile}
        />
        {error.emailOrMobile && (
          <RegisterErrorMessage message={error.emailOrMobile} />
        )}
      </div>
      <div>
        <RegisterInput
          placeholder="password"
          type="password"
          name="password"
          onChange={handleChangeInput}
          value={inputRegister.password}
          hasError={error.password}
        />
        {error.password && <RegisterErrorMessage message={error.password} />}
      </div>
      <div>
        <RegisterInput
          placeholder="confirmpassword"
          type="password"
          name="confirmPassword"
          onChange={handleChangeInput}
          value={inputRegister.confirmPassword}
          hasError={error.confirmPassword}
        />
        {error.confirmPassword && (
          <RegisterErrorMessage message={error.confirmPassword} />
        )}
      </div>
      <RegisterButton />
    </form>
  );
}

export function RegisterButton() {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="bg-slate-200 hover:bg-slate-300 rounded-lg font-bold px-3 py-2"
      >
        Sign up
      </button>
    </div>
  );
}
