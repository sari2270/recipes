import { Col, Form } from "react-bootstrap";

const Input = ({
  name,
  size,
  type = "text",
  changeHandler,
  value = null,
  Formik: { handleBlur, touched, errors },
}) => {
  const label = name[0].toUpperCase() + name.slice(1);
  return (
    <>
      <Form.Group as={Col} md={size}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          name={name}
          value={value}
          onChange={changeHandler}
          onBlur={handleBlur}
          isInvalid={touched[name] && !!errors[name]}
        />
        <Form.Control.Feedback type="invalid">
          {touched[name] && errors[name] && errors[name]}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default Input;
