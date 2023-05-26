import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedTime, defineMessages, injectIntl } from 'react-intl';
import _ from 'lodash';
import UserAvatar from '/imports/ui/newui_components/user-avatar/component';
import cx from 'classnames';
import ChatLogger from '/imports/ui/newui_components/chat/chat-logger/ChatLogger';
import MessageChatItem from './message-chat-item/component';
import PollService from '/imports/ui/components/poll/service';
import Icon from '/imports/ui/newui_components/icon/component';
import { styles } from './styles';
import Auth from '/imports/ui/services/auth';

const CHAT_CONFIG = Meteor.settings.public.chat;
const CHAT_CLEAR_MESSAGE = CHAT_CONFIG.system_messages_keys.chat_clear;
const CHAT_POLL_RESULTS_MESSAGE = CHAT_CONFIG.system_messages_keys.chat_poll_result;
const CHAT_PUBLIC_ID = CHAT_CONFIG.public_id;
const CHAT_EMPHASIZE_TEXT = CHAT_CONFIG.moderatorChatEmphasized;

const propTypes = {
  user: PropTypes.shape({
    color: PropTypes.string,
    isModerator: PropTypes.bool,
    isOnline: PropTypes.bool,
    name: PropTypes.string,
  }),
  messages: PropTypes.arrayOf(Object).isRequired,
  timestamp: PropTypes.number,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  scrollArea: PropTypes.instanceOf(Element),
  chatAreaId: PropTypes.string.isRequired,
  handleReadMessage: PropTypes.func.isRequired,
  lastReadMessageTime: PropTypes.number,
};

const defaultProps = {
  user: null,
  scrollArea: null,
  lastReadMessageTime: 0,
  timestamp: 0,
};

const intlMessages = defineMessages({
  offline: {
    id: 'app.chat.offline',
    description: 'Offline',
  },
  pollResult: {
    id: 'app.chat.pollResult',
    description: 'used in place of user name who published poll to chat',
  },
  [CHAT_CLEAR_MESSAGE]: {
    id: 'app.chat.clearPublicChatMessage',
    description: 'message of when clear the public chat',
  }
});

class TimeWindowChatItem extends PureComponent {
  componentDidUpdate(prevProps, prevState) {
    ChatLogger.debug('TimeWindowChatItem::componentDidUpdate::props', { ...this.props }, { ...prevProps });
    ChatLogger.debug('TimeWindowChatItem::componentDidUpdate::state', { ...this.state }, { ...prevState });
  }

  componentWillMount() {
    ChatLogger.debug('TimeWindowChatItem::componentWillMount::props', { ...this.props });
    ChatLogger.debug('TimeWindowChatItem::componentWillMount::state', { ...this.state });
  }

  componentWillUnmount() {
    ChatLogger.debug('TimeWindowChatItem::componentWillUnmount::props', { ...this.props });
    ChatLogger.debug('TimeWindowChatItem::componentWillUnmount::state', { ...this.state });
  }

  renderSystemMessage() {
    const {
      messages,
      chatAreaId,
      handleReadMessage,
      messageKey,
      intl,
    } = this.props;
    if (messages && messages[0].id.includes(CHAT_POLL_RESULTS_MESSAGE)) {
      return this.renderPollItem();
    }

    return (
      <div>

      </div>
      // <div className={styles.systemitem} key={`time-window-chat-item-${messageKey}`}>
      //   <div className={styles.messages}>
      //     {messages.map(message => (
      //       message.text !== ''
      //         ? (
      //           <MessageChatItem
      //             className={(message.id ? styles.systemMessage : styles.systemMessageNoBorder)}
      //             key={message.id ? message.id : _.uniqueId('id-')}
      //             text={intlMessages[message.text] ? intl.formatMessage(intlMessages[message.text]) : message.text}
      //             time={message.time}
      //             isSystemMessage={message.id ? true : false}
      //             systemMessageType={message.text === CHAT_CLEAR_MESSAGE ? 'chatClearMessageText' : 'chatWelcomeMessageText'}
      //             chatAreaId={chatAreaId}
      //             handleReadMessage={handleReadMessage}
      //           />
      //         ) : null
      //     ))}
      //   </div>
      // </div>
    );
  }

