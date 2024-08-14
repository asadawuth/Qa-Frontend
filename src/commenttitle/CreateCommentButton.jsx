import Model from "../component/Model";
import { useState } from "react";
import CreateCommentForm from "./CreateCommentForm";

export default function CreateCommentButton({ createCommentInTitleId }) {
  const [openModel, setOpenModel] = useState(false);
  return (
    <>
      <div className="right-80 top-8 h-[5vh] absolute flex flex-col gap-4">
        <button
          className="bg-slate-200 hover:bg-slate-300 rounded-lg text-center font-bold px-4 pt-1 pb-1 text-2xl cursor-pointer"
          onClick={() => setOpenModel(true)}
          type="submit"
        >
          Createcomment
        </button>
        <Model
          title="CreateComment"
          open={openModel}
          onClose={() => setOpenModel(false)}
        >
          <CreateCommentForm
            onSuccess={() => setOpenModel(false)}
            createCommentInTitleId={createCommentInTitleId}
          />
        </Model>
        <a
          href="/boardtitle"
          className="bg-slate-200 hover:bg-slate-300 rounded-lg text-center font-bold px-12 pt-1 pb-1 text-2xl cursor-pointer"
        >
          BoardRoom
        </a>
      </div>
    </>
  );
}
