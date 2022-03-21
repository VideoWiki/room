import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ActionsBarService from '/imports/ui/components/actions-bar/service';
import UserListService from '/imports/ui/components/user-list/service';
import CreateBreakoutRoomModal from './component';
import { meetingIsBreakout } from '/imports/ui/components/app/service';

import CreateBreakoutRoom from '/imports/ui/newui_components/Options/BreakoutRoom/CreateBreakout';

import BreakoutRoom_flow from '../../Options/BreakoutRoom/BreakoutRoom_flow';

const CreateBreakoutRoomContainer = (props) => {
  const {
    meetingIsBreakout,
    hasBreakoutRoom,
    isBreakoutEnabled,
    getUsersNotAssigned,
    amIModerator,
    users    
  } = props;
  // const canCreateBreakout = amIModerator
  //   && !meetingIsBreakout
  //   && !hasBreakoutRoom
  //   && isBreakoutEnabled;

  const canInviteUsers = amIModerator
    && !meetingIsBreakout
    && hasBreakoutRoom
    && getUsersNotAssigned(users).length;

  return (
      <BreakoutRoom_flow {...props} isInvitation={canInviteUsers}/>
  );
};

export default withTracker(() => ({
  createBreakoutRoom: ActionsBarService.createBreakoutRoom,
  getBreakouts: ActionsBarService.getBreakouts,
  getUsersNotAssigned: ActionsBarService.getUsersNotAssigned,
  sendInvitation: ActionsBarService.sendInvitation,
  breakoutJoinedUsers: ActionsBarService.breakoutJoinedUsers(),
  meetingName: ActionsBarService.meetingName(),
  amIModerator: ActionsBarService.amIModerator(),
  getUsersNotAssigned: ActionsBarService.getUsersNotAssigned,
  hasBreakoutRoom: UserListService.hasBreakoutRoom(),
  isBreakoutEnabled: ActionsBarService.isBreakoutEnabled(),
  isBreakoutRecordable: ActionsBarService.isBreakoutRecordable(),
  users: ActionsBarService.users(),
  meetingIsBreakout: meetingIsBreakout(),
  isMeteorConnected: Meteor.status().connected,
  users: ActionsBarService.users(),
  isMe: ActionsBarService.isMe
}))(CreateBreakoutRoomContainer);