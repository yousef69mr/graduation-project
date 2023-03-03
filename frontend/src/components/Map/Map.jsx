import React, { useContext } from "react";
import css from "./Map.module.css";
import Tooltip from "@mui/material/Tooltip";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GovernorateContext } from "../../contexts/GovernorateContext";

const Card = (props) => {
  const { governorate } = props;
  // console.log(governorate);
  return (
    <div className={css.card}>
      <img src={governorate.emblem} alt={governorate.name} />
      <h1>{governorate.name}</h1>
      <p>{governorate.description}</p>
    </div>
  );
};

const Map = (props) => {
  const { governorates } = useContext(GovernorateContext);
  const { ThemeHandler } = useContext(ThemeContext);
  // console.log(governorates[0]?.governorate);

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
        {governorates?.map((instance) => (
          <Tooltip
            key={instance?.id}
            title={<Card governorate={instance} />}
            placement="top"
            arrow
          >
            <path
              key={instance.governorate.id}
              d={instance.governorate?.shape}
              id={instance.governorate.id}
              name={instance.name}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title={instance.governorate?.name}
              onMouseOver={(e) =>
                ThemeHandler("CHANGE_COLOR_THEME", instance.governorate?.theme)
              }
            >
              {/* {console.log(instance.governorate?.theme)} */}
            </path>
          </Tooltip>
        ))}
      </svg>
    </map>
  );
};

export default Map;
