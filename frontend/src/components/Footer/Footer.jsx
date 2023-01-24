import React, { useEffect } from "react";
import "./footer.css";
import video from "../../assets/video/This_is_Egypt.mp4";
import { FiChevronRight, FiSend } from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";

import aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    aos.init({ duration: 2000 });
  }, []);

  return (
    <footer className="footer">
      <div className="videoDiv">
        <video src={video} loop autoPlay muted type="video/mp4"></video>
      </div>

      <div className="secContent container">
        <div className="contactDiv flex">
          <div data-aos="fade-up" className="text">
            <small>Keep in touch</small>
            <h2>Travel with us</h2>
          </div>

          <div className="inputDiv flex">
            <input
              data-aos="fade-up"
              type="text"
              placeholder="Enter Email Address"
            />
            <button data-aos="fade-up" className="btn flex" type="submit">
              Send <FiSend className="icon" />
            </button>
          </div>
        </div>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <a href="#" className="logo flex">
                <MdOutlineTravelExplore className="icon" />
                Travel
              </a>
            </div>

            <div data-aos="fade-up" className="footerParagraph">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique numquam, voluptates iste possimus nemo nihil soluta
                saepe dolor? Minima voluptatem quae labore cumque, voluptatibus
                praesentium quisquam assumenda optio accusantium et!
              </p>
            </div>

            <div data-aos="fade-up" className="footerSocials">
              <AiOutlineTwitter className="icon" />
              <AiFillYoutube className="icon" />
              <AiFillInstagram className="icon" />
              <FaTripadvisor className="icon" />
            </div>
          </div>

          <div className="footerLinks grid">
            {/* link Group 1 */}
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              className="linkGroup"
            >
              <span className="groupTitle">Our Agency</span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Services
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Insurance
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Agency
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Tourism
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Payment
              </li>
            </div>

            {/* link Group 2  */}
            <div
              data-aos="fade-up"
              data-aos-duration="4000"
              className="linkGroup"
            >
              <span className="groupTitle">Partners</span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Bookings
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                HostelWorld
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Trivago
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Rentcars
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                TripAdvisor
              </li>
            </div>

            {/*  link Group 3  */}
            <div
              data-aos="fade-up"
              data-aos-duration="5000"
              className="linkGroup"
            >
              <span className="groupTitle">Last Minute</span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Sharm ElSheikh
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Luxor
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Cairo
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Fayoum
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Marsa Matrouh
              </li>
            </div>
          </div>

          <div className="footerDiv flex">
            <small>Tourisco</small>
            <small>copyrights reserved - &#169; 2023</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
