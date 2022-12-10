/* eslint-disable quotes */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Button, Container, Row, Col, Card, FloatingLabel, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

const SignupPage = () => {
  const auth = useAuth();
  const [signupFailed, setSignupFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, t('signup.errors.usernameLength')).max(20, t('signup.errors.usernameLength')).required(t('signup.errors.required')),
      password: Yup.string().min(6, t('signup.errors.passwordLength')).required(t('signup.errors.required')),
      passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], t('signup.errors.passwordNotMatch')),
    }),
    onSubmit: async (values) => {
      setSignupFailed(false);

      const { username, password } = values;

      try {
        const res = await axios.post(routes.signUpPath(), { username, password });
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          setSignupFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  const isFillUsernameError = formik.touched.username && formik.errors.username;
  const isFillPasswordError = formik.touched.password && formik.errors.password;
  const isPasswordConfirmationError = formik.touched.passwordConfirmation
  && formik.errors.passwordConfirmation;
  const signupError = t('signup.errors.existedUser');

  return (
    <Container fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col md="5" lg="5" xl="4" xxl="4">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Form className="justify-content-center col-12  mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signup.header')}</h1>
                <FloatingLabel label={t('signup.form.username')} className="mb-3">
                  <Form.Control
                    name="username"
                    placeholder={t('signup.form.username')}
                    type="text"
                    ref={inputRef}
                    isInvalid={isFillUsernameError || signupFailed}
                    {...formik.getFieldProps('username')}
                  />
                  {isFillUsernameError ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  ) : null}
                </FloatingLabel>
                <FloatingLabel label={t('signup.form.password')} className="mb-4">
                  <Form.Control
                    name="password"
                    placeholder={t('signup.form.password')}
                    type="password"
                    isInvalid={isFillPasswordError || signupFailed}
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                  ) : null}
                </FloatingLabel>
                <FloatingLabel label={t('signup.form.passwordConfirm')} className="mb-4">
                  <Form.Control
                    name="password"
                    placeholder={t('signup.form.passwordConfirm')}
                    type="password"
                    isInvalid={isPasswordConfirmationError || signupFailed}
                    {...formik.getFieldProps('passwordConfirmation')}
                  />
                  {isPasswordConfirmationError || signupFailed ? (
                    <Form.Control.Feedback type="invalid">
                      {
                      isPasswordConfirmationError ? formik.errors.passwordConfirmation : signupError
                    }
                    </Form.Control.Feedback>
                  ) : null}
                </FloatingLabel>
                <Button type="submit" className="w-100 mb-3 btn-primary">{t('buttons.signup')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
