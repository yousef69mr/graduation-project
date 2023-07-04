import React from "react";
import css from "./Map.module.css";
import Tooltip from "@mui/material/Tooltip";
import { useThemeContext } from "../../contexts/ThemeContext";
import { backendBaseURL } from "../../axios";
import { useGovernorateContext } from "../../contexts/GovernorateContext";

const Card = (props) => {
  const { governorate } = props;
  // console.log(backendBaseURL.concat(governorate?.governorate?.emblem));
  return (
    <div className={css.card}>
      <img
        src={backendBaseURL.concat(governorate?.governorate?.emblem)}
        alt={governorate?.governorate?.name}
      />
      <h1>{governorate?.title}</h1>
      {/* <p>{governorate.description}</p> */}
    </div>
  );
};

const Map = (props) => {
  const { governorates } = useGovernorateContext();
  const { ThemeHandler } = useThemeContext();
  // console.log(governorates[0]?.governorate);

  return (
    <map
      id={css.country_map}
      style={{ maxHeight: props.sectionHeight, height: `${props.map_size}px` }}
    >
      {governorates?.length > 0 && (
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
                  ThemeHandler(
                    "CHANGE_COLOR_THEME",
                    instance.governorate?.theme
                  )
                }
              >
                {/* {console.log(instance.governorate?.theme)} */}
              </path>
            </Tooltip>
          ))}
        </svg>
      )}
    </map>
  );
};

export default Map;
