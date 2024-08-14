import { TypeAnimation } from "react-type-animation";
import Footer from "../component/Footer";

function Home() {
  return (
    <div>
      <div className="text-white flex flex-col items-center justify-center h-[65vh]">
        <TypeAnimation
          className="font-medium text-slate-300"
          style={{
            whiteSpace: "pre-line",
            fontSize: "8em",
            display: "block",
          }}
          sequence={[
            `WELCOME TO THE WEBSITE
            ${"\u00A0".repeat(3)}Q & A EXCHANGE IDEA`,
            1000,
            "",
          ]}
          repeat={Infinity}
          wrapper="h1"
          speed={-30}
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default Home;

//fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
// ${"\u00A0".repeat(3)}
