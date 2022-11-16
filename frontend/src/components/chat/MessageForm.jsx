import { useFormik } from 'formik';
import {
  Button, Form, InputGroup,
} from 'react-bootstrap';

const MessageForm = () => {
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup hasValidation>
          <Form.Control
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите новое сообщение..."
            className="border-0 p-0 ps-2"
          />
          <Button type="submit" variant="group-vertical">
            <ion-icon name="send" />
          </Button>
        </InputGroup>

      </Form>
    </div>
  );
};

export default MessageForm;
