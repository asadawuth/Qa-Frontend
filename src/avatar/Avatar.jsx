import defaultsImage from "../assets/blank.png";

export default function Avatar({ className = "h-14", src }) {
  const defaultClass = "rounded-full aspect-square";
  const classes = defaultClass + " " + className;
  return <img src={src || defaultsImage} alt="user" className={classes} />;
}
