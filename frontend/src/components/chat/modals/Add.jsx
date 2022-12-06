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
import { chSelectors, actions as chActions } from '../../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../../slices/modalsSlice.js';

const socket = io();

const Add = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalsActions.closeModal());
  const [addFailed, setAddFailed] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelsNames = useSelector(chSelectors.selectAll).map((ch) => ch.name);
  const lastId = _.last(useSelector(chSelectors.selectIds));
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.string().required(),
    }),
    onSubmit: (values) => {
      if (_.includes(channelsNames, values.body)) {
        setAddFailed(true);
      } else {
        socket.emit('newChannel', { name: values.body });
        dispatch(chActions.setNewId({ id: lastId + 1 }));
        handleClose();
      }
    },
  });

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
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
              isInvalid={addFailed}
              {...formik.getFieldProps('body')}
            />
            <Form.Control.Feedback type="invalid">Должно быть уникальным</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary me-2" onClick={handleClose}>
                Отменить
              </Button>
              <Button type="submit" variant="primary">
                Добавить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
