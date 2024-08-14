import Model from "../component/Model";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import EditAllForm from "./EditAllForm";

export default function EditAllDataTitleButton({
  titletext,
  storytext,
  titleImage,
  storyImage,
  updatedTitle,
}) {
  const [openModel, setOpenModel] = useState(false);
  return (
    <div className="flex gap-2">
      <div>
        <span className="text-lg">EditYourTitle</span>
      </div>
      <div className="cursor-pointer pt-2">
        <FiEdit className="text-2xl" onClick={() => setOpenModel(true)} />
        <Model
          title="Edit your Title"
          open={openModel}
          onClose={() => setOpenModel(false)}
        >
          <EditAllForm
            onClose={() => setOpenModel(false)}
            titletext={titletext}
            storytext={storytext}
            titleImage={titleImage}
            storyImage={storyImage}
            updatedTitle={updatedTitle}
          />
        </Model>
      </div>
    </div>
  );
}
