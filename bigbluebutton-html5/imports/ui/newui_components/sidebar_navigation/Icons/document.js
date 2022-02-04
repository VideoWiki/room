import React from "react";
import { styles } from "../styles.scss";

function Document(props) {
    const {sidebarContentPanel}=props;

    return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Iconly/Bulk/Document">
            <g id="Document">
                <path id="Path" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z" fill={(sidebarContentPanel === "document") ? "#7816F7" : "#9EA5AF"} className={styles.document} />
                <path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd" d="M8.07996 6.64999V6.65999C7.64896 6.65999 7.29996 7.00999 7.29996 7.43999C7.29996 7.86999 7.64896 8.21999 8.07996 8.21999H11.069C11.5 8.21999 11.85 7.86999 11.85 7.42899C11.85 6.99999 11.5 6.64999 11.069 6.64999H8.07996ZM15.92 12.74H8.07996C7.64896 12.74 7.29996 12.39 7.29996 11.96C7.29996 11.53 7.64896 11.179 8.07996 11.179H15.92C16.35 11.179 16.7 11.53 16.7 11.96C16.7 12.39 16.35 12.74 15.92 12.74ZM15.92 17.31H8.07996C7.77996 17.35 7.48996 17.2 7.32996 16.95C7.16996 16.69 7.16996 16.36 7.32996 16.11C7.48996 15.85 7.77996 15.71 8.07996 15.74H15.92C16.319 15.78 16.62 16.12 16.62 16.53C16.62 16.929 16.319 17.27 15.92 17.31Z" fill="white" />
            </g>
        </g>
    </svg>)
}
export default Document;