import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
// import { useState } from "react";

const DashboardPage = (props) => {
  const {activeUser} = useContext(AuthContext);
  return (
    <React.Fragment>
      <div>dashboard</div>
      <div>
        {activeUser ? "Hi" + activeUser.username : "you are not logged in"}
      </div>
    </React.Fragment>
  );
};

export default DashboardPage;
