import { Link, useLocation } from "react-router-dom";

export default function PageHeader() {
  const locataion = useLocation();
  const pathClass = `"text-white" : "border-solid border-2 border-white rounded-lg"`;
  const hoverClass = "hover:underline";
  const style = "px-5 rounded-lg p-2";
  return (
    <>
      <div>
        <ul className="flex gap-8 text-lg text-white">
          <Link to={"/"}>
            <li
              className={`${hoverClass} ${style}  ${
                locataion.pathname !== "/" ? "" : pathClass
              }`}
            >
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li
              className={`${hoverClass} ${style} ${
                locataion.pathname !== "/about" ? "" : pathClass
              }`}
            >
              About
            </li>
          </Link>
          <Link to={"/boardtitle"}>
            <li
              className={`${hoverClass} ${style} ${
                locataion.pathname !== "/boardtitle" ? "" : pathClass
              }`}
            >
              BoardCastRoom
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}
