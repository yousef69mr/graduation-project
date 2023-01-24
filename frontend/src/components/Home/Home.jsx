import React, { useEffect } from "react";
import "./home.css";
import video2 from "../../assets/video/ThisisEgypt.mp4";
import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiFacebook } from "react-icons/fi";
import { FaTripadvisor } from "react-icons/fa";
import { TbApps } from "react-icons/tb";
import { BsListTask } from "react-icons/bs";

import aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="home">
      <div className="overlay"></div>
      <video src={video2} muted loop={true} autoPlay type="video/mp4"></video>

      <div className="homeContent container">
        <div className="textDiv">
          <span data-aos="fade-up" className="smallText">
            Our Packages
          </span>
          <h1 data-aos="fade-up" className="homeTitle">
            Search your Holiday
          </h1>
        </div>

        <div data-aos="fade-up" className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="city">Search your destination</label>
            <div className="input flex">
              <input type="text" placeholder="Enter your City here" />
              <GrLocation className="icon" />
            </div>
          </div>
          <div className="dateInput">
            <label htmlFor="date">Select your Date :</label>
            <div className="input flex">
              <input type="date" />
            </div>
          </div>
          <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="price">Max price : </label>
              <h3 className="total">
                &nbsp;$<em>5000</em>
              </h3>
            </div>
            <div className="input flex">
              <input type="range" max="5000" min="100" />
            </div>
          </div>
          <div className="searchOptions flex">
            <HiFilter className="icon" />
            <span>More Filters</span>
          </div>
        </div>
        <div data-aos="fade-up" className="homeFooterIcons flex">
          <div className="rightIcons">
            <FiFacebook className="icon" />
            <AiOutlineInstagram className="icon" />
            <FaTripadvisor className="icon" />
          </div>
          <div className="leftIcons">
            <BsListTask className="icon" />
            <TbApps className="icon" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
