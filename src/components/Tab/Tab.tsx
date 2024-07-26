import { FC } from "react";
import "./tab.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface TabProps {
  id: number;
  name: string;
  onClick: (id: number, name: string) => void;
  loading: boolean;
  highlight: boolean;
}

const Tabs: FC<TabProps> = ({ name, onClick, id, highlight, loading }) => {
  const handleClick = () => {
    onClick(id, name);
  };

  return (
    <>
      {loading ? (
        <Skeleton width={100} className={`tabs`} />
      ) : (
        <div
          className={`tabs tab${id} ${highlight ? "highlight-tab" : ""}`}
          onClick={handleClick}
        >
          {name}
        </div>
      )}
    </>
  );
};

export default Tabs;
