/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Button, Form, InputGroup,
} from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';

const getFormattedMsg = (message, channelId) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const { username } = userId;
  return { body: message, channelId, username };
};

const socket = io();

const MessageForm = ({ channelId }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: yup.object({
      message: yup.string().required().min(1),
    }),
    onSubmit: (values) => {
      const newMessage = getFormattedMsg(values.message, channelId);
      socket.emit('newMessage', newMessage);
      formik.resetForm();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup hasValidation>
          <Form.Control
            name="body"
            aria-label={t('chat.label')}
            placeholder={t('chat.enterMessage')}
            className="border-0 p-0 ps-2"
            ref={inputRef}
            {...formik.getFieldProps('message')}
          />
          <Button type="submit" variant="group-vertical" disabled={!socket.connected}>
            <ion-icon name="send" />
          </Button>
        </InputGroup>

      </Form>
    </div>
  );
};

export default MessageForm;
