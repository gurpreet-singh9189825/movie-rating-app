import { FC } from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer: FC = () => {
  return (
    <footer>
      <Link to={"/"} className="c-name">
        Movie-rating-corp
      </Link>
    </footer>
  );
};

export default Footer;
