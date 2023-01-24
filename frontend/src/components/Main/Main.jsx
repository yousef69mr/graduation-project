import React, { useEffect } from "react";
import "./main.css";

import {
  HiOutlineClipboardCheck,
  HiOutlineLocationMarker,
} from "react-icons/hi";

import aos from "aos";
import "aos/dist/aos.css";

const Main = (props) => {
  const Data = props.landmarks;

  useEffect(() => {
    aos.init({ duration: 1500 });
  }, []);

  return (
    <section className="main section container">
      <div className="secTitle">
        <h3 data-aos="fade-right" className="title">
          Most visited destination
        </h3>
      </div>
      <div className="secContent grid">
        {Data?.map((destination) => {
          return (
            <div
              data-aos="fade-up"
              key={destination.id}
              className="singleDestination"
            >
              <div className="imageDiv">
                <img src={destination.image} alt={destination.title} />
              </div>
              <div className="cardInfo">
                <h4 className="destTitle">{destination.title}</h4>
                <span className="continent flex">
                  <HiOutlineLocationMarker className="icon" />
                  <span className="name">{destination.location}</span>
                </span>
                <div className="fees flex">
                  <div className="grade">
                    <span>
                      {destination.grade}
                      <small>+1</small>
                    </span>
                  </div>
                  <div className="price">
                    <h5>{destination.fees}</h5>
                  </div>
                </div>
                <div className="description">
                  <p>{destination.description}</p>
                </div>
                <button className="btn flex">
                  Details <HiOutlineClipboardCheck className="icon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Main;
