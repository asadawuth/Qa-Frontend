import { useEffect, useState, useRef } from "react";
import LoadingWeb from "../component/LoadingWeb";
// import { useParams } from "react-router-dom";
// import axios from "../config/axios";

export default function EditCommentInTitleForm({
  commentId,
  storyImage,
  oldText,
  onsucces,
  updateComment,
  // allCommentinTitle,
  // setAllCommentinTitle,
}) {
  const [messageComment, setMessageComment] = useState({
    message: oldText || "",
  });
  const [filesComment, setFileComment] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const inputImagesComment = useRef([]); // หลายรูป Array
  const [loading, setLoading] = useState(false);
  // const { titleId } = useParams();

  console.log(oldText);

  useEffect(() => {
    // Directly use storyImage URLs if they're valid URLs กัน Run ไม่เลิก
    if (storyImage) {
      setFileComment(storyImage.split(",").map((url) => url.trim())); //  ทำเป็น Array ก่อน ถึงจะ Map ได้
    }
  }, [storyImage]);

  const handleSumitForm = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      if (messageComment) {
        formdata.append("message", messageComment.message);
      }
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((files) => {
          formdata.append("commentImage", files);
        });
      }

      // const upDateFilesComment = await axios.patch(
      //   `/comment/edit/${titleId}/${commentId}`,
      //   formdata,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      // setAllCommentinTitle([...allCommentinTitle, upDateFilesComment]);
      setLoading(true);
      await updateComment(formdata, commentId);
      onsucces();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const textComment = (e) => {
    setMessageComment({
      ...messageComment,
      [e.target.name]: e.target.value,
    });
  };

  const selectfile = (event, index) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files); // รข้อมูลรูปทั้งหมด
    if (index !== undefined) {
      const newFilesComment = URL.createObjectURL(files[0]);
      setSelectedFiles(newFilesComment);
    }
    const newImages = files.map((file) => URL.createObjectURL(file));
    setFileComment((prevImages) => [...prevImages, ...newImages]);
  };
  return (
    <>
      {loading && <LoadingWeb />}
      <form
        className="flex flex-col px-4 overflow-y-auto h-[75vh]"
        onSubmit={handleSumitForm}
      >
        <div className="flex flex-col w-full gap-2 overflow-y-auto">
          <CreateTextComment />
          <div>
            <textarea
              rows="10"
              className="w-full border-3 border-black rounded-lg text-xl pl-4"
              name="message"
              onChange={textComment}
              value={messageComment.message}
              // placeholder={oldText}
            />
          </div>
          <CreateImageComment />
          <div className="flex flex-wrap justify-center gap-1">
            <label htmlFor="images" className="w-full flex justify-center">
              <img
                src="/src/assets/Addpic.jpg"
                className="object-fill w-[16vh] h-[16vh] cursor-pointer"
                onClick={() => inputImagesComment.current[0].click()}
              />
              <input
                ref={(el) => (inputImagesComment.current[0] = el)}
                className="hidden"
                name="images"
                type="file"
                multiple
                onChange={(e) => selectfile(e)}
                accept="image/png, image/jpeg, image/webp"
              />
            </label>
            {filesComment.map((images, index) => (
              <div key={index} className="flex flex-wrap flex-col">
                <img src={images} className="w-[25vh] h-[25vh]" />
                <button
                  type="button"
                  className="bg-slate-100 hover:bg-slate-300 mx-12"
                  onClick={() =>
                    setFileComment(filesComment.filter((_, i) => i !== index))
                  }
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
        <CreateCommentButton />
      </form>
    </>
  );
}

export function CreateTextComment() {
  return (
    <div className="text-center text-xl font-semibold py-2">
      Edit message Comment
    </div>
  );
}

export function CreateImageComment() {
  return (
    <div className="text-center text-xl font-semibold py-2">
      Edit Images Comment
    </div>
  );
}

export function CreateCommentButton() {
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
    <div className="flex justify-center">
      <button type="submit" className={buttonStyle}>
        Editcomment
      </button>
    </div>
  );
}
