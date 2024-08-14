import { Link } from "react-router-dom";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

export default function HistoryComment({ allComments }) {
  return (
    <div className="text-white p-4 overflow-y-auto">
      <div className="text-4xl text-center pb-4">History Comment</div>
      <div className="grid grid-cols-1 gap-4">
        {allComments.map((comments) => (
          <div
            key={comments.id}
            className="border border-white p-4 rounded-lg shadow-md"
          >
            <div>
              <div className="flex flex-col gap-4">
                <div>
                  <Link to={`/boardtitle/commenttitle/${comments.titleId}`}>
                    <div className="text-sm underline hover:text-orange-200 overflow-hidden">
                      {comments.message}
                    </div>
                  </Link>
                </div>

                <div>
                  <div className="flex gap-2">
                    {comments.commentImage ? (
                      comments.commentImage
                        .split(",")
                        .map((imageUrl, index) => (
                          <img
                            key={index}
                            src={imageUrl}
                            className="w-[16vh] rounded-2xl"
                            alt={`Comment Image ${index}`}
                          />
                        ))
                    ) : (
                      <img className="hidden" />
                    )}
                  </div>
                </div>
              </div>

              {/* //////////////////// */}
              <div className="flex justify-between pt-4">
                <div>
                  <div className="">
                    {new Date(comments.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex gap-2">
                    <AiFillLike
                    // className={liked ? "text-amber-500" : ""}
                    />
                    <span>{comments.totalLike}</span>
                  </div>
                  <div className="flex gap-2">
                    <AiFillDislike
                    // className={disliked ? "text-amber-500" : ""}
                    />
                    <span>{comments.totalDislike}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
