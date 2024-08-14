import Avatar from "./../avatar/Avatar";
import defaultsImage from "../assets/blank.png"; // ภาพ defaults
import Dropdown from "../component/Dropdown";
import PageHeader from "./PageHeader";
import { useState } from "react";
import HeaderMain from "./HeaderMain";
import { useAuth } from "../hook/use-auth";

function Header() {
  return (
    <div className="flex items-center p-6 justify-around">
      <HeaderMain />
      <PageHeader />
      <HeaderMainDropdown />
    </div>
  );
}
export default Header;

export function HeaderMainDropdown() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { authUser } = useAuth();
  return (
    <div className="flex gap-1">
      <div className="flex gap-6 text-white pt-3">
        <div>User</div>
        <div className="text-white">{authUser.nameWebsite}</div>
      </div>
      <div
        className="cursor-pointer pl-4"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <Avatar src={authUser.profileWebsite || defaultsImage} />
      </div>
      {openDropdown && <Dropdown />}
    </div>
  );
}