  renderMessageItem() {
    const {
      timestamp,
      chatAreaId,
      scrollArea,
      intl,
      messages,
      messageKey,
      dispatch,
      chatId,
      read,
      name,
      color,
      isModerator,
      avatar,
      user,
      isOnline,
    } = this.props;

    const dateTime = new Date(timestamp);
    const isMe = user.userId === Auth.userID;
    const regEx = /<a[^>]+>/i;
    ChatLogger.debug('TimeWindowChatItem::renderMessageItem', this.props);
    const defaultAvatarString = name?.toLowerCase().slice(0, 2) || "  ";
    const emphasizedTextClass = isModerator && CHAT_EMPHASIZE_TEXT && chatId === CHAT_PUBLIC_ID ?
      styles.emphasizedMessage : null;
    return (
      <div className={styles.item} key={`time-window-${messageKey}`}>
        <div className={styles.wrapper}>
          {!isMe && <div className={styles.avatarWrapper}>
            <UserAvatar
              className={styles.avatar}
              color={color}
              moderator={isModerator}
              avatar={avatar}
            >
              {defaultAvatarString}
            </UserAvatar>
          </div>}
          <div className={styles.content}>
            {!isMe && <div className={styles.meta}>
              <div className={styles.name}>
                <span>{name}&nbsp;</span>
                {isOnline
                  ? null
                  : (
                    <span className={styles.offline}>
                      {`(${intl.formatMessage(intlMessages.offline)})`}
                    </span>
                  )}
              </div>
            </div>}
            <div >
              <div>
                <div className={styles.messages}>
                  {messages.map(message => (<div className={isMe && styles.RightAlign}>
                    <MessageChatItem
                      className={regEx.test(message.text) ?
                        cx(styles.hyperlink, emphasizedTextClass) :
                        cx(styles.message, isMe ? styles.message2 : styles.message1, emphasizedTextClass)}
                      key={message.id}
                      text={message.text}
                      time={message.time}
                      chatAreaId={chatAreaId}
                      dispatch={dispatch}
                      read={message.read}
                      chatUserMessageItem={true}
                      handleReadMessage={(timestamp) => {
                        if (!read) {
                          dispatch({
                            type: 'last_read_message_timestamp_changed',
                            value: {
                              chatId,
                              timestamp,
                            },
                          });
                        }
                      }}
                      scrollArea={scrollArea}
                    /></div>
                  ))}
                </div>
                <div className={isMe && styles.timeAlign}>
                  <time className={styles.time} dateTime={dateTime}>
                    <FormattedTime value={dateTime} />
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  showBar() {
    const {
      extra
    } = this.props;
    const keys = [{ option: "A", color: "#7966FA", bgColor: "#7966fa1a" }, { option: "B", color: "#44CC88", bgColor: "#44cc881a" }, { option: "C", color: "#7966FA", bgColor: "#7966fa1a" }, { option: "D", color: "#44CC88", bgColor: "#44cc881a" }, { option: "", color: "", bgColor: "" }]
    const numResponders = extra.pollResultData.numResponders;
    let maxKey = 0;
    let max = 0;
    extra.pollResultData.answers.map((obj)=>{
      if(obj.numVotes > max){
        max = obj.numVotes;
        maxKey = obj.key;
      }
    })
    return (
      extra.pollResultData.answers.map((obj) => {

        const pct = Math.round(obj.numVotes / numResponders * 100);
        const pctFotmatted = `${Number.isNaN(pct) ? 0 : pct}%`;

        const calculatedWidth = {
          width: pctFotmatted,
          backgroundColor: (obj.key === maxKey ? "#44CC881A" : "#7966fa1a")
        };
        const boxStyle = {
          border: `1px solid ${(obj.key === maxKey ? '#44CC88' : '#7966FA')}`
        };
        const backgroundStyle = {
          backgroundColor: (obj.key === maxKey ? "#44CC88" : "#7966FA")
        }
        const textStyle = {
          color: (obj.key === maxKey ? "#44CC88" : "#7966FA")
        }
        return (
          <div className={styles.pollBar} style={boxStyle} key={_.uniqueId('stats-')}>
          <div className={styles.pollLayer} style={calculatedWidth}></div>
          <div className={styles.pollContent}>
            <div className={styles.pollInline}>
              <div style={backgroundStyle} className={styles.barOption}>
                {keys[obj.id].option}
              </div>
              <span style={textStyle}>
                {
                  obj.key
                }
              </span>
            </div>
            <span style={textStyle}>{pctFotmatted}</span>
          </div>
        </div>
          // <div className={styles.pollBar1}
          // >
          //   <div className={styles.pollLayer} style={calculatedWidth}></div>
          //   <div className={styles.pollContent1}>
          //     <span>
          //       {obj.key}
          //     </span>
          //     <span>{pctFotmatted}</span>
          //   </div>
          // </div>
        );
      })
    )
  }

  renderPollItem() {
    const {
      timestamp,
      color,
      intl,
      getPollResultString,
      messages,
      extra,
      scrollArea,
      chatAreaId,
      lastReadMessageTime,
      handleReadMessage,
    } = this.props;

    const dateTime = new Date(timestamp);

    return messages ? (
      <div className={styles.pollResultWrapper}>
        <div className={styles.pollResult}>
          <h3>{extra.pollResultData.questionText}</h3>
          {
            this.showBar()
          }
        </div>
      </div>
      // <div className={styles.item} key={_.uniqueId('message-poll-item-')}>
      //   <div className={styles.wrapper} ref={(ref) => { this.item = ref; }}>
      //     <div className={styles.avatarWrapper}>
      //       <UserAvatar
      //         className={styles.avatar}
      //         color={PollService.POLL_AVATAR_COLOR}
      //         moderator={true}
      //       >
      //         {<Icon className={styles.isPoll} iconName="polling" />}
      //       </UserAvatar>
      //     </div>
      //     <div className={styles.content}>
      //       <div className={styles.meta}>
      //         <div className={styles.name}>
      //           <span>{intl.formatMessage(intlMessages.pollResult)}</span>
      //         </div>
      //         <time className={styles.time} dateTime={dateTime}>
      //           <FormattedTime value={dateTime} />
      //         </time>
      //       </div>
      //       <MessageChatItem
      //         type="poll"
      //         className={cx(styles.message, styles.pollWrapper)}
      //         key={messages[0].id}
      //         text={getPollResultString(extra.pollResultData, intl)}
      //         time={messages[0].time}
      //         chatAreaId={chatAreaId}
      //         lastReadMessageTime={lastReadMessageTime}
      //         handleReadMessage={handleReadMessage}
      //         scrollArea={scrollArea}
      //         color={color}
      //       />
      //     </div>
      //   </div>
      // </div>
    ) : null;
  }

  render() {
    const {
      systemMessage,
    } = this.props;
    ChatLogger.debug('TimeWindowChatItem::render', { ...this.props });
    if (systemMessage) {
      return this.renderSystemMessage();
    }

    return (
      <div className={styles.item}>
        {this.renderMessageItem()}
      </div>
    );
  }
}

TimeWindowChatItem.propTypes = propTypes;
TimeWindowChatItem.defaultProps = defaultProps;

export default injectIntl(TimeWindowChatItem);