import React from "react";
import {styles} from "../styles.scss";
function Microphone()
{
    return (<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className={styles.microphone} d="M16.5313 7.82568C15.9966 7.82568 15.5626 8.25331 15.5626 8.78233C15.5626 12.3554 12.6186 15.2627 9.00048 15.2627C5.38136 15.2627 2.43743 12.3554 2.43743 8.78233C2.43743 8.25331 2.00345 7.82568 1.46872 7.82568C0.933985 7.82568 0.5 8.25331 0.5 8.78233C0.5 13.0873 3.79945 16.6412 8.03177 17.1186V19.0434C8.03177 19.5714 8.46478 20 9.00048 20C9.53522 20 9.9692 19.5714 9.9692 19.0434V17.1186C14.2006 16.6412 17.5 13.0873 17.5 8.78233C17.5 8.25331 17.066 7.82568 16.5313 7.82568Z" fill="white"/>
    <path className={styles.microphone} d="M8.82462 13.2171H9.17529C11.5777 13.2171 13.5268 11.2932 13.5268 8.92076V4.29727C13.5268 1.92287 11.5777 0 9.17529 0H8.82462C6.4222 0 4.47314 1.92287 4.47314 4.29727V8.92076C4.47314 11.2932 6.4222 13.2171 8.82462 13.2171Z" fill="white"/>
    </svg>
    );
}
export default Microphone;