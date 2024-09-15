import { useState, useRef, useEffect } from "react";
import LoadingWeb from "../component/LoadingWeb";
import axios from "../config/axios";
import defaultpost from "../assets/defaultpost.jpg";

export default function EditTitleForm({
  onClose,
  style,
  titleId,
  setAllTitle,
}) {
  const [loading, setLoading] = useState(false);
  const inputEl = useRef(null);
  const [file, setFile] = useState();
  const [oldData, setOldData] = useState({});
  const [titleMessageInput, setTitleMessageInput] = useState({
    titleMessage: oldData.titleMessage || "",
  });
  // V.
  const [error, setError] = useState({});
  // V.

  useEffect(() => {
    axios
      .get(`/title/get/${titleId}`)
      .then((res) => {
        setOldData(res.data);

        setTitleMessageInput({
          ...titleMessageInput,
          titleMessage: res.data.titleMessage,
        });
      })
      .catch((err) => console.log(err));
  }, [titleId]);

  //console.log(oldData);
  // console.log("oldData.titleMessage", oldData.titleMessage);

  const handleEditTitle = async (e) => {
    e.preventDefault();
    //////////////////////////////////////// // V.
    let newError = {};
    if (!titleMessageInput.titleMessage.trim()) {
      newError.titleMessage = "Title cannot be empty";
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
      if (titleMessageInput.titleMessage) {
        formdata.append("titleMessage", titleMessageInput.titleMessage);
      }
      if (file) {
        formdata.append("titleImage", file);
      }
      setLoading(true);
      const res = await axios.patch(`/title/edit/${titleId}`, formdata);
      const updatedTitle = res.data.title;

      setAllTitle((prevTitles) =>
        prevTitles.map((title) => (title.id === titleId ? updatedTitle : title))
      );

      onClose(); // ปิด modal หลังจากแก้ไขสำเร็จ
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const titleText = (e) => {
    setTitleMessageInput({
      ...titleMessageInput,
      [e.target.name]: e.target.value,
    });
    // if (errorTextTitle) {
    //   setErrorTextTitle(false);
    // }
  };

  return (
    <>
      {loading && <LoadingWeb />}
      <form className="p-2" onSubmit={handleEditTitle}>
        <div className="pb-4">Edit ImageTitle</div>
        <div className="flex flex-col justify-center pb-8">
          <div>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : oldData.titleImage || defaultpost
              }
              onClick={() => inputEl.current.click()}
              className="w-[56vh] h-[32vh] rounded-lg"
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
          </div>
          <div>
            {file && (
              <div className="flex justify-center pt-3">
                <button
                  type="button"
                  className="bg-slate-200 text-2xl hover:bg-slate-300 rounded-lg font-bold px-3 py-2"
                  onClick={() => {
                    inputEl.current.value = "";
                    setFile(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="pb-2">Edit TextTitle</div>
          <textarea
            rows="2"
            className={`border-3 rounded-lg w-full px-4 text-xl
               ${error.titleMessage ? "border-red-500" : "border-black"}`}
            name="titleMessage"
            onChange={titleText}
            value={titleMessageInput.titleMessage}
            // placeholder={oldData.titleMessage}
          />
          {/* // V. */}
          {error.titleMessage && (
            <span className="text-red-500">{error.titleMessage}</span>
          )}
          {/* // V. */}
          <div className="flex  gap-4 pt-2">
            <button className={style}>confirm</button>
            <button className={style} onClick={onClose}>
              cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
