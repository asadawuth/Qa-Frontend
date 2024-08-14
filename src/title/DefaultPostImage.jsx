import defaultPostImage from "../assets/Addimages.jpg";

export default function DefaultPostImage({ src, className }) {
  return (
    <img src={src || defaultPostImage} alt="userpost" className={className} />
  );
}
