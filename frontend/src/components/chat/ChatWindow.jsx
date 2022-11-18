import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import MessageForm from './MessageForm.jsx';
import { actions as chatActions } from '../../slices/chatInfoSlice';

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

const socket = io();

const ChatWindow = () => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(chatActions.setNewMessage(payload));
    });
  }, [dispatch]);

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
      {currChannel && <MessageForm channelId={currChannel.id} />}
    </div>
  );
};

export default ChatWindow;
