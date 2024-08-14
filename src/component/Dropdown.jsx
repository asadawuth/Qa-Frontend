import { BsKey } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BsRecordBtnFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../hook/use-auth";
import { useState } from "react";
import Model from "../component/Model";
import ChangePassForm from "../changepassword/ChangePassForm";
import { Link } from "react-router-dom";

function Dropdown() {
  const [openModel, setOpenModel] = useState(false);
  const { logout } = useAuth();
  const style = `"text-center flex gap-3 items-center hover:bg-slate-200 hover:rounded-lg px-2 p-2"`;
  const { authUser } = useAuth();
  // console.log(authUser.id);
  return (
    <>
      <div
        className="mt-16
        w-48
        absolute
        bg-white
        right-40
        translate-y-1
        border
        rounded-lg
        shadow-xl
        cursor-pointer
        flex flex-col gap-3
        p-2"
      >
        <Link to={`/userdata/${authUser.id}`}>
          <div className={`${style} pt-2`}>
            <CgProfile className="text-3xl" />
            Yourdata
          </div>
        </Link>
        <Link to={`/userdata/history/${authUser.id}`}>
          <div className={`${style}`}>
            <BsRecordBtnFill className="text-4xl" />
            History
          </div>
        </Link>
        <div className={`${style}`} onClick={() => setOpenModel(true)}>
          <BsKey className="text-4xl" />
          Changepassword
        </div>
        <div className={`${style}`} onClick={logout}>
          <HiOutlineLogout className="text-4xl" />
          Logout
        </div>
      </div>
      <Model
        title="ChangePassword"
        open={openModel}
        onClose={() => setOpenModel(false)}
      >
        <ChangePassForm />
      </Model>
    </>
  );
}

export default Dropdown;
