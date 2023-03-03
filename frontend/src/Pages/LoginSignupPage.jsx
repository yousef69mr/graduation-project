import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import video2 from "../assets/video/ThisisEgypt.mp4";
import LoginSignupSlider from "../components/LoginSignupSlider/LoginSignupSlider";

const LoginSignupPage = (props) => {
  const { activeUser } = props;
  // console.log(typeof setIsPotentialLogin);
  // let navigate = useNavigate();
  // useEffect(() => {
  //   if (activeUser != null) {
  //     // console.log("hi");
  //     return navigate("/");
  //   }
  // }, [activeUser]);

  return (
    <section
      style={{
        // minHeight: `${window.innerHeight - 76}px`,
        padding: "5% 0",
      }}
    >
      <LoginSignupSlider />

      {/* <div style={{ position: "absolute" }}>
        <video src={video2} muted loop={true} autoPlay type="video/mp4"></video>
      </div> */}
    </section>
  );
};

export default LoginSignupPage;
