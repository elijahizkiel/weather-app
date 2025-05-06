import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faList,
  faCloudSunRain,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

function SideBar({ className, darkmode, setDarkmode, iconClasses, titleClasses }) {
  return (
    <div className={className}>
      <button className={iconClasses}>
        <FontAwesomeIcon icon={faList} />
      </button>
      <button title={"Weather Tab"} className={iconClasses}>
        <FontAwesomeIcon icon={faCloudSunRain} />
        <p className={titleClasses}>Weather</p>
      </button>
      <button title={"Setting"} className={iconClasses}>
        <FontAwesomeIcon icon={faGear} size={"lg"} />
        <p className={titleClasses}>Setting</p>
      </button>
      <button title={"Toggle Dark-mode"} className={iconClasses} onClick={()=>{setDarkmode(!darkmode)}} >
        <FontAwesomeIcon
          icon={!darkmode ? faToggleOff : faToggleOn}
        />
      </button>
    </div>
  );
}

export default memo(SideBar);