import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
// import { useNavigate } from "react-router-dom";'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SliderController from "./SliderController";

import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import css from "./Slider.module.css";

// import "swiper/swiper-bundle.min.css";
// import { Box, Typography } from "@mui/material";

const Slider = (props) => {
  const { breakpoints, control, data, ...rest } = props;
  // console.log(rest);
  const { t } = useTranslation();
  const sliderData =
    control === "landmark"
      ? data.sort((a, b) => a?.num_of_views - b?.num_of_views)
      : data;
  //   const navigate = useNavigate();
  return (
    <Box className={css.s_container}>
      {sliderData?.length > 0 ? (
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
          className={css.mySwiper}
          {...rest}
        >
          {sliderData?.map((instance) => (
            <SwiperSlide
              key={instance?.id}
              style={{
                background: "none",
                display: "flex",
                borderRadius: "var(--borderRadius, 20px)",
                height: "100%",
                padding: "1rem",
                margin: "1rem .5rem",
                width:'25%',
                overflow: "hidden",
                position: "relative",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <SliderController control={control} object={instance} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Box
          className={`text-color flex`}
          sx={{
            justifyContent: "center",
          }}
        >
          <Typography>{t("NoItemsFound")}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Slider;
