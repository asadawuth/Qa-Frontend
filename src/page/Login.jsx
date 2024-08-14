import { AiOutlineLogin } from "react-icons/ai";
import LoginForm from "../login/LoginForm";
import Register from "./Register";
import {
  FaFacebookSquare,
  FaYoutube,
  FaTiktok,
  FaLine,
  FaInstagram,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa";

function Login() {
  return (
    <div className="flex justify-center items-center h-100 w-100">
      <div className="h-[75vh] w-[50vh] border-2 border-white rounded-xl p-4 flex flex-col gap-3 ">
        <h1 className="text-white text-4xl text-center">Q & A</h1>
        <LoginForm />
        <Register />
        <SignNonePass />
      </div>
    </div>
  );
}
export default Login;

export function SignNonePass() {
  return (
    <div className="flex justify-around">
      <div className="flex gap-2 text-white">
        <h1 className="mt-1">Signup</h1>
        <AiOutlineLogin className="text-3xl" />
      </div>
      <div className="flex items-center justify-center gap-3 text-white text-2xl cursor-pointer">
        <FaFacebookSquare />
        <FaGoogle />
        <FaTwitter />
        <FaInstagram />
        <FaLine />
        <FaTiktok />
        <FaYoutube />
      </div>
    </div>
  );
}
