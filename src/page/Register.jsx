import Model from "../component/Model";
import RegisterForm from "../register/RegisterForm";
import { useState } from "react";

function Register() {
  const [openModel, setOpenModel] = useState(false);
  return (
    <div className="flex flex-col gap-3 cursor-pointer pl-4 text-white">
      <h6>Don't have an account</h6>
      <h6 onClick={() => setOpenModel(true)}>Create an account</h6>
      <Model
        title="Register"
        open={openModel}
        onClose={() => setOpenModel(false)}
      >
        <RegisterForm />
      </Model>
    </div>
  );
}
export default Register;
