import { useEffect, useState } from "react";
import { useAuth } from "../hook/use-auth";
import { Link } from "react-router-dom";
import axios from "../config/axios";
import CreateTitleButton from "../title/CreateTitleButton";
import LikeDislike from "../title/LikeDislike";
import TitleImage from "../title/TitleImage";
import TitlePost from "../title/TitlePost";
import TimePost from "../title/TimePost";
import formatTimeAgo from "../utils/time-ago";
import EditandDelete from "../title/EditandDelete";
import TotalComment from "../title/TotalComment";

function BoardTitle() {
  const { authUser } = useAuth();
  const [allTitle, setAllTitle] = useState([]);

  useEffect(() => {
    axios
      .get("/title/alltitle")
      .then((res) => {
        setAllTitle(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //console.log(allTitle);

  const createTitle = async (data) => {
    const res = await axios.post("/title", data);
    const newTitle = res.data.title;
    setAllTitle([newTitle, ...allTitle]);
  };

  return (
    <>
      <div className="flex flex-col gap-16">
        <div className="overflow-y-auto h-[75vh]">
          <div className="text-white px-40 grid grid-cols-2 gap-4 overflow-y">
            {allTitle.map((title) => (
              <div
                key={title.id}
                className="flex rounded-2xl p-4 border-white border-2"
              >
                <TitleImage src={title.titleImage} />

                <div className="flex flex-col gap-12 w-full rounded-2xl">
                  <div className="flex justify-between hover:cursor-pointer">
                    <Link to={`commenttitle/${title.id}`}>
                      <TitlePost
                        titlepost={title.titleMessage}
                        className="text-white"
                      />
                    </Link>
                    {authUser.id === title.userId && (
                      <EditandDelete
                        titleId={title.id}
                        setAllTitle={setAllTitle}
                        allTitle={allTitle}
                      />
                    )}
                  </div>

                  <div className="flex flex-col hover:cursor-pointer">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex gap-2">
                          <LikeDislike
                            totalLike={title.totalLike}
                            totalDislike={title.totalDislike}
                            titleLikes={title.titleLikes}
                            titleDisLikes={title.titleDisLikes}
                            titleId={title.id}
                          />

                          <TimePost timePost={formatTimeAgo(title.createdAt)} />
                        </div>
                      </div>
                      <TotalComment titleId={title.id} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <CreateTitleButton createTitle={createTitle} />
      </div>
    </>
  );
}
export default BoardTitle;
