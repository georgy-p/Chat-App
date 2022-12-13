/* eslint-disable react/jsx-props-no-spreading */
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from 'lodash';
import { io } from 'socket.io-client';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { chSelectors } from '../../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../../slices/modalsSlice.js';

const socket = io();

const Add = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalsActions.closeModal());
  const channelId = useSelector((state) => state.modals.channelId);
  const channel = useSelector((state) => chSelectors.selectById(state, channelId));
  const [renameFailed, setRenameFailed] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelsNames = useSelector(chSelectors.selectAll).map((ch) => ch.name);
  const formik = useFormik({
    initialValues: {
      body: channel.name,
    },
    validationSchema: yup.object({
      body: yup.string().required(),
    }),
    onSubmit: (values) => {
      const newName = values.body.trim();

      if (_.includes(channelsNames, newName)) {
        setRenameFailed(true);
      } else {
        socket.emit('renameChannel', { id: channelId, name: newName });
        handleClose();
        toast.success(t('alerts.rename'));
      }
    },
  });

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.header')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              name="body"
              type="text"
              className="mb-2"
              isInvalid={renameFailed}
              {...formik.getFieldProps('body')}
            />
            <Form.Control.Feedback type="invalid">{t('modals.errors.notUniq')}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary me-2" onClick={handleClose}>
                {t('buttons.cancel')}
              </Button>
              <Button type="submit" variant="primary">
                {t('buttons.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
