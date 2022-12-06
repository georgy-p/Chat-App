import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import MessageForm from './MessageForm.jsx';
import { chSelectors } from '../../slices/channelsSlice.js';
import { msgSelectors } from '../../slices/messagesSlice.js';

const renderMessage = (message) => (
  <div key={message.id} className="text-break mb-2">
    <b>{message.username}</b>
    {': '}
    {message.body}
  </div>
);

const ChatWindow = () => {
  const { currChannel, channelMessages } = useSelector((state) => {
    const { currentChannelId } = state.channels;
    const channel = chSelectors.selectById(state, currentChannelId);
    const allMessages = msgSelectors.selectAll(state);
    const messages = allMessages.filter((msg) => msg.channelId === currentChannelId);
    if (!messages) {
      return null;
    }
    return { currChannel: channel, channelMessages: messages };
  });

  const lastMessage = useRef(null);
  const scrollToBottom = () => {
    lastMessage.current.scrollIntoView();
  };
  useEffect(scrollToBottom);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="mb-0">
          <b>
            <span># </span>
            {currChannel && currChannel.name}
          </b>
        </p>
        <span className="text-muted">
          {channelMessages.length}
          {' '}
          сообщений
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {channelMessages.map((message) => renderMessage(message))}
        <div ref={lastMessage} />
      </div>
      {currChannel && <MessageForm channelId={currChannel.id} />}
    </div>
  );
};

export default ChatWindow;
