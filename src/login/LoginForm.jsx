import { useState } from "react";
import LoginInput from "./LoginInput";
import { useAuth } from "../hook/use-auth";
import LoginErrorMessage from "./LoginErrorMessage";
import { loginSchema } from "../validate/validate";

const validateLogin = (input) => {
  const { error } = loginSchema.validate(input, { abortEarly: false });
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

export default function LoginForm() {
  const [signup, setSignup] = useState({
    emailOrMobile: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [errorEmailOrMobile, setErrorEmailOrMobile] = useState({});

  const { login } = useAuth();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const result = validateLogin(signup);
    if (result) {
      setError(result);
      setErrorEmailOrMobile({});
    } else {
      setError({});
      setErrorEmailOrMobile({});
    }

    try {
      const authUser = await login(signup);
      //console.log("authUser:", authUser);

      if (authUser) {
        setErrorEmailOrMobile({ credential: "" });
      }
    } catch (error) {
      setErrorEmailOrMobile({ credential: "Invalid credential" });
    }
  };

  return (
    <form
      className="flex flex-col gap-3 opacity-100"
      onSubmit={handleSubmitForm}
    >
      <h1 className="text-white text-2xl">Email or Phone number</h1>
      <LoginInput
        placeholder="Email or phone number"
        value={signup.emailOrMobile}
        onChange={(e) =>
          setSignup({ ...signup, emailOrMobile: e.target.value })
        }
      />
      {error.emailOrMobile && (
        <LoginErrorMessage message={error.emailOrMobile} />
      )}

      <h1 className="text-white text-2xl">Password</h1>
      <LoginInput
        type="password"
        placeholder="password"
        value={signup.password}
        onChange={(e) => setSignup({ ...signup, password: e.target.value })}
      />
      {error.password && <LoginErrorMessage message={error.password} />}
      <RememberForgetpassword />
      <LoginButton />
      <div className="w-full flex items-center justify-center">
        {errorEmailOrMobile.credential && (
          <LoginErrorMessage message={errorEmailOrMobile.credential} />
        )}
      </div>
    </form>
  );
}

export function RememberForgetpassword() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <label className=" flex gap-2 text-white">
          <input
            type="checkbox"
            className="w-[2vh]"
            id="remember-me"
            name="rememberMe"
          />
          Remember me
        </label>
      </div>
      <div>
        <a href="/verifyemail" className="text-white cursor-pointer">
          forgetpassword
        </a>
      </div>
    </div>
  );
}

export function LoginButton() {
  return (
    <button
      type="submit"
      className="bg-gray-200 text-gray-800 font-bold rounded-full hover:bg-gray-300 mx-28 mt-2 p-2"
    >
      Sign up
    </button>
  );
}
