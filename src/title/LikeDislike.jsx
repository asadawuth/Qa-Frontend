import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { useAuth } from "../hook/use-auth";
import axios from "../config/axios";
import { useState } from "react";

export default function LikeDislike({
  totalLike = 0,
  totalDislike = 0,
  titleLikes = [],
  titleDisLikes = [],
  titleId,
}) {
  const [likes, setLikes] = useState(titleLikes); // Ex [ { userId : 1 },{ userId : 2 } ]
  const [dislikes, setDislikes] = useState(titleDisLikes); // Ex [ { userId : 1 },{ userId : 2 } ]
  const [likeCount, setLikeCount] = useState(totalLike); // จังหวะแรกจำนวณ totalLike ใน Alltitle
  const [dislikeCount, setDislikeCount] = useState(totalDislike); // จังหวะแรกจำนวณ totalDisLike ใน Alltitle

  const { authUser } = useAuth();
  const liked = likes.find((el) => el.userId === authUser.id); // หา liked [ userId ที่ === authUser ( userที่ Login ) ] ไม่มีจะเป็น Undefind
  const disliked = dislikes.find((el) => el.userId === authUser.id); // หา disliked [ userId ที่ === authUser ( userที่ Login ) ] ม่มีจะเป็น Undefind

  const handleClickLike = async () => {
    try {
      await axios.post(`/title/${titleId}/like`);
      if (liked) {
        // มีอยู่แล้ว เป็นจริง
        setLikes(likes.filter((el) => el.userId !== authUser.id)); // เอา userId ที่ = authUser ออก
        setLikeCount(likeCount - 1); // ลดจำนวนไลค์
      } else {
        setLikes([...likes, { userId: authUser.id }]);
        // ถ้าไม่เป็นจริง ยังไม่มี  ให้ // Ex [ { userId : 1 },{ userId : 2 } ] เอา userId: authUser.id เข้าไปด้วย
        setLikeCount(likeCount + 1); // เพิ่มจำนวนไลค์ ใน titlle
      }
      // ถ้าผู้ใช้กดดิสไลค์อยู่ ให้ลบออกและลดจำนวนดิสไลค์
      if (disliked) {
        setDislikes(dislikes.filter((el) => el.userId !== authUser.id)); // เอา userId ที่ = authUser ออก
        setDislikeCount(dislikeCount - 1); // ลดจำนวนดิสไลค์ ใน titlle
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDisLike = async () => {
    try {
      await axios.post(`/title/${titleId}/dislike`);
      if (disliked) {
        // มีอยู่แล้ว เป็นจริง
        setDislikes(dislikes.filter((el) => el.userId !== authUser.id)); // เอา userId ที่ = authUser ออก
        setDislikeCount(dislikeCount - 1); // ลดจำนวนดิสไลค์
      } else {
        setDislikes([...dislikes, { userId: authUser.id }]); // เอา userId ที่ = authUser ออก
        setDislikeCount(dislikeCount + 1); // เพิ่มจำนวนดิสไลค์
      }

      // ถ้าผู้ใช้กดไลค์อยู่ ให้ลบออกและลดจำนวนไลค์
      if (liked) {
        setLikes(likes.filter((el) => el.userId !== authUser.id)); // เอา userId ที่ = authUser ออก
        setLikeCount(likeCount - 1); // ลดจำนวนไลค์
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <AiFillLike
          className={liked ? "text-amber-500" : ""} // มี ส้ม // ไม่มี ขาว
          onClick={handleClickLike}
        />
        <span className="text-white">{likeCount}</span>
      </div>
      <div className="flex gap-2">
        <AiFillDislike
          className={disliked ? "text-amber-500" : ""} // มี ส้ม // ไม่มี ขาว
          onClick={handleClickDisLike}
        />
        <span className="text-white">{dislikeCount}</span>
      </div>
    </>
  );
}
