import React from "react";
import { styles } from "./styles.scss";

function Waitinguser(props) {
    const {sidebarContentPanel}=props;
    
    return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1543_336)">
    <path d="M21.379 16.913C19.867 15.635 19 13.767 19 11.788V9C19 5.481 16.386 2.568 13 2.08V1C13 0.447 12.552 0 12 0C11.448 0 11 0.447 11 1V2.08C7.613 2.568 5 5.481 5 9V11.788C5 13.767 4.133 15.635 2.612 16.921C2.223 17.254 2 17.738 2 18.25C2 19.215 2.785 20 3.75 20H20.25C21.215 20 22 19.215 22 18.25C22 17.738 21.777 17.254 21.379 16.913Z" className={(sidebarContentPanel === "waitingusers") ? styles.iconDark : styles.iconNormal}/>
    <path d="M12 24C13.811 24 15.326 22.709 15.674 21H8.32599C8.67399 22.709 10.189 24 12 24Z" className={(sidebarContentPanel === "waitingusers") ? styles.iconDark : styles.iconNormal}/>
    </g>
    <defs>
    <clipPath id="clip0_1543_336">
    <rect width="24" height="24" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    )
}
export default Waitinguser;