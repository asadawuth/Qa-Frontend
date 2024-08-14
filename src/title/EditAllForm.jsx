import { useState, useRef, useEffect } from "react";
import LoadingWeb from "../component/LoadingWeb";

export default function EditAllForm({
  onClose,
  titletext,
  storytext,
  titleImage,
  storyImage,
  updatedTitle,
}) {
  const [loading, setLoading] = useState(false);
  const [titleInputAndStorytest, setTitleInputAndStorytest] = useState({
    titlePost: "",
    storyTest: "",
  });
  const [file, setFile] = useState(null);
  const [fileComment, setFileComment] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorTextTitle, setErrorTextTitle] = useState(true); // จริง
  const inputEl = useRef(null);
  const inputImages = useRef([]);
  // V.
  const [error, setError] = useState({});
  // V.

  useEffect(() => {
    // Directly use storyImage URLs if they're valid URLs
    if (storyImage) {
      setFileComment(storyImage.split(",").map((url) => url.trim())); //  ทำเป็น Array ก่อน ถึงจะ Map ได้
    }
  }, [storyImage]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    //////////////////////////////////////// // V.
    let newError = {};
    if (!titleInputAndStorytest.titlePost.trim()) {
      newError.titlePost = "Title cannot be empty";
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    } else {
      setError({});
    }
    //////////////////////////////////////// // V.
    try {
      const formdata = new FormData();
      if (file) {
        formdata.append("titleImage", file);
      }
      if (selectedFiles) {
        selectedFiles.forEach((file) => {
          formdata.append("poststoryImage", file);
        });
      }
      if (titleInputAndStorytest) {
        formdata.append("titleMessage", titleInputAndStorytest.titlePost);
        formdata.append("poststory", titleInputAndStorytest.storyTest);
      }

      setLoading(true);
      await updatedTitle(formdata);
      // const updatedTitle = await axios.patch(
      //   `/title/editalltitle/${numId}`,
      //   formdata,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      onClose();
    } catch (error) {
      console.error("Error editing title:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectfile = (event) => {
    const files = Array.from(event.target.files);
    console.log(event.target.files);
    if (files.every((file) => file instanceof File)) {
      setSelectedFiles(files);
      const newImages = files.map((file) => URL.createObjectURL(file));
      setFileComment(newImages);
    }
  };

  const titleAndStoryText = (e) => {
    setTitleInputAndStorytest({
      ...titleInputAndStorytest,
      [e.target.name]: e.target.value,
    });
    if (errorTextTitle) {
      setErrorTextTitle(false);
    }
  };

  return (
    <>
      {" "}
      {loading && <LoadingWeb />}
      <form
        className="flex justify-center flex-col p-1 h-[75vh]"
        onSubmit={handleSubmitForm}
      >
        <div className="flex flex-col w-full gap-2 overflow-y-auto">
          <div className="h-2vh flex flex-col justify-center">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : titleImage || "/src/assets/Addpic.jpg"
              }
              //alt="titlepost"
              className="object-fill h-[24vh] cursor-pointer pr-20 pl-20"
              onClick={() => inputEl.current.click()}
            />
            {inputEl && (
              <input
                type="file"
                ref={inputEl}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            )}
            {file && (
              <div className="flex justify-center pt-3">
                <button
                  type="button"
                  className="bg-slate-200 text-2xl hover:bg-slate-300 rounded-lg font-bold px-3 py-2 mb-2"
                  onClick={() => {
                    inputEl.current.value = "";
                    setFile(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
            <CreateImage />
          </div>
          <div className="p-2">
            <textarea
              rows="2"
              className={`border-3 rounded-lg w-full px-4 text-xl
                 ${error.titlePost ? "border-red-500" : "border-black"}`}
              name="titlePost"
              onChange={titleAndStoryText}
              value={titleInputAndStorytest.titlePost || ""}
              placeholder={titletext}
            />
            {/* // V. */}
            {error.titlePost && (
              <span className="text-red-500">{error.titlePost}</span>
            )}
            {/* // V. */}
            <CreateTitle />
            <textarea
              rows="10"
              className="border-3 rounded-lg border-black w-full px-4 text-xl"
              name="storyTest"
              onChange={titleAndStoryText}
              value={titleInputAndStorytest.storyTest}
              placeholder={storytext}
            />

            <CreateStory />
            <div className="flex flex-wrap justify-center gap-1">
              <label htmlFor="images" className="w-full flex justify-center">
                <img
                  src={"/src/assets/Addpic.jpg"}
                  className="object-fill w-[16vh] h-[16vh] cursor-pointer"
                  onClick={() => inputImages.current[0].click()}
                />
                <input
                  ref={(el) => (inputImages.current[0] = el)}
                  className="hidden"
                  name="images"
                  type="file"
                  multiple
                  onChange={(e) => selectfile(e)}
                  accept="image/png, image/jpeg, image/webp"
                />
              </label>
              {fileComment.map((image, index) => (
                <div key={index} className="flex flex-wrap flex-col">
                  <img src={image} className="w-[25vh] h-[25vh]" />
                  <button
                    type="button"
                    className="bg-slate-100 hover:bg-slate-300 mx-12"
                    onClick={() =>
                      setFileComment(fileComment.filter((_, i) => i !== index))
                    }
                  >
                    Cancel
                  </button>
                </div>
              ))}

              {!inputImages.current[0] &&
                storyImage &&
                storyImage
                  .split(",")
                  .map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      className="w-full rounded-2xl"
                      alt={`Poststory Image ${index}`}
                    />
                  ))}
            </div>
            <CreateImageStory />
          </div>
        </div>
        <CreateTitleButton />
      </form>
    </>
  );
}

export function CreateImage() {
  return (
    <div className="text-center text-xl font-semibold pt-3">
      Click image for Create title image
    </div>
  );
}

export function CreateTitle() {
  return (
    <div className="text-center text-xl font-semibold py-2">Create title</div>
  );
}

export function CreateStory() {
  return (
    <div className="text-center font-semibold text-xl">
      Create text your story
    </div>
  );
}

export function CreateImageStory() {
  return (
    <div className="text-center font-semibold text-xl">
      Create image your story
    </div>
  );
}

export function CreateTitleButton() {
  return (
    <div className="flex justify-center">
      <button
        className="bg-slate-200 text-2xl hover:bg-slate-300 rounded-lg font-bold px-3 py-2 mb-2"
        type="submit"
      >
        Edit
      </button>
    </div>
  );
}
