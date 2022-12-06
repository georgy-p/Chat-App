import { useEffect } from 'react';
import {
  Col, Container, Row, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ChatWindow from './chat/ChatWindow.jsx';
import { chSelectors, fetchChatData, actions as chActions } from '../slices/channelsSlice.js';
import { actions as msgActions } from '../slices/messagesSlice.js';
import { actions as modalActions } from '../slices/modalsSlice.js';
import Channel from './chat/Channel.jsx';
import getModal from './chat/modals/index.js';

const socket = io();

const renderModal = (type) => {
  if (type === null) {
    return null;
  }

  const Modal = getModal(type);
  return <Modal />;
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const addModal = () => dispatch(modalActions.openModal({ type: 'adding', channelId: null }));
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  useEffect(() => {
    dispatch(fetchChatData());
  }, [dispatch]);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(msgActions.addMessage(payload));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      dispatch(chActions.addChannel(payload));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('renameChannel', (payload) => {
      const chId = payload.id;
      const newName = payload.name;
      dispatch(chActions.renameChannel({ id: chId, changes: { name: newName } }));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('removeChannel', (payload) => {
      dispatch(chActions.removeChannel(payload.id));
      if (payload.id === currentChannelId) {
        dispatch(chActions.setNewId({ id: 1 }));
      }
    });
  }, [currentChannelId, dispatch]);

  const channels = useSelector(chSelectors.selectAll);
  const modalType = useSelector((state) => state.modals.type);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-light flex-md-row">
        <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <Button variant="group-vertical" className="p-0" onClick={addModal}>
              <ion-icon name="add" size="small" />
            </Button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {channels.map((channel) => (
              <Channel
                key={channel.id}
                channel={channel}
              />
            ))}
          </ul>
        </Col>
        <Col className="p-0 h-100">
          <ChatWindow />
        </Col>
      </Row>
      {renderModal(modalType)}
    </Container>
  );
};

export default ChatPage;
