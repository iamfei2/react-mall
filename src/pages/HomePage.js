import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const goToMall = () => {
    navigate("/mall/mallHome");
  };


  return (
    <div>
      <h1>HomePage</h1>
      <Button type="primary" onClick={goToMall}>go to the mall</Button>
    </div>
  );
};

export default HomePage;
