import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faList,
  faCloudSunRain,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
export default function SideBar({ className, darkmode, setDarkmode }) {
  const iconClasses = "flex flex-col cursor-pointer my-5 text-white";
  const titleClasses = "text-gray-400 text-sm";
  return (
    <div className={className}>
      <div className={iconClasses}>
        <FontAwesomeIcon icon={faList} className="text-2xl" />
      </div>
      <div className={iconClasses}>
        <FontAwesomeIcon icon={faCloudSunRain} className="text-2xl" />
        <p className={titleClasses}>Weather</p>
      </div>
      <div className={iconClasses}>
        <FontAwesomeIcon icon={faGear} size={"lg"} className="text-2xl" />
        <p className={titleClasses}>Setting</p>
      </div>
      <div className={iconClasses} onClick={()=>{setDarkmode(!darkmode)}} >
        <FontAwesomeIcon
          icon={!darkmode ? faToggleOff : faToggleOn}
          className="text-2xl"
        />
      </div>
    </div>
  );
}
