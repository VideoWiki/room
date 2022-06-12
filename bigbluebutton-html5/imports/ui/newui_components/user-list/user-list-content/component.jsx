import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { styles } from './styles';
import UserParticipantsContainer from './user-participants/container';
import UserMessages from './user-messages/container';
import UserNotesContainer from './user-notes/container';
import UserCaptionsContainer from './user-captions/container';
import WaitingUsers from './waiting-users/component';
import UserPolls from './user-polls/component';
import BreakoutRoomItem from './breakout-room/component';

const propTypes = {
  compact: PropTypes.bool,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({}).isRequired,
  isPublicChat: PropTypes.func.isRequired,
  setEmojiStatus: PropTypes.func.isRequired,
  clearAllEmojiStatus: PropTypes.func.isRequired,
  roving: PropTypes.func.isRequired,
  pollIsOpen: PropTypes.bool.isRequired,
  forcePollOpen: PropTypes.bool.isRequired,
  requestUserInformation: PropTypes.func.isRequired,
};

const defaultProps = {
  compact: false,
};
const CHAT_ENABLED = Meteor.settings.public.chat.enabled;
const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;

class UserContent extends PureComponent {
  render() {
    const {
      compact,
      intl,
      currentUser,
      setEmojiStatus,
      clearAllEmojiStatus,
      roving,
      isPublicChat,
      pollIsOpen,
      forcePollOpen,
      hasBreakoutRoom,
      pendingUsers,
      requestUserInformation,
      currentClosedChats,
      sidebarContentPanel,
      layoutContextDispatch,
      startedChats,
    } = this.props;

    return (
      <div
        data-test="userListContent"
        className={styles.content}
      >
        {/* {currentUser.role === ROLE_MODERATOR
          ? (
            <UserCaptionsContainer
              {...{
                intl,
              }}
            />
          ) : null}

        {pendingUsers.length > 0 && currentUser.role === ROLE_MODERATOR
          ? (
            <WaitingUsers
              {...{
                intl,
                pendingUsers,
                sidebarContentPanel,
                layoutContextDispatch,
              }}
            />
          ) : null} */}


        <UserParticipantsContainer
          {...{
            compact,
            intl,
            currentUser,
            setEmojiStatus,
            clearAllEmojiStatus,
            roving,
            requestUserInformation,
          }}
        />
      <div className={styles.mbSep}>
          {CHAT_ENABLED
              ? (
                  <UserMessages
                      {...{
                        isPublicChat,
                        compact,
                        intl,
                        roving,
                        currentClosedChats,
                        startedChats,
                      }}
                  />
              ) : null}
      </div>
      </div>
    );
  }
}

UserContent.propTypes = propTypes;
UserContent.defaultProps = defaultProps;

export default UserContent;
