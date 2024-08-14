import { AiFillDislike, AiFillLike } from "react-icons/ai";
import axios from "../config/axios";
import { useAuth } from "../hook/use-auth";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function LikeAndDislikeIdComment({
  totalLike = 0, // ค่าเริ่มต้นของ Likes
  totalDislike = 0, // ค่าเริ่มต้นของ DisLikes
  commentLikes = [], //Ex [ { userId : 1 },{ userId : 2 } ]
  commentDislikes = [], //Ex [ { userId : 1 },{ userId : 2 } ]
  commentId,
}) {
  const { titleId } = useParams();
  const { authUser } = useAuth();
  const [likes, setLikes] = useState(commentLikes);
  const [dislikes, setDislikes] = useState(commentDislikes);
  const [likeCount, setLikeCount] = useState(totalLike); // จำนวณที่เอามาโชว์ ui
  const [dislikeCount, setDislikeCount] = useState(totalDislike); // จำนวณที่เอามาโชว์ ui

  const liked = likes.find((el) => el.userId === authUser.id); // ใน [ ] มี userId ที่ตรงกับ authUser.id ของผู้ Login ไหม
  const disLiked = dislikes.find((el) => el.userId === authUser.id); // ใน [ ] มี userId ที่ตรงกับ authUser.id ของผู้ Login ไหม

  const handleClickLike = async () => {
    try {
      await axios.post(`/comment/${titleId}/${commentId}/like`); // ส่งไป backned
      setLikes((prevLikes) => {
        const updatedLikes = liked // เป็นจริงไหม
          ? prevLikes.filter((el) => el.userId !== authUser.id) // liked  มีไหม ถ้ามี ให้เอาออก => liked = undefind
          : [...prevLikes, { userId: authUser.id }]; // ถ้าไม่มี เพิ่ม userId : authUser.id ของตาราง
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
        return updatedLikes;
      });
      // ถ้าผู้ใช้กดดิสไลค์อยู่ ให้ลบออกและลดจำนวนดิสไลค์ มีการ Dislike อยู่แล้ว
      if (disLiked) {
        setDislikes((prevDislikes) => {
          setDislikeCount(dislikeCount - 1); // ลดลงไป 1
          return prevDislikes.filter((el) => el.userId !== authUser.id); // เอา authUser.id  disLiked กลับมาไม่เป็นจริง
        });
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleClickDislike = async () => {
    try {
      await axios.post(`/comment/${titleId}/${commentId}/dislike`);
      setDislikes((prevDislikes) => {
        const updatedDislikes = disLiked
          ? prevDislikes.filter((el) => el.userId !== authUser.id)
          : [...prevDislikes, { userId: authUser.id }];
        setDislikeCount(disLiked ? dislikeCount - 1 : dislikeCount + 1);
        return updatedDislikes;
      });

      if (liked) {
        setLikes((prevLikes) => {
          setLikeCount(likeCount - 1);
          return prevLikes.filter((el) => el.userId !== authUser.id);
        });
      }
    } catch (error) {
      console.error("Error handling dislike:", error);
    }
  };

  return (
    <div>
      <div className="flex gap-4 pl-6">
        <div className="flex gap-2">
          <AiFillLike
            className={`cursor-pointer ${liked ? "text-amber-500" : ""}`} // มี สีส้ม ไม่มี Undefind
            onClick={handleClickLike}
          />
          <span>{likeCount}</span>
        </div>
        <div className="flex gap-2">
          <AiFillDislike
            className={`cursor-pointer ${disLiked ? "text-amber-500" : ""}`} // มี สีส้ม ไม่มี Undefind
            onClick={handleClickDislike}
          />
          <span>{dislikeCount}</span>
        </div>
      </div>
    </div>
  );
}
