import { useState } from "react";
import { forgotPasswordSchema } from "../validate/validate";
import { useAuth } from "../hook/use-auth";
import { useNavigate } from "react-router-dom";

const validateEmail = (input) => {
  const { error } = forgotPasswordSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});
    return result;
  } else {
    return {};
  }
};

function VerifyEmail() {
  const [inputVerifyEmail, setInputVerfyEmail] = useState({
    email: "",
  });
  const [error, setError] = useState({});
  const [errorEmailOrMobile, setErrorEmailOrMobile] = useState({});

  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const result = validateEmail(inputVerifyEmail);
    if (result) {
      setError({});
    } else {
      setError(result);
    }
    try {
      const authUser = await forgotPassword(inputVerifyEmail);
      if (authUser) {
        setErrorEmailOrMobile({ credential: "Database has a your Email." });
        navigate("/otp");
      }
    } catch (error) {
      setErrorEmailOrMobile({ credential: "Your email not Found." });
    }
  };
  return (
    <form
      onSubmit={handleSubmitForm}
      className="text-white text-4xl flex justify-center items-center w-full h-full"
    >
      <div className="flex flex-col gap-8 text-center border-2 border-white  p-14 rounded-xl">
        <h1>Guess Your Email</h1>
        <input
          className="text-black pl-5 pb-2 pt-2 rounded-2xl"
          name="email"
          onChange={(e) =>
            setInputVerfyEmail({ ...inputVerifyEmail, email: e.target.value })
          }
          value={inputVerifyEmail.email}
        />
        {errorEmailOrMobile.credential && (
          <span className="text-white text-2xl">
            {errorEmailOrMobile.credential}
          </span>
        )}
        {error.email && (
          <span className="text-white text-2xl">{error.email}</span>
        )}
        <ButtonVerifyEmail />
      </div>
    </form>
  );
}

export default VerifyEmail;

export function ButtonVerifyEmail() {
  return (
    <div>
      <button
        typeof="submit"
        className="bg-slate-100 hover:bg-slate-300 text-black rounded-lg w-64 py-2"
      >
        Submit
      </button>
    </div>
  );
}
