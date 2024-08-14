import { RiDeleteBack2Fill } from "react-icons/ri";
import Model from "../component/Model";
import { useState } from "react";
import axios from "../config/axios";

export default function DeleteCommentIntitle({
  commentId,
  titleId,
  setAllCommentinTitle,
  allCommentinTitle,
}) {
  const [openModel, setOpenModel] = useState(false);

  //console.log(commentId, titleId);

  const handleDeleteComment = async () => {
    try {
      await axios.delete(`/comment/delete/${titleId}/${commentId}`);
      setAllCommentinTitle(
        allCommentinTitle.filter((comment) => comment.id !== commentId)
      );
      setOpenModel(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-end pr-4">
        <RiDeleteBack2Fill
          className="text-3xl cursor-pointer transform transition-transform duration-500 hover:scale-125 hover:rotate-12 hover:text-red-600"
          onClick={() => setOpenModel(true)}
        />
        <Model
          title="Confirm delete your Comment"
          open={openModel}
          onClose={() => setOpenModel(false)}
        >
          <DeleteComment
            onClose={() => setOpenModel(false)}
            deleteIdComment={handleDeleteComment}
          />
        </Model>
      </div>
    </>
  );
}

export function DeleteComment({ onClose, deleteIdComment }) {
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
      <button className={buttonStyle} onClick={deleteIdComment}>
        confirm
      </button>
      <button className={buttonStyle} onClick={onClose}>
        cancel
      </button>
    </div>
  );
}
