import { BiCommentDetail } from "react-icons/bi";
import axios from "../config/axios";
import { useEffect, useState } from "react";

export default function TotalComment({ titleId }) {
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    axios
      .get(`/title/totalcomment/${titleId}`)
      .then((res) => {
        setTotalComments(res.data.totalComments);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="flex gap-2 pr-8">
        <div className="pt-1">
          <BiCommentDetail className="text-xl" />
        </div>
        <span className="text-white left-10">
          {" "}
          {totalComments > 0 ? totalComments : ""}
        </span>
      </div>
    </>
  );
}
