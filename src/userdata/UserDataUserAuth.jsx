import Avatar from "../avatar/Avatar";
import { useAuth } from "../hook/use-auth";
import { useRef, useState, useEffect } from "react";
import LoadingWeb from "../component/LoadingWeb";
import ButtonDefaultProfile from "./ButtonDefaultProfile";
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import Model from "../component/Model";
import UpdateDataForm from "./UpdateDataForm";
import { Link } from "react-router-dom";

export default function UserDataUserAuth() {
  const [openModel, setOpenModel] = useState(false);
  const { userId } = useParams();
  const [notfound, setNotfound] = useState(true);
  const [userProFile, setUseProfile] = useState({});
  const [okCancel, setOkCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const { updataProfile, authUser } = useAuth();
  const inputEl = useRef(null);
  const styleButton =
    "bg-slate-200 hover:bg-slate-300 rounded-lg px-3 p-1 hover:text-white";

  useEffect(() => {
    if (authUser.id === +userId) {
      setUseProfile(authUser); //ถ้าเท่ากันให้เซ็ทข้อมูลที่เปลี่ยนใหม่อีกครั้ง
    }
    const fetchData = async () => {
      try {
        setNotfound(true);
        const response = await axios.get(`/user/${userId}`);
        setUseProfile(response.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setNotfound(!notfound);
      }
    };

    fetchData();
  }, [userId, authUser]);

  const uploadImage = async (input) => {
    try {
      const formData = new FormData();
      formData.append("profile", input);
      setLoading(true);
      //console.log(inputEl.current.value);
      await updataProfile(formData);
      // รีเซ็ตสถานะเมื่ออัพโหลดสำเร็จ
      setOkCancel(false);
      setFile(null);
      inputEl.current.value = "";
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(userProFile);

  return (
    <div className="w-full flex flex-col justify-center items-center pt-2 gap-8">
      {loading && <LoadingWeb />}
      {Object.keys(userProFile).length > 0 ? (
        <>
          <div>
            <Avatar
              src={
                file ? URL.createObjectURL(file) : userProFile.profileWebsite
              }
              className="w-[20vh] h-[20vh]"
            />
          </div>
          <div className="flex flex-col gap-1">
            {inputEl && (
              <input
                type="file"
                ref={inputEl}
                className="hidden"
                //onChange={(e) => console.log(e.target)} //รูปเดิม log ไม่ออก มันเหมือนว่าไม่เกินการเปลี่ยนแปลง ไม่เห็นค่าวิธีแก้console.dir(e.target)
                //multiple //ไว้ใส่หลายรูป
                onChange={(e) => {
                  //console.dir(e.target)
                  console.log(e.target.files);
                  if (e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            )}
            {file && (
              <div className="flex justify-center gap-4">
                <div className={`flex gap-3  ${okCancel ? "hidden" : ""}`}>
                  <button
                    className={`${styleButton} px-4`}
                    onClick={() => {
                      uploadImage(file);
                      setOkCancel(true);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className={`${styleButton}`}
                    onClick={() => {
                      inputEl.current.value = "";
                      setFile(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {authUser.id === userProFile.id && (
              <>
                <button
                  className={styleButton}
                  onClick={() => {
                    inputEl.current.click();
                  }}
                >
                  EditProfile
                </button>

                <ButtonDefaultProfile />
              </>
            )}
          </div>
          <div className="text-white text-4xl">{userProFile.nameWebsite}</div>
          {/* <UserDataBasic />  */}
          <div className="text-white flex flex-col items-center gap-3 w-full">
            <div className="flex flex-col gap-2 text-lg text-center">
              <div>Firstname : {userProFile.firstName}</div>
              <div>Lastname : {userProFile.lastName}</div>
              <div>Nickname : {userProFile.nickName}</div>
              <div>Tel : {userProFile.tel}</div>
              <div>Age : {userProFile.age}</div>
              <div>Sex : {userProFile.sex}</div>
              <div>Nationality : {userProFile.nationality}</div>
              <div>Address : {userProFile.address}</div>
              <div>Map : {userProFile.pinMapGps}</div>
            </div>
            {userProFile.id === authUser.id && (
              <>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-8 pb-8">
                    <div className="">
                      <button
                        className={`${styleButton} text-black pl-4`}
                        onClick={() => setOpenModel(true)}
                      >
                        UpdatauserData
                      </button>
                    </div>
                    <div className="">
                      <Link to={`/userdata/history/${userId}`}>
                        <button className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium bg-indigo-900 mt-3 px-8 py-2 rounded-lg tracking-wide text-white">
                          History
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            <Model
              title="ChangeYourData"
              open={openModel}
              onClose={() => setOpenModel(false)}
            >
              <UpdateDataForm
                onSuccess={() => setOpenModel(false)}
                userId={userId}
              />
            </Model>
          </div>
        </>
      ) : (
        <h1
          className={`text-white pt-56 text-9xl animate-pulse ${
            notfound ? "hidden" : ""
          }`}
        >
          404 USER NOT FOUND
        </h1>
      )}
    </div>
  );
}

// useEffect(() => {
//   axios
//     .get(`/user/${userId}`)
//     .then((res) => {
//       setUseProfile(res.data.user);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, [userId]); // React hook useEffect has missing depandency : updataProfile มันสื่อว่า
// userId อาศัยปัจจัยภายนอก มารัน ถ้า / เลขไอดีเปลี่ยนไป มันควรจะรันอีกรอบเพื่อทำการอัพเดท อีกรอบนึง
// text-black hover:text-white
