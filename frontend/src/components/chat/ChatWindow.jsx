import { useSelector } from 'react-redux';
import MessageForm from './MessageForm.jsx';

const renderMessage = (message) => (
  <div key={message.id} className="text-break mb-2">
    <b>{message.username}</b>
    {': '}
    {message.body}
  </div>
);

// const testMessage = {
//  body: 'Hi',
//  channelId: 1,
//  username: 'george',
//  id: 6,
// };

const ChatWindow = () => {
  const currChannel = useSelector((state) => {
    const { channels } = state.chatReducer.channelsInfo;
    const currChId = state.chatReducer.channelsInfo.currentChannelId;
    const channel = channels.find(({ id }) => id === currChId);
    return channel;
  });
  const channelMessages = useSelector((state) => {
    const { messages } = state.chatReducer.messagesInfo;
    return messages.filter((message) => message.channelId === currChannel.id);
  });

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
      </div>
      <MessageForm />
    </div>
  );
};

export default ChatWindow;
