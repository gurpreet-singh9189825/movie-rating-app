import { FC } from "react";
import "./homeScreen.css";

const HomeScreen: FC = () => {
  return (
    <div className="screen-container">
      <div className="box">
        <h2 className="intro">
          Click on tabs or search for your favourite movie
        </h2>
      </div>
    </div>
  );
};

export default HomeScreen;
