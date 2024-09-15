import { useState, useRef } from "react";
import LoadingWeb from "../component/LoadingWeb";

export default function CreateTitleForm({ onSuccess, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileComment, setFileComment] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [titleInputAndStorytest, setTitleInputAndStorytest] = useState({
    titlePost: "",
    storyTest: "",
  });
  const [errorTextTitle, setErrorTextTitle] = useState(true); // จริง
  const inputEl = useRef(null);
  const inputImage = useRef([]);
  // V.
  const [error, setError] = useState({});
  // V.

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    //////////////////////////////////////// // V.
    // const result = validateCreateForm(titleInputAndStorytest);
    // if (result) {
    //   setError(result);
    //   return;
    // } else {
    //   setError({});
    // }

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
        selectedFiles.forEach((file, index) => {
          formdata.append("poststoryImage", file);
        });
      }
      if (titleInputAndStorytest) {
        formdata.append("titleMessage", titleInputAndStorytest.titlePost);
        formdata.append("poststory", titleInputAndStorytest.storyTest);
      }
      // await axios.post("/title", formdata, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // for (let pair of formdata.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
      setLoading(true);
      await onSubmit(formdata);
      onSuccess();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const selectfile = (event, index) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    if (index !== undefined) {
      // เพิ่มหรือแทนที่ค่าที่มีอยู่ใน index ที่กำหนด
      const newFileComment = [...fileComment];
      newFileComment[index] = URL.createObjectURL(files[0]);
      setFileComment(newFileComment);
    } else {
      // เพิ่มค่าใหม่เข้าไปใน fileComment
      const newImages = files.map((file) => URL.createObjectURL(file));
      setFileComment((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const titleAndStoryText = (e) => {
    setTitleInputAndStorytest({
      ...titleInputAndStorytest,
      [e.target.name]: e.target.value,
    });
    if (errorTextTitle) {
      setErrorTextTitle(false);
    } //เกิดการขยับ
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
              src={file ? URL.createObjectURL(file) : "/src/assets/Addpic.jpg"}
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
              className={`border-3 rounded-lg  w-full px-4 text-xl
                ${error.titlePost ? "border-red-500" : "border-black"}`}
              name="titlePost"
              onChange={titleAndStoryText}
              value={titleInputAndStorytest.titlePost}
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
            />
            <CreateStory />
            <div className="flex flex-wrap justify-center gap-1">
              <label htmlFor="images" className="w-full flex justify-center">
                <img
                  src="/src/assets/Addpic.jpg"
                  className="object-fill w-[16vh] h-[16vh] cursor-pointer"
                  onClick={() => inputImage.current[0].click()}
                />
                <input
                  ref={(el) => (inputImage.current[0] = el)}
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
            </div>
            {/* // V. */}
            {/* // V. */}
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
        type="submit"
        className="bg-slate-200 text-2xl hover:bg-slate-300 rounded-lg font-bold px-3 py-2 mb-2"
      >
        Create Title
      </button>
    </div>
  );
}

{
  /* <button
                    type="button"
                    className="bg-slate-100 hover:bg-slate-300 mx-12 mt-1"
                    onClick={() => inputImage.current[index + 1].click()}
                  >
                    Edit
                  </button>
                  <input
                    ref={(el) => (inputImage.current[index + 1] = el)}
                    className="hidden"
                    name="images"
                    type="file"
                    onChange={(e) => selectfile(e, index)}
                    accept="image/png, image/jpeg, image/webp"
                  /> */
}
