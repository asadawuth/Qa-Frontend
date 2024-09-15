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

/////////////////////

function BoardTitle() {
  const { authUser } = useAuth();
  const [allTitle, setAllTitle] = useState([]); // DataTitle
  const [currentPage, setCurrentPage] = useState(1); // ณ จังหวะแรก 1
  const [totalPages, setTotalPages] = useState(0); // ณ จังหวะแรก 0

  useEffect(() => {
    axios
      .get(`/title/titles?_page=${currentPage}`) // ณ จังหวะแรก 1
      .then((res) => {
        setAllTitle(res.data.titleInPage); // DataTitle
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }; // onClick จับค่า เลข

  ///////////////////// About Title

  // useEffect(() => {
  //   axios
  //     .get("/title/alltitle")
  //     .then((res) => {
  //       setAllTitle(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // console.log(allTitle);

  const createTitle = async (data) => {
    const res = await axios.post("/title", data);
    const newTitle = res.data.title;
    if (currentPage === 1) {
      setAllTitle([newTitle, ...allTitle]);
    }
    const response = await axios.get(`/title/titles?_page=${currentPage}`);
    setAllTitle(response.data.titleInPage); // Set Data ใหม่
    setTotalPages(response.data.totalPages); // Set จำนวณหน้าใหม่
  };

  /////////////////////

  return (
    <>
      <div className="flex flex-col pt-10">
        <div className="h-[70vh]">
          <div className="text-white px-40 grid grid-cols-2 gap-4">
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
                        currentPage={currentPage}
                        setTotalPages={setTotalPages}
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

        {/* Pagination Controls */}
        <div className="flex flex-col gap-12">
          <div className="flex justify-center gap-4 text-white">
            {/* //totalPages ที่จังหวะแรกเป็น 0 */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index} // 0 1 2 3 4 5 =>
                onClick={() => handlePageChange(index + 1)}
                className={`${
                  currentPage === index + 1 ? "bg-blue-500" : "bg-gray-300" // Ex click ตัวที่ 2 index 0 1 +1 = 2  setCurrentPage currentPage 1+1
                } p-2 rounded`} //  currentPage 1  === 0 + 1
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {/* Pagination Controls */}

          <CreateTitleButton createTitle={createTitle} />
        </div>
      </div>
    </>
  );
}
export default BoardTitle;
