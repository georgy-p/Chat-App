import { useEffect } from 'react';
import {
  Col, Container, Row, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ChatWindow from './chat/ChatWindow.jsx';
import { fetchChatData } from '../slices/chatInfoSlice.js';
import Channel from './chat/Channel.jsx';

const socket = io();

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatData());
    console.log('Data has been fetched');
  }, [dispatch]);

  useEffect(() => {
    console.log(socket.connected);
  }, []);

  const channels = useSelector((state) => state.chatReducer.channelsInfo.channels);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-light flex-md-row">
        <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <Button variant="group-vertical" className="p-0">
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
    </Container>
  );
};

export default ChatPage;
