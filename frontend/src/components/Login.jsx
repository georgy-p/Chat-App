/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button, Container, Row, Col, Card, FloatingLabel, Form,
} from 'react-bootstrap';

const LoginPage = () => (
  <Container fluid>
    <Row className="justify-content-center align-content-center h-100">
      <Col md="5" lg="5" xl="4" xxl="4">
        <Card className="shadow-sm">
          <Card.Body className="p-5">
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={Yup.object({
                username: Yup.string().required(),
                password: Yup.string().required(),
              })}
              onSubmit={(values) => {
                console.log(JSON.stringify(values, null, 2));
              }}
            >
              {(formik) => (
                <Form className="justify-content-center col-12  mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">Войти</h1>
                  <FloatingLabel label="Ваш ник" className="mb-3">
                    <Form.Control name="username" placeholder="Ваш ник" type="text" {...formik.getFieldProps('username')} />
                  </FloatingLabel>
                  <FloatingLabel label="Пароль" className="mb-4">
                    <Form.Control name="password" placeholder="Пароль" type="password" {...formik.getFieldProps('password')} />
                  </FloatingLabel>
                  <Button type="submit" className="w-100 mb-3 btn-primary">Войти</Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default LoginPage;
