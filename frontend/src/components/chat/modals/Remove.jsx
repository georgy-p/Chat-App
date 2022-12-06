import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { actions as modalsActions } from '../../../slices/modalsSlice';
import { actions as chActions } from '../../../slices/channelsSlice';

const socket = io();

const Remove = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalsActions.closeModal());
  const channelId = useSelector((state) => state.modals.channelId);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const handleRemove = () => {
    socket.emit('removeChannel', { id: channelId });
    if (channelId === currentChannelId) {
      dispatch(chActions.setNewId({ id: 1 }));
    }
    handleClose();
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary me-2" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
