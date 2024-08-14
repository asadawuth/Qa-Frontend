import { useState, useEffect } from "react";
import { useAuth } from "../hook/use-auth";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { verifyOtpSchema } from "../validate/validate";
import axios from "../config/axios";

const checkOtpSchema = (input) => {
  const { error } = verifyOtpSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});
    if (input.otp && input.otp.length < 4) {
      result.otp = "Please enter a 4-digit OTP";
    }
    return result;
  }
  return null;
};

export default function Otp() {
  const [messageError, setMessageError] = useState("");
  const [otpConfirm, setOtpConfirm] = useState("");
  const { authUser } = useAuth();
  const { email } = authUser || {};
  const navigate = useNavigate();
  const style =
    "text-black bg-slate-300 hover:bg-slate-500 p-4 text-2xl rounded-lg opacity-60";

  useEffect(() => {
    if (!authUser || !email) {
      navigate("/login");
    }
  }, [authUser, email, navigate]);

  const handleClear = () => {
    setOtpConfirm("");
    setMessageError("");
  };

  const handleConfirmOTP = async () => {
    console.log(otpConfirm);
    const validationResult = checkOtpSchema({ otp: otpConfirm });
    if (validationResult) {
      setMessageError(validationResult.otp);
      return;
    }

    try {
      const { data } = await axios.post("/auth/verifyotp", {
        otp: otpConfirm,
      });
      console.log("Response from server:", data);

      if (data.message === "OTP matched") {
        alert("OTP matched");
        navigate("/resetpassword");
      } else {
        setMessageError("Your number is wrong. Please check your mail again.");
      }
    } catch (error) {
      console.error("Error confirming OTP:", error); // เลขไม่ตรง

      if (error.response) {
        setMessageError(
          `Error: ${
            error.response.data.message ||
            "Request failed with status code " + error.response.status
          }`
        );
      } else if (error.request) {
        setMessageError(
          "No response received from the server. Please try again."
        );
      } else {
        setMessageError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form className="h-full w-full flex flex-col justify-center items-center gap-16">
      <div className="flex flex-col items-center gap-16 border-4 border-white p-24 rounded-2xl">
        <h1 className="text-white text-3xl">Send OTP to {email}</h1>
        <OtpInput
          value={otpConfirm}
          onChange={(otp) => setOtpConfirm(otp)}
          numInputs={4}
          renderSeparator={<span className="opacity-0">----------</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: "8vh",
            height: "8vh",
            fontSize: "2.5rem",
          }}
        />
        {messageError && <span className="text-white">{messageError}</span>}
        <div className="flex gap-24">
          <button type="button" className={style} onClick={handleClear}>
            Clear
          </button>
          <button type="button" className={style} onClick={handleConfirmOTP}>
            Confirm OTP
          </button>
        </div>
      </div>
    </form>
  );
}
