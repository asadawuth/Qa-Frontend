import { Link, useParams } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import { useAuth } from "../hook/use-auth";
import EditCommentInTitleButton from "./EditCommentInTitleButton";
import DeleteCommentIntitle from "./DeleteCommentIntitle";
import LikeAndDislikeIdComment from "./LikeAndDislikeIdComment";

export default function CommentinTitle({
  allCommentinTitle,
  setAllCommentinTitle,
  updateComment,
}) {
  const { authUser } = useAuth();
  const { titleId } = useParams();

  return (
    <>
      {allCommentinTitle.map((comment) => (
        <div
          key={comment.id}
          className="border-2 border-white rounded-md text-white pl-8 pr-8 pb-2 pt-2 mb-4 w-full"
        >
          {authUser.id === comment.userId && (
            <DeleteCommentIntitle
              commentId={comment.id}
              titleId={titleId}
              allCommentinTitle={allCommentinTitle}
              setAllCommentinTitle={setAllCommentinTitle}
            />
          )}

          <div className="flex gap-4">
            <div className="cursor-pointer pt-2">
              <Link to={`/userdata/${comment.user.id}`}>
                <Avatar src={comment.user.profileWebsite} />
              </Link>
            </div>
            <div className="pt-2">
              <div>{comment.user.nameWebsite}</div>
              <div>{new Date(comment.createdAt).toLocaleString()}</div>
            </div>
          </div>
          <div className="text-white mb-2 text-xl pt-4 break-words">
            {comment.message}
          </div>
          {comment.commentImage &&
            comment.commentImage.split(",").map((url, index) => (
              <div className="pb-4" key={index}>
                <img
                  src={url}
                  alt={`Comment Image ${index}`}
                  className="w-full h-full pb-2 rounded-xl"
                />
              </div>
            ))}
          <div
            className={`flex text-xl pt-2 ${
              authUser.id !== comment.userId ? "" : "justify-evenly pr-4"
            }`}
          >
            <LikeAndDislikeIdComment
              totalLike={comment.totalLike}
              totalDislike={comment.totalDislike}
              commentLikes={comment.commentLikes}
              commentDislikes={comment.commentDislikes}
              commentId={comment.id}
            />
            {authUser.id === comment.userId && (
              <EditCommentInTitleButton
                commentId={comment.id}
                oldText={comment.message}
                storyImage={comment.commentImage}
                updateComment={updateComment}
                // allCommentinTitle={allCommentinTitle}
                // setAllCommentinTitle={setAllCommentinTitle}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
