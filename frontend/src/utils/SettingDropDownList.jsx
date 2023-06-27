import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import { ThemeContext } from "../contexts/ThemeContext";
import { useLanguageContext } from "../contexts/LanguageContext";
import MenuPopupState from "./MenuPopupState";
import { AiOutlineGlobal } from "react-icons/ai";
import { BsSun, BsMoonStars } from "react-icons/bs";

const SettingDropDown = (props) => {
  const { thumbnail } = props;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentLanguageCode, languages,updateState } = useLanguageContext();
  // dark light mode

  const buttons = [
    <MenuPopupState
      thumbnail={<AiOutlineGlobal className="icon" />}
      icons={true}
      currentLanguageCode={currentLanguageCode}
      data={languages}
      updateState={updateState}
    />,
    <button onClick={toggleTheme} className="btn" name="mode">
      {theme === "light" ? (
        <BsSun className="icon" />
      ) : (
        <BsMoonStars className="icon" />
      )}
    </button>,
  ];

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            variant="contained"
            style={{ background: "var(--gradientColor)" }}
            {...bindTrigger(popupState)}
          >
            {thumbnail}
          </Button>
          <Menu {...bindMenu(popupState)} style={{ padding: "0px !important" }}>
            {buttons?.map((data, i) => (
              <MenuItem
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  background: "var(--bodyColor)",
                }}
              >
                {data}
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export default SettingDropDown;
