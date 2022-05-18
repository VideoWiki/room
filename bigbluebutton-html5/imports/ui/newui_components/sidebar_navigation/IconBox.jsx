import React, { useEffect, useState } from "react";
import Poll from "./Icons/poll";
import BreakoutRoom from "./Icons/breakout_room";
import Document from "./Icons/document";
import Settings from "./Icons/settings";
import User from "./Icons/user";
import Video from "./Icons/video";
import Chat from "./Icons/chat";
import { withTracker } from 'meteor/react-meteor-data';
import { ACTIONS } from "../../components/layout/enums";
import { styles } from "./styles";
import ExternalPresentation from "./Icons/external_presentation";

import UserListService from '/imports/ui/newui_components/Options/Users/service';
import GuestUsers from '/imports/api/guest-users/';
import Auth from '/imports/ui/services/auth';
// import WaitingUserService from '/imports/ui/components/waiting-users/service';

function IconBox(props) {

    const { sidebarContent, icon, contextDispatch } = props;
    const { sidebarContentPanel } = sidebarContent;
    // const users = UserListService.getUsers();
    // const [userCount, setUserCount] = useState(UserListService.getUsers().length);
    // let userCount = UserListService.getUsers().length;
    // useEffect(()=>{
    //     setUserCount(UserListService.getUsers().length);
    //     console.log("updateUser", UserListService.getUsers().length)
    // },[UserListService.getUsers])

    function updateSelectedFeature() {
        if (sidebarContentPanel === icon) {
            contextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
                value: "none"
            });
            contextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
                value: false
            });
        }
        else {
            contextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
                value: icon
            });
            contextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
                value: true
            });
        };
    }

    return (<div className={`${styles.IconBox} ${sidebarContentPanel === icon ? styles.IconFill : styles.IconUnfill}`}
        onClick={() => updateSelectedFeature()}
    >
        <div className={sidebarContentPanel === icon ? styles.selectedBox : styles.IconShadow} >
            {icon === "chat" &&
                <div className={styles.sidebarIcon}>
                    <Chat sidebarContentPanel={sidebarContentPanel} />
                    <div className={styles.sideTooltipWrapper}>
                        <div className={styles.sidebarTipArrow}></div>
                        <div className={styles.sidebarTooltip}><span>Chats</span></div>
                    </div>
                </div>
            }
            {icon === "user" &&
                <div className={styles.sidebarIcon}> <User
                    sidebarContentPanel={sidebarContentPanel}
                />
                    <div className={styles.sidebarBadge}>
                        <div className={styles.userIconBadge}>
                            <span>{props.users.length}</span>
                        </div>
                    </div>
                    <div className={styles.sideTooltipWrapper}>
                        <div className={styles.sidebarTipArrow}></div>
                        <div className={styles.sidebarTooltip}><span>Users</span></div>
                    </div>
                </div>}
            {icon === "document" &&
                <div className={styles.sidebarIcon}>
                    <Document
                        sidebarContentPanel={sidebarContentPanel}
                    />
                    <div className={styles.sideTooltipWrapper}>
                        <div className={styles.sidebarTipArrow}></div>
                        <div className={styles.sidebarTooltip}><span>Notes</span></div>
                    </div>
                </div>}
            {icon === "breakoutroom" &&
                <div className={styles.sidebarIcon}>
                    <BreakoutRoom
                        sidebarContentPanel={sidebarContentPanel}
                    />
                    <div className={styles.sideTooltipWrapper}>
                        <div className={styles.sidebarTipArrow}></div>
                        <div className={styles.sidebarTooltip}><span>Breakoutroom</span></div>
                    </div>
                </div>}
            {icon === "poll" &&
                <div className={styles.sidebarIcon}>
                    <Poll
                        sidebarContentPanel={sidebarContentPanel}
                    />
                    <div className={styles.sideTooltipWrapper}>
                        <div className={styles.sidebarTipArrow}></div>
                        <div className={styles.sidebarTooltip}><span>Poll</span></div>
                    </div>
                </div>}
            {icon === "video" &&
                <div className={styles.sidebarIcon}>
                    <Video
                        sidebarContentPanel={sidebarContentPanel}
                    />
                    <div className={styles.sideTooltipWrapper}>
                        <div className={styles.sidebarTipArrow}></div>
                        <div className={styles.sidebarTooltip}><span>Video</span></div>
                    </div>
                </div>}
            {icon === "presentation" &&
                <div className={styles.sidebarIcon}>
                    <ExternalPresentation
                        sidebarContentPanel={sidebarContentPanel}
                    />
                    <div className={styles.sideTooltipWrapper}>
                        <div className={styles.sidebarTipArrow}></div>
                        <div className={styles.sidebarTooltip}><span>Presentation</span></div>
                    </div>
                </div>}
            {icon === "settings" &&
                <div className={styles.sidebarIcon}>
                    <Settings
                        sidebarContentPanel={sidebarContentPanel}
                    />
                    <div className={styles.sideTooltipWrapper}>
                        <div className={styles.sidebarTipArrow}></div>
                        <div className={styles.sidebarTooltip}><span>Settings</span></div>
                    </div>
                </div>}
            {icon === "waitingusers" && (props.authenticatedUsers.length!=0 || props.guestUsers.length) !=0 && 
                <div className={styles.sidebarIcon}>
                    <Settings
                        sidebarContentPanel={sidebarContentPanel}
                    />
                    <div className={styles.sideTooltipWrapper}>
                        <div className={styles.sidebarTipArrow}></div>
                        <div className={styles.sidebarTooltip}><span>Waiting</span></div>
                    </div>
                </div>}

        </div>
    </div>);
}
// export default IconBox;
export default withTracker(() => {

    const guestUsers = GuestUsers.find({
        meetingId: Auth.meetingID,
        guest: true,
        approved: false,
        denied: false,
    }).fetch();

    const authenticatedUsers = GuestUsers.find({
        meetingId: Auth.meetingID,
        authenticated: true,
        guest: false,
        approved: false,
        denied: false,
    }).fetch();

    return ({
        guestUsers,
        authenticatedUsers,
        users: UserListService.getUsers(),
    });
})(IconBox);