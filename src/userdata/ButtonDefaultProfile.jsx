import { useState } from "react";
import Model from "../component/Model";
import ConfirmsetImageDefault from "./ConfirmsetImageDefault";

export default function ButtonDefaultProfile() {
  const [openModel, setOpenModel] = useState(false);
  const styleButton =
    "bg-slate-200 hover:bg-slate-300 rounded-lg px-3 p-1 hover:text-white";
  return (
    <>
      <button className={styleButton} onClick={() => setOpenModel(true)}>
        Don't want to show profile
      </button>
      <Model
        title="Confirm don't want your profile"
        open={openModel}
        onClose={() => setOpenModel(false)}
      >
        <ConfirmsetImageDefault />
      </Model>
    </>
  );
}
