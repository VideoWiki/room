import React from "react";
import { styles } from "../styles.scss";

function ExternalPresentation(props) {
    const {sidebarContentPanel}=props;

    return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Iconly/Bulk/2 User">
            <g id="2 User">
                <path className={styles.externalpresentation} fill={(sidebarContentPanel === "externalpresentation") ? "#7816F7" : "#9EA5AF"} id="Fill 1" d="M9.34933 14.8577C5.38553 14.8577 2 15.47 2 17.9174C2 20.3666 5.364 21 9.34933 21C13.3131 21 16.6987 20.3877 16.6987 17.9404C16.6987 15.4911 13.3347 14.8577 9.34933 14.8577" />
                <path className={styles.externalpresentation} fill={(sidebarContentPanel === "externalpresentation") ? "#7816F7" : "#9EA5AF"} id="Fill 3" d="M9.34935 12.5248C12.049 12.5248 14.2124 10.4062 14.2124 7.76241C14.2124 5.11865 12.049 3 9.34935 3C6.65072 3 4.48633 5.11865 4.48633 7.76241C4.48633 10.4062 6.65072 12.5248 9.34935 12.5248" />
                <path className={styles.externalpresentation} fill={(sidebarContentPanel === "externalpresentation") ? "#7816F7" : "#9EA5AF"} id="Fill 5" d="M16.1735 7.84875C16.1735 9.19506 15.7606 10.4513 15.0365 11.4948C14.9612 11.6021 15.0277 11.7468 15.1588 11.7698C15.3408 11.7995 15.5277 11.8177 15.7185 11.8216C17.6168 11.8704 19.3203 10.6736 19.791 8.87118C20.4886 6.19675 18.4416 3.79543 15.834 3.79543C15.5512 3.79543 15.2802 3.82417 15.016 3.87688C14.9798 3.88454 14.9406 3.90179 14.9211 3.93245C14.8956 3.97174 14.9142 4.02253 14.9397 4.05606C15.7234 5.13216 16.1735 6.44206 16.1735 7.84875" />
                <path className={styles.externalpresentation} fill={(sidebarContentPanel === "externalpresentation") ? "#7816F7" : "#9EA5AF"} id="Fill 7" d="M21.7792 15.1694C21.4318 14.444 20.5933 13.9467 19.3174 13.7023C18.7156 13.5586 17.0854 13.3545 15.5698 13.3832C15.5473 13.3861 15.5346 13.4014 15.5326 13.411C15.5297 13.4263 15.5365 13.4493 15.5659 13.4656C16.2665 13.8048 18.9739 15.2805 18.6334 18.3928C18.6187 18.5289 18.7293 18.6439 18.8673 18.6247C19.5336 18.5318 21.2479 18.1705 21.7792 17.0475C22.0737 16.4534 22.0737 15.7635 21.7792 15.1694" />
            </g>
        </g>
    </svg>);
}
export default ExternalPresentation;