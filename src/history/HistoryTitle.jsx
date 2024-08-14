import defaultImage from "../assets/defaultpost.jpg";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
// import { useAuth } from "../hook/use-auth";
import { Link } from "react-router-dom";

export default function HistoryTitle({ allTitles }) {
  // const { authUser } = useAuth();

  //console.log(allTitles.titleDisLikes);
  return (
    <>
      <div className=" text-white p-4 overflow-y-auto">
        <div className="text-4xl text-center pb-4">HistoryTitlePost</div>
        <div className="grid grid-cols-2 gap-4  px-8">
          {allTitles.map((title) => (
            <div
              key={title.id}
              className="border-white border-1 max-w-sm rounded overflow-hidden shadow-lg"
            >
              <div className="flex flex-col p-2">
                <img
                  src={title.titleImage || defaultImage}
                  className="rounded-lg h-[24vh] w-full"
                />
                <Link to={`/boardtitle/commenttitle/${title.id}`}>
                  <div className="pl-4 text-xl hover:text-orange-300 underline">
                    {title.titleMessage}
                  </div>
                </Link>
                <div className="flex justify-between">
                  {/* //////////////////// */}
                  <div>
                    <div className="pl-4">
                      {new Date(title.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex gap-2">
                      <AiFillLike
                      // className={liked ? "text-amber-500" : ""}
                      />
                      <span>{title.totalLike}</span>
                    </div>
                    <div className="flex gap-2">
                      <AiFillDislike
                      // className={disliked ? "text-amber-500" : ""}
                      />
                      <span>{title.totalDislike}</span>
                    </div>
                  </div>
                </div>
                {/* //////////////////// */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
