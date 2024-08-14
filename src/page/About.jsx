import { useState, React } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import q from "../assets/q.png";
import q2 from "../assets/q2.webp";
import q3 from "../assets/q3.png";
import Footer from "../component/Footer";

function About() {
  return (
    <div>
      <div className="text-white h-[65vh]">
        <Carousel>
          <Carousel.Item>
            <img
              className="mx-auto w-75 h-[60vh] opacity-55 rounded-lg"
              src={q}
            />
            <Carousel.Caption>
              <h3 className="text-black text-2xl">
                Our website is a website for posting questions and answers,
                exchanging opinions, and chatting with each other. Users can
                contact to request advertisements at AdminWebsite.
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="mx-auto w-75 h-[60vh] opacity-85 rounded-lg"
              src={q2}
            />
            <Carousel.Caption>
              <h3 className="text-black text-2xl ">
                You can criticize or suggest additional things at the Admin
                website.
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="mx-auto w-75 h-[60vh] opacity-85 rounded-lg"
              src={q3}
            />
            <Carousel.Caption>
              <h3 className="text-black text-2xl ">Idea Tao Asadawuth</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default About;
