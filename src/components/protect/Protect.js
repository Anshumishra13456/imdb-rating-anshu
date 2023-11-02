import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protect = (props) => {
  //Initialize navigate hook
  const navigate = useNavigate();

  //Extract the component props from passed props
  const { Component } = props;

  //perform an action to check if local storage contain email id
  useEffect(() => {
    //check if there is email data available in local storage
    const data = localStorage.getItem("email");

    //if the data is not available , navigate to register route
    if (!data) {
      navigate("/register");
    }
  })

  //render the protect component passed it as prop
  return(
    <Component />
  )
};

export default Protect;
