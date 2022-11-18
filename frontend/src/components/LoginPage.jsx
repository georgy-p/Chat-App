/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Button, Container, Row, Col, Card, FloatingLabel, Form,
} from 'react-bootstrap';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col md="5" lg="5" xl="4" xxl="4">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Form className="justify-content-center col-12  mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <FloatingLabel label="Ваш ник" className="mb-3">
                  <Form.Control
                    name="username"
                    placeholder="Ваш ник"
                    type="text"
                    ref={inputRef}
                    isInvalid={authFailed}
                    {...formik.getFieldProps('username')}
                  />
                </FloatingLabel>
                <FloatingLabel label="Пароль" className="mb-4">
                  <Form.Control
                    name="password"
                    placeholder="Пароль"
                    type="password"
                    isInvalid={authFailed}
                    {...formik.getFieldProps('password')}
                  />
                  <Form.Control.Feedback type="invalid">Неправильный ник или пароль</Form.Control.Feedback>
                </FloatingLabel>
                <Button type="submit" className="w-100 mb-3 btn-primary">Войти</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
