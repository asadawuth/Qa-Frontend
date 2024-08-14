import defaultpost from "../assets/defaultpost.jpg";

export default function TitleImage({ src }) {
  return (
    <>
      <div className="pr-8">
        <img
          src={src || defaultpost}
          className="h-28 w-48 hover:cursor-pointer rounded-2xl" //rounded-2xl
        />
      </div>
    </>
  );
}
