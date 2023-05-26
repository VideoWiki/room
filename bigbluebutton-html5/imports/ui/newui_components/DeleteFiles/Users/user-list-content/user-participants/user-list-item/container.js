import React, { useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import BreakoutService from '/imports/ui/components/breakout-room/service';
import Meetings from '/imports/api/meetings';
import Auth from '/imports/ui/services/auth';
import MyUserListItem from './component';
import UserListService from '../../../service';
import LayoutContext from '../../../../../../components/layout/context';

const MyUserListItemContainer = (props) => {
  const layoutContext = useContext(LayoutContext);
  const { layoutContextDispatch } = layoutContext;
  return <MyUserListItem {...{ layoutContextDispatch, ...props }} />;
};
const isMe = (intId) => intId === Auth.userID;

export default withTracker(({ user }) => {
  const findUserInBreakout = BreakoutService.getBreakoutUserIsIn(user.userId);
  const breakoutSequence = (findUserInBreakout || {}).sequence;
  const Meeting = Meetings.findOne({ meetingId: Auth.meetingID },
    { fields: { lockSettingsProps: 1 } });

  return {
    user,
    isMe,
    userInBreakout: !!findUserInBreakout,
    breakoutSequence,
    lockSettingsProps: Meeting && Meeting.lockSettingsProps,
    isMeteorConnected: Meteor.status().connected,
    isThisMeetingLocked: UserListService.isMeetingLocked(Auth.meetingID),
    voiceUser: UserListService.curatedVoiceUser(user.userId),
    toggleVoice: UserListService.toggleVoice,
    removeUser: UserListService.removeUser,
    toggleUserLock: UserListService.toggleUserLock,
    changeRole: UserListService.changeRole,
    ejectUserCameras: UserListService.ejectUserCameras,
    assignPresenter: UserListService.assignPresenter,
    getAvailableActions: UserListService.getAvailableActions,
    normalizeEmojiName: UserListService.normalizeEmojiName,
    getGroupChatPrivate: UserListService.getGroupChatPrivate,
    getEmojiList: UserListService.getEmojiList(),
    getEmoji: UserListService.getEmoji(),
    usersProp: UserListService.getUsersProp(),
    hasPrivateChatBetweenUsers: UserListService.hasPrivateChatBetweenUsers,
  };
})(MyUserListItemContainer);