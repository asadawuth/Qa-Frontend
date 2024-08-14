import { RiDeleteBack2Fill } from "react-icons/ri";
import Model from "../component/Model";
import { useState } from "react";
import axios from "../config/axios";

export default function DeleteTitleInBoardTitleId({
  setAllDataTitleId,
  allDataTitleId,
  titleId,
  setError,
}) {
  const [openModel, setOpenModel] = useState(false);

  const handleDeleteTitle = async () => {
    try {
      await axios.delete(`/title/${titleId}`);
      setAllDataTitleId(allDataTitleId.filter((el) => el.id !== titleId));
      setAllDataTitleId(null);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-end pt-2 text-2xl/>">
      <div>
        <RiDeleteBack2Fill
          onClick={() => setOpenModel(true)}
          className="text-6xl cursor-pointer transform transition-transform duration-500 hover:scale-125 hover:rotate-12 hover:text-red-600"
        />
        <Model
          title="Confirm delete your Title"
          open={openModel}
          onClose={() => setOpenModel(false)}
        >
          <DeleteIdTitle
            onClose={() => setOpenModel(false)}
            handleDeleteTitle={handleDeleteTitle}
          />
        </Model>
      </div>
    </div>
  );
}

export function DeleteIdTitle({ onClose, handleDeleteTitle }) {
  const buttonStyle = `
      bg-slate-200 
      hover:bg-slate-300 
      rounded-lg 
      font-bold 
      px-6 
      py-2 
      transition-transform 
      duration-500 
      transform 
      hover:scale-110 
      hover:rotate-6 
      hover:text-red-600
      animate-pulse
    `;

  return (
    <div className="flex justify-center gap-4 py-4">
      <button className={buttonStyle} onClick={handleDeleteTitle}>
        confirm
      </button>
      <button className={buttonStyle} onClick={onClose}>
        cancel
      </button>
    </div>
  );
}
