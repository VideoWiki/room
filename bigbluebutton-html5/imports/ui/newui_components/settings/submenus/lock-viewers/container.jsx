import React, { useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/modal/service';
import Meetings from '/imports/api/meetings';
import Auth from '/imports/ui/services/auth';
import LockViewersComponent from './component';
import { updateLockSettings, updateWebcamsOnlyForModerator } from './service';
import { UsersContext } from '/imports/ui/components/components-data/users-context/context';

const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;

const LockViewersContainer = (props) => {
  const usingUsersContext = useContext(UsersContext);
  const { users } = usingUsersContext;
  const currentUser = users[Auth.meetingID][Auth.userID];
  const amIModerator = currentUser.role === ROLE_MODERATOR;

  return amIModerator && <LockViewersComponent {...props} />
}

export default withTracker(() => {
  // closeModal: () => mountModal(null),
  return {
    meeting: Meetings.findOne({ meetingId: Auth.meetingID }),
    updateLockSettings,
    updateWebcamsOnlyForModerator,
    showToggleLabel: false,
  }
})(LockViewersContainer);
