import React from "react";
import css from "./Map.module.css";
import Tooltip from "@mui/material/Tooltip";

const Card = (props) => {
  const governorate = props.governorate;
  return (
    <div className={css.card}>
      {/* <img src={governorate.img} alt={governorate.name} /> */}
      <h1>{governorate.name}</h1>
    </div>
  );
};

const Map = (props) => {
  const governorates = props.governorates;
  return (
    <map
      id={css.egypt_map}
      style={{ maxHeight: props.sectionHeight, height: `${props.map_size}` }}
    >
      <svg
        baseProfile="tiny"
        strokeLinecap="round"
        strokeLinejoin="round"
        version="1.2"
        viewBox="0 0 1000 889"
        xmlns="http://www.w3.org/2000/svg"
      >
        {governorates?.map((governorate) => (
          <Tooltip
            key={governorate.id}
            title={<Card governorate={governorate} />}
            placement="top"
            arrow
          >
            <path
              key={governorate.id}
              d={governorate.shape}
              id={governorate.id}
              name={governorate.name}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title={governorate.name}
            ></path>
          </Tooltip>
        ))}
      </svg>
    </map>
  );
};

export default Map;
