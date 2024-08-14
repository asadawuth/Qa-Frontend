import Model from "../component/Model";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import EditCommentInTitleForm from "./EditCommentInTitleForm";

export default function EditAllDataTitleButton({
  commentId,
  storyImage,
  oldText,
  updateComment,
  // allCommentinTitle,
  // setAllCommentinTitle,
}) {
  const [openModel, setOpenModel] = useState(false);

  return (
    <div className="flex gap-2 text-white">
      <div>
        <span className="text-lg">EditYourComment</span>
      </div>
      <div className="cursor-pointer pt-2">
        <FiEdit className="text-2xl" onClick={() => setOpenModel(true)} />
        <Model
          title="Edit your Comment"
          open={openModel}
          onClose={() => setOpenModel(false)}
        >
          <EditCommentInTitleForm
            commentId={commentId}
            oldText={oldText}
            storyImage={storyImage}
            onsucces={() => setOpenModel(false)}
            updateComment={updateComment}
            // allCommentinTitle={allCommentinTitle}
            // setAllCommentinTitle={setAllCommentinTitle}
          />
        </Model>
      </div>
    </div>
  );
}
