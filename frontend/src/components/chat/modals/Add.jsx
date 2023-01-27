/* eslint-disable react/jsx-props-no-spreading */
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import _ from 'lodash';
import { io } from 'socket.io-client';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { chSelectors, actions as chActions } from '../../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../../slices/modalsSlice.js';

const socket = io();

const Add = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalsActions.closeModal());
  const [addFailed, setAddFailed] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelsNames = useSelector(chSelectors.selectAll).map((ch) => ch.name);

  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    validationSchema: Yup.object({
      channel: Yup
        .string().trim().min(3, t('errors.min3')).max(20, t('errors.min3'))
        .required(t('errors.required')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const newChannel = values.channel.trim();
      if (_.includes(channelsNames, newChannel)) {
        setAddFailed(true);
      } else {
        socket.emit('newChannel', { name: newChannel }, ({ data }) => {
          dispatch(chActions.setNewId({ id: data.id }));
        });
        handleClose();
        toast.success(t('alerts.created'));
      }
    },
  });

  const isFillChannelError = formik.touched.channel && formik.errors.channel;
  const notUniqError = t('modals.errors.notUniq');

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.header')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="channel"
              type="text"
              className="mb-2"
              isInvalid={isFillChannelError || addFailed}
              ref={inputRef}
              {...formik.getFieldProps('channel')}
            />
            {isFillChannelError || addFailed ? (
              <Form.Control.Feedback type="invalid">
                {
                isFillChannelError ? formik.errors.channel : notUniqError
              }
              </Form.Control.Feedback>
            ) : null}
            <div className="d-flex justify-content-end">
              <Button variant="secondary me-2" onClick={handleClose}>
                {t('buttons.cancel')}
              </Button>
              <Button type="submit" variant="primary">
                {t('buttons.add')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
