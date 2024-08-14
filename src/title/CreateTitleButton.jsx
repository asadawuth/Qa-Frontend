import { useState } from "react";
import CreateTitleForm from "../title/CreateTitleForm";
import Model from "../component/Model";

export default function CreateTitleButton({ createTitle }) {
  const [openModel, setOpenModel] = useState(false);
  return (
    <>
      <div className="flex justify-center h-[5vh]">
        <button
          onClick={() => setOpenModel(true)}
          type="submit"
          className="bg-slate-200 hover:bg-slate-300 rounded-lg font-bold px-3 py-2 mb-2"
        >
          CreateTitleButton
        </button>
        <Model
          title="CreateTitle"
          open={openModel}
          onClose={() => setOpenModel(false)}
        >
          <CreateTitleForm
            onSubmit={createTitle}
            onSuccess={() => setOpenModel(false)}
          />
        </Model>
      </div>
    </>
  );
}
