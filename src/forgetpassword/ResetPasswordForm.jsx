import ResetPasswordInput from "./ResetPasswordInput";
import ResetPasswordError from "./ResetPasswordError";
import { useAuth } from "../hook/use-auth";
import { resetPasswordSchema } from "../validate/validate";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const validateResetPassword = (input) => {
  const { error } = resetPasswordSchema.validate(input, { abortEarly: false });
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

export default function ResetPasswordForm() {
  const [inputResetPassword, setInputChangePassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(null);
  const { resetPassword, authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser === null) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  const handleChangeInput = (e) => {
    setInputChangePassword({
      ...inputResetPassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const result = validateResetPassword(inputResetPassword);
    if (result) {
      setError(result);
    } else {
      try {
        await resetPassword(inputResetPassword);
        setSuccess({ message: "Change your password is success." });
        navigate("/login");
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
    <div className="h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col items-center gap-12 border border-white rounded-3xl p-14"
      >
        <div>
          <h1 className="text-white text-4xl">Reset Your Password</h1>
        </div>
        <div className="w-[320px]">
          <ResetPasswordInput
            type="password"
            placeholder="newPassword"
            name="newPassword"
            onChange={handleChangeInput}
            value={inputResetPassword.newPassword}
            hasError={error.newPassword}
          />
          <div className="pl-4 pt-2">
            {error.newPassword && (
              <ResetPasswordError message={error.newPassword} />
            )}
          </div>
        </div>
        <div className="w-[320px]">
          <ResetPasswordInput
            type="password"
            placeholder="confirmPassword"
            name="confirmPassword"
            onChange={handleChangeInput}
            value={inputResetPassword.confirmPassword}
            hasError={error.confirmPassword}
          />
          <div className="pl-4 pt-2">
            {error.confirmPassword && (
              <ResetPasswordError message={error.confirmPassword} />
            )}
          </div>
        </div>
        {success && <span className="text-white">{success.message}</span>}
        <div>
          <ResetPasswordButton />
        </div>
      </form>
    </div>
  );
}

export function ResetPasswordButton() {
  return (
    <button
      type="submit"
      className="bg-slate-200 hover:bg-slate-300 rounded-lg font-bold px-3 py-2"
    >
      Changeyourpassword
    </button>
  );
}
