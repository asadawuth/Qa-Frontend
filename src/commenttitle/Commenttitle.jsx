import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import { useAuth } from "../hook/use-auth";
import CreateCommentButton from "./CreateCommentButton";
import EditAllDataTitleButton from "../title/EditAllDataTitleButton";
import CommentinTitle from "./CommentInTitle";
import DeleteTitleInBoardTitleId from "./DeleteTitleInBoardIdTitleId";
import DataIdTitle from "./DataIdTitle";
import LikeAndDislikeInTitleId from "./LikeAndDislikeInTitleId";
import LoadingWeb from "../component/LoadingWeb";

export default function CommentTitle() {
  const [allDataTitleId, setAllDataTitleId] = useState({});
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [totalLike, setTotalLike] = useState(0);
  const [totalDislike, setTotalDisLike] = useState(0);
  const [webname, setWebname] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [storyText, setStoryTest] = useState("");
  const [imageUserCreate, setImageUserCreate] = useState("");
  ///////////////////////////////////
  const [error, setError] = useState(false);
  const { titleId } = useParams();
  const { authUser } = useAuth();
  const [allCommentinTitle, setAllCommentinTitle] = useState([]);
  {
    /* // Ld */
  }
  // const [loading, setLoading] = useState(false);
  {
    /* // Ld */
  }
  {
    /* ///////////// */
  }
  useEffect(() => {
    // setLoading(true);
    axios
      .get(`/title/alldata/${titleId}`)
      .then((res) => {
        const data = res.data;
        if (data) {
          setAllDataTitleId(data);
          setLikes(data.titleLikes || []);
          setDislikes(data.titleDisLikes || []);
          setTotalLike(data.totalLike || 0);
          setTotalDisLike(data.totalDislike || 0);
          setWebname(data.user?.nameWebsite || "");
          setImageUserCreate(data.user?.profileWebsite || "");
          setTitleMessage(data.titleMessage);
          setStoryTest(data.poststory);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
    // .finally(() => {
    //   setLoading(false);
    // });
    // Ld
  }, []);

  // console.log(allDataTitleId);

  useEffect(() => {
    axios.get(`/comment/allcommentintitle/${titleId}`).then((res) => {
      setAllCommentinTitle(res.data);
    });
  }, [titleId]);

  /* ///////////// */

  const createCommentInTitleId = async (data) => {
    try {
      const res = await axios.post(`/comment/${titleId}`, data);
      const newCommentData = res.data.comment;

      setAllCommentinTitle([...allCommentinTitle, newCommentData]);
    } catch (error) {
      console.log(error);
    }
  };

  // ลองใหม่
  const updateComment = async (data, commentId) => {
    try {
      const res = await axios.patch(
        `/comment/edit/${titleId}/${commentId}`,
        data
      );
      const updatedComment = res.data.updatedComment;
      setAllCommentinTitle((prevComments) =>
        prevComments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  /* ///////////// */

  const updatedTitle = async (data) => {
    try {
      const res = await axios.patch(
        `/title/editalltitle/${allDataTitleId.id}`,
        data
      );

      const newData = res.data.editTitle;
      setAllDataTitleId(newData);
      setTitleMessage(newData.titleMessage);
      setStoryTest(newData.poststory);
    } catch (error) {
      console.log(error);
    }
  };

  const liked = likes.find((el) => el.userId === authUser.id); // มี { userId:}
  const disliked = dislikes.find((el) => el.userId === authUser.id);

  const handleClickLike = async () => {
    try {
      await axios.post(`/title/${titleId}/like`);
      setLikes((prevLikes) => {
        const updatedLikes = liked
          ? prevLikes.filter((el) => el.userId !== authUser.id)
          : [...prevLikes, { userId: authUser.id }];
        setTotalLike(liked ? totalLike - 1 : totalLike + 1);
        return updatedLikes;
      });
      if (disliked) {
        setDislikes((prevDislikes) => {
          setTotalDisLike(totalDislike - 1);
          return prevDislikes.filter((el) => el.userId !== authUser.id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDisLike = async () => {
    try {
      await axios.post(`/title/${titleId}/dislike`);
      setDislikes((prevDislikes) => {
        const updatedDislikes = disliked
          ? prevDislikes.filter((el) => el.userId !== authUser.id)
          : [...prevDislikes, { userId: authUser.id }];
        setTotalDisLike(disliked ? totalDislike - 1 : totalDislike + 1);
        return updatedDislikes;
      });
      if (liked) {
        setLikes((prevLikes) => {
          setTotalLike(totalLike - 1);
          return prevLikes.filter((el) => el.userId !== authUser.id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  {
    /* ///////////// */
  }

  if (error) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <div>
          <h1 className="text-white text-[11rem] animate-pulse">
            404 TITLE NOT FOUND
          </h1>
        </div>
      </div>
    );
  }

  if (!allCommentinTitle) {
    return <LoadingWeb />;
  }

  return (
    <>
      {/* // Ld */}
      {/* {loading && <LoadingWeb />} */}
      {/* // Ld */}
      <CreateCommentButton createCommentInTitleId={createCommentInTitleId} />
      <div className="h-[100vh] overflow-y-auto text-white px-[40rem]">
        <div className="border-white border-2 mt-4 mb-4 rounded-md px-4">
          {authUser.id === allDataTitleId.userId && (
            <>
              <DeleteTitleInBoardTitleId
                setAllDataTitleId={setAllDataTitleId}
                allDataTitleId={allDataTitleId}
                titleId={titleId}
                setError={setError}
              />
            </>
          )}

          <div className="flex flex-col gap-4 pt-2">
            <DataIdTitle
              titleMessage={titleMessage} //titleMessage allDataTitleId.titleMessage
              userId={allDataTitleId.userId}
              imageUserCreate={imageUserCreate}
              name={webname}
              time={allDataTitleId?.createdAt}
              titleImage={allDataTitleId.titleImage}
              storyImages={allDataTitleId.poststoryImage}
              textStory={storyText} //storyText         allDataTitleId.poststory
            />
            <div
              className={`text-2xl pb-2 flex ${
                authUser.id !== allDataTitleId.userId ? "" : "justify-evenly "
              }`}
            >
              <LikeAndDislikeInTitleId
                handleClickLike={handleClickLike}
                handleClickDisLike={handleClickDisLike}
                liked={liked}
                disliked={disliked}
                totalLike={totalLike}
                totalDislike={totalDislike}
              />

              {/* ///////////// */}

              {authUser.id === allDataTitleId.userId && (
                <>
                  <EditAllDataTitleButton
                    titletext={allDataTitleId.titleMessage}
                    storytext={allDataTitleId.poststory}
                    titleImage={allDataTitleId.titleImage}
                    storyImage={allDataTitleId.poststoryImage}
                    updatedTitle={updatedTitle}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <CommentinTitle
          allCommentinTitle={allCommentinTitle}
          setAllCommentinTitle={setAllCommentinTitle}
          updateComment={updateComment}
        />
      </div>
    </>
  );
}
