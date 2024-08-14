import { useAuth } from "../hook/use-auth";
import ChangePassInput from "./ChangePassInput";
import PassTextError from "./PassTextError";
import { useState } from "react";
import { changePasswordSchema } from "../validate/validate";

const validateChangePassword = (input) => {
  const { error } = changePasswordSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});

    if (input.newPassword === "" && !result.confirmPassword) {
      result.confirmPassword = "please enter your password";
    }

    return result;
  }
};

export default function RegisterForm() {
  const [inputChangePassword, setInputChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});
  const { changePassword } = useAuth();

  const handleChangeInput = (e) => {
    setInputChangePassword({
      ...inputChangePassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const result = validateChangePassword(inputChangePassword);
    if (result) {
      setError(result);
    } else {
      try {
        await changePassword(inputChangePassword);
        setSuccess({ message: "Change your password is success." });
      } catch (error) {
        if (error.response && error.response.data.message) {
          setError({ message: error.response.data.message });
        } else {
          setError({ message: "An error occurred. Please try again later." });
        }
        console.log(error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-3 px-9 py-3" onSubmit={handleSubmitForm}>
      <div>
        <ChangePassInput
          type="password"
          placeholder="oldpassword"
          name="oldPassword"
          onChange={handleChangeInput}
          value={inputChangePassword.oldPassword}
          hasError={error.oldPassword}
        />
        {error.oldPassword && <PassTextError message={error.oldPassword} />}
      </div>
      <div>
        <ChangePassInput
          type="password"
          placeholder="newPassword"
          name="newPassword"
          onChange={handleChangeInput}
          value={inputChangePassword.newPassword}
          hasError={error.newPassword}
        />
        {error.newPassword && <PassTextError message={error.newPassword} />}
      </div>
      <div>
        <ChangePassInput
          placeholder="confirmpassword"
          type="password"
          name="confirmPassword"
          onChange={handleChangeInput}
          value={inputChangePassword.confirmPassword}
          hasError={error.confirmPassword}
        />
        {error.confirmPassword && (
          <PassTextError message={error.confirmPassword} />
        )}
      </div>
      <span className="text-green-800">{success.message}</span>
      <span className="text-red-800">{error.message}</span>
      <ChangePasswordButton />
    </form>
  );
}

export function ChangePasswordButton() {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="bg-slate-200 hover:bg-slate-300 rounded-lg font-bold px-3 py-2"
      >
        Changeyourpassword
      </button>
    </div>
  );
}
