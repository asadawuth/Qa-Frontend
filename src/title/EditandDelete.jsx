import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import Model from "../component/Model";
import { useState } from "react";
import axios from "../config/axios";
import EditTitleForm from "./EditTitleForm";

export default function EditandDelete({ titleId, setAllTitle, allTitle }) {
  const [openModelDelete, setOpenDelete] = useState(false);
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectTitle = (id) => {
    setSelectedId(id);
  };

  const style =
    "bg-slate-200 hover:bg-slate-300 rounded-lg font-bold px-6 py-2";

  const handleDeleteTitle = async () => {
    try {
      await axios.delete(`/title/${titleId}`);
      setAllTitle(allTitle.filter((el) => el.id !== titleId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex text-xl">
      <div className="flex gap-2">
        <div className="flex gap-2">
          <AiFillDelete onClick={() => setOpenDelete(true)} />
          <FiEdit
            onClick={() => {
              handleSelectTitle(titleId);
              setOpenModelEdit(true);
            }}
          />
          <Model
            title="Confirm delete your title"
            open={openModelDelete}
            onClose={() => setOpenDelete(false)}
          >
            <DeleteTitle
              onClose={() => setOpenDelete(false)}
              handleDeleteTitle={handleDeleteTitle}
              style={style}
            />
          </Model>
          <Model
            title="Edit your title"
            open={openModelEdit}
            onClose={() => setOpenModelEdit(false)}
          >
            <EditTitleForm
              onClose={() => setOpenModelEdit(false)}
              style={style}
              titleId={selectedId}
              setAllTitle={setAllTitle}
              allTitle={allTitle}
            />
          </Model>
        </div>
      </div>
    </div>
  );
}

export function DeleteTitle({ onClose, handleDeleteTitle, style }) {
  return (
    <>
      <div className="flex justify-center gap-4 py-4">
        <button className={style} onClick={handleDeleteTitle}>
          confirm
        </button>
        <button className={style} onClick={onClose}>
          cancel
        </button>
      </div>
    </>
  );
}
