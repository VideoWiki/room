import React, { useEffect, useState } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Meteor } from 'meteor/meteor';
import { styles } from '../styles.scss';
import Clipboard from '../Icons/Clipboard';
import CopiedIcon from '../Icons/CopiedIcon';

const ROLE_VIEWER = Meteor.settings.public.user.role_viewer;

function CopyPopup(props) {

    const [copiedParticipant, setCopiedParticipant] = useState(false)
    const [copiedCohost, setCopiedCohost] = useState(false)

    // const copyParticipantLink = () => {
    //     // let joinUrl = Auth._logoutURL;
    //     // navigator.clipboard.writeText(joinUrl.substring(0, joinUrl.length - 6));
    //     setCopiedParticipant(true)
    //     // const p = document.getElementById("shareUrlIcon");
    //     // p.innerText = intl.formatMessage(intlMessages.copiedLabel);
    // }

    // const copyCohostLink = () => {
    //     // let joinUrl = Auth._logoutURL;
    //     // navigator.clipboard.writeText(joinUrl.substring(0, joinUrl.length - 6));
    //     setCopiedCohost(true)
    //     // const p = document.getElementById("shareUrlIcon");
    //     // p.innerText = intl.formatMessage(intlMessages.copiedLabel);
    // }

    const copyParticipantLink = () => {
        // let joinUrl = Auth._logoutURL;
        const url = Session.get('participantUrl')
        if(url){
            navigator.clipboard.writeText(url);
        }
        setCopiedParticipant(true)
    }

    const copyCohostLink = () => {
        // let joinUrl = Auth._logoutURL;
        const url = Session.get('moderatorUrl')
        if(url){
            navigator.clipboard.writeText(url);
        }
        setCopiedCohost(true)
        // const p = document.getElementById("shareUrlIcon");
        // p.innerText = intl.formatMessage(intlMessages.copiedLabel);
    }

    return (
        <div className={styles.addUserPopup1}>
            <div className={styles.addUserPopupWrapper}>
                <button onClick={copyParticipantLink} >{copiedParticipant ? <><CopiedIcon/>Copied to Clipboard</> : <><Clipboard />Invite Participant</>}</button>
                <button onClick={copyCohostLink} >{copiedCohost ? <><CopiedIcon/>Copied to Clipboard</> : <><Clipboard />Invite Co-Host</>}</button>
            </div>
            <div className={styles.popupArrow}></div>
        </div>
    )
}

export default injectIntl(CopyPopup);