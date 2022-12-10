import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { actions as modalsActions } from '../../../slices/modalsSlice';
import { actions as chActions } from '../../../slices/channelsSlice';

const socket = io();

const Remove = () => {
  const { t } = useTranslation();
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
        <Modal.Title>{t('modals.remove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.remove.text')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary me-2" onClick={handleClose}>
            {t('buttons.cancel')}
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            {t('buttons.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
