import { Col, Form } from "react-bootstrap";

const Input = ({
  roundedPill = undefined,
  label,
  size = 12,
  isRequired = false,
  type = "text",
  value = undefined,
  changeHandler,
  name,
  Formik: { handleBlur, touched, errors },
}) => {
  let inputLabel = label ? (isRequired ? label + "*" : label) : name;

  return (
    <Form.Group as={Col} md={size} sm={12} xs={12}>
      <Form.Label>{inputLabel}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        className={`border-warning ${roundedPill}`}
        onChange={changeHandler}
        onBlur={handleBlur}
        isInvalid={touched[name] && !!errors[name]}
      />
      <Form.Control.Feedback type="invalid">
        {touched[name] && errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
