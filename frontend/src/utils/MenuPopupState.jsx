import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import { useTranslation } from "react-i18next";

export default function MenuPopupState(props) {
  const { t } = useTranslation();
  return (
    <PopupState
      variant="popover"
      popupId="demo-popup-menu"
      style={{ background: "var(--bodyColor)" }}
    >
      {(popupState) => (
        <React.Fragment>
          <Button
            variant="contained"
            style={{ background: "var(--gradientColor)" }}
            {...bindTrigger(popupState)}
          >
            {props.thumbnail}
          </Button>
          <Menu {...bindMenu(popupState)} sx={{ padding: '0px !important' }}>
            <MenuItem onClick={popupState.close}>{t("language")}</MenuItem>
            {props.data?.map((data, i) => (
              <MenuItem
                onClick={() => {
                  popupState.close();
                  props.updateState({
                    type: "SET_CURRENT_LANGUAGE",
                    payload: data.code,
                  });

                  window.location.reload(true);
                }}
                disabled={data.code === props.currentLanguageCode}
                key={i}
              >
                {props.icons ? (
                  <span
                    className={`fi fi-${data.country_code}`}
                    style={{
                      margin: "0px 5px",
                      opacity:
                        data.code === props.currentLanguageCode ? 0.5 : 1,
                    }}
                  ></span>
                ) : (
                  ""
                )}
                {data.name}
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
