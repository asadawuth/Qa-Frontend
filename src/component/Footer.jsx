import {
  FaFacebookSquare,
  FaYoutube,
  FaTiktok,
  FaLine,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="flex text-white justify-around cursor-pointer">
      <div className="flex flex-col gap-3 p-5">
        <div className="text-5xl">Design</div>
        <div className="text-2xl">Tao Asadawuth</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <FaLine className="h-6" />
          Q&A
        </div>
        <div className="flex gap-3">
          <FaFacebookSquare className="h-6" />
          Questions and Answers
        </div>
        <div className="flex gap-3">
          <FaInstagram className="h-6" />
          Questions and Answers
        </div>
        <div className="flex gap-3">
          <FaTwitter className="h-6" />
          Questions and Answers
        </div>
        <div className="flex gap-3">
          <FaTiktok className="h-6" />
          Q&A Official
        </div>
        <div className="flex gap-3">
          <FaYoutube className="h-6" />
          Q&A Chanel
        </div>
      </div>
      <div className="p-5">
        <div>Address</div>
        <div>Sukhunvit 85 58/10 BKK</div>
        <div>Bangka pakhonong 10260</div>
      </div>
      <div className="p-5">
        <div>Skill in project</div>
        <div>Html Css tailwind Boostarp React javascritp</div>
        <div>Nodejs Mysql express api Postman </div>
        <div>SupportIdea W3S Document Node.js React library Chatgpt</div>
      </div>
    </div>
  );
}
export default Footer;

//line
//Fookbook
//Instagram
//Tiktok
//Twitter
//Youtube
