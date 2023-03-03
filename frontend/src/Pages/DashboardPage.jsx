import React, { useEffect } from "react";
// import { useState } from "react";

const DashboardPage = (props) => {
  const activeUser = props.activeUser;
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
