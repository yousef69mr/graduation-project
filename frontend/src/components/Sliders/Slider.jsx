import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
// import { useNavigate } from "react-router-dom";
import SliderController from "./SliderController";
import "./Slider.css";
import { Pagination, Navigation } from "swiper/modules";
// import "swiper/swiper.min.css";
// import "swiper/modules/navigation/navigation.min.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import "swiper/swiper-bundle.min.css";
import { Box, Typography } from "@mui/material";

const Slider = (props) => {
  const { breakpoints, control, data, ...rest } = props;
  // console.log(rest);
  const { t } = useTranslation();
  //   const navigate = useNavigate();
  return (
    <Box className="s-container">
      {data?.length > 0 ? (
        <Swiper
          breakpoints={
            breakpoints
              ? breakpoints
              : {
                  856: { slidesPerView: 3 },
                  640: { slidesPerView: 2 },
                  0: { slidesPerView: 1 },
                }
          }
          modules={[Pagination, Navigation]}
          className="mySwiper"
          {...rest}
        >
          {data?.map((instance) => (
            <SwiperSlide key={instance?.id} style={{ background: "none" }}>
              <SliderController control={control} object={instance} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="text-color"
        >
          <Typography>{t("NoItemsFound")}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Slider;
