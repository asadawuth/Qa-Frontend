import Avatar from "../avatar/Avatar";
import { Link } from "react-router-dom";

export default function DataIdTitle({
  titleMessage,
  userId,
  imageUserCreate,
  name,
  time,
  titleImage,
  storyImages,
  textStory,
}) {
  return (
    <>
      <div className="text-4xl break-words">{titleMessage}</div>
      <div className="flex gap-4">
        <div>
          <Link to={`/userdata/${userId}`}>
            <Avatar src={imageUserCreate} />
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="text-base">
            <div>{name}</div>
          </div>
          <div>
            <div>{new Date(time).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* /////////////// */}
      <div className={`w-full ${!titleImage ? "hidden" : ""}`}>
        <img
          src={titleImage}
          className={`w-full rounded-2xl ${!titleImage ? "hidden" : ""} `}
        />
      </div>
      {/* /////////////// */}
      <div>
        <hr
          className={`border-white border-3 opacity-80 ${
            !titleImage ? "hidden" : ""
          }`}
        />
      </div>

      <div className="text-3 break-words">{textStory}</div>

      {/* /////////////// */}
      <div
        className={`${!storyImages ? "hidden" : "w-full flex flex-col gap-4 "}`}
      >
        {storyImages ? (
          storyImages
            .split(",")
            .map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                className="w-full rounded-2xl"
                alt={`Poststory Image ${index}`}
              />
            ))
        ) : (
          <img className="hidden" />
        )}
      </div>
      {/* /////////////// */}
      <hr
        className={`border-white border-3 opacity-80 ${
          !storyImages ? "hidden" : "pb-8"
        }`}
      />
    </>
  );
}
