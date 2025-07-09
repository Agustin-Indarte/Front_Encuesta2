import { FaQuestion } from 'react-icons/fa';
import { MdTextFields, MdPermMedia,MdDelete } from "react-icons/md";
import './SideBar.css';

const Sidebar = ({ onSelectType, activeType,onDeleteCard }) => {
  return (
    <div className="SideBar-Container d-flex flex-column justify-content-between align-items-stretch">
      <button
        className={`btn-SideBar w-100 d-flex align-items-center justify-content-center rounded-top ${activeType === "text" ? "active-btnSideBar" : ""}`}
        onClick={() => onSelectType("text")}
      >
        <MdTextFields className="icon-SideBar" />
      </button>

      <button
        className={`btn-SideBar w-100 d-flex align-items-center justify-content-center ${activeType === "question" ? "active-btnSideBar" : ""}`}
        onClick={() => onSelectType("question")}
      >
        <FaQuestion className="icon-SideBar" />
      </button>

      <button
        className={`btn-SideBar w-100 d-flex align-items-center justify-content-center ${activeType === "multimedia" ? "active-btnSideBar" : ""}`}
        onClick={() => onSelectType("multimedia")}
      >
        <MdPermMedia className="icon-SideBar" />
      </button>

      <button
        className={`btn-SideBarDelete w-100 d-flex align-items-center justify-content-center rounded-bottom`}
        onClick={onDeleteCard}
      >
        <MdDelete className="icon-SideBar" />
      </button>
    </div>
  );
};

export default Sidebar;