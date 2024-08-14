import { AiFillDislike, AiFillLike } from "react-icons/ai";

export default function LikeAndDislikeInTitleId({
  handleClickLike,
  handleClickDisLike,
  liked,
  disliked,
  totalLike,
  totalDislike,
}) {
  return (
    <>
      <div className="flex gap-4">
        <div className="flex gap-2">
          <AiFillLike
            className={`cursor-pointer ${liked ? "text-amber-500" : ""}`}
            onClick={handleClickLike}
          />
          <span>{totalLike}</span>
        </div>
        <div className="flex gap-2">
          <AiFillDislike
            className={`cursor-pointer ${disliked ? "text-amber-500" : ""}`}
            onClick={handleClickDisLike}
          />
          <span>{totalDislike}</span>
        </div>
      </div>
    </>
  );
}
