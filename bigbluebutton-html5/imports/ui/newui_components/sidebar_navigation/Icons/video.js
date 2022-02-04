import React from "react";
import { styles } from "../styles.scss";

function Video(props) {
    const {sidebarContentPanel}=props;
    
    return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Iconly/Bulk/Video">
            <g id="Video">
                <path className={styles.video} fill={(sidebarContentPanel === "video") ? "#7816F7" : "#9EA5AF"} id="Fill 1" d="M21.3309 7.44254C20.9119 7.17858 20.3969 7.15523 19.9579 7.37858L18.4759 8.1268C17.9279 8.40294 17.5879 8.96132 17.5879 9.58264V15.4161C17.5879 16.0375 17.9279 16.5948 18.4759 16.873L19.9569 17.6202C20.1579 17.7238 20.3729 17.7735 20.5879 17.7735C20.8459 17.7735 21.1019 17.7004 21.3309 17.5573C21.7499 17.2943 21.9999 16.8385 21.9999 16.339V8.66183C21.9999 8.16233 21.7499 7.7065 21.3309 7.44254Z" />
                <path className={styles.video} fill={(sidebarContentPanel === "video") ? "#7816F7" : "#9EA5AF"} id="Fill 3" d="M11.9051 20H6.11304C3.69102 20 2 18.3299 2 15.9391V9.06091C2 6.66904 3.69102 5 6.11304 5H11.9051C14.3271 5 16.0181 6.66904 16.0181 9.06091V15.9391C16.0181 18.3299 14.3271 20 11.9051 20Z" />
            </g>
        </g>
    </svg>)
}
export default Video;