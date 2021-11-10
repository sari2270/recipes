import { Col, Form, InputGroup, Row, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import Input from "../UI/Input";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const history = useHistory();

  const inputs = [
    { name: "firstName", size: "4" },
    { name: "lastName", size: "4" },
    { name: "email", size: "4", type: "email" },
    { name: "password", size: "4", type: "password" },
    { name: "confirmPassword", size: "4", type: "password" },
  ];

  const schema = yup.object().shape({
    firstName: yup.string().required().min(2),
    lastName: yup.string().required().min(2),
    email: yup.string().email().required(),
    password: yup.string().required().min(2),
    confirmPassword: yup
      .string()
      .required()
      .when("password", {
        is: (password) => (password && password.length > 0 ? true : false),
        then: yup.string().oneOf([yup.ref("password")]),
      }),
    // terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const onRegister = async (user) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(
      `${baseUrl}auth/register`,
        user
      );
      console.log("data", response);
      // alert("success")
      history.replace("/");
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          const user = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          };
          console.log(user);
          onRegister(user);
        }}
        initialValues={initialValues}
      >
        {(
          Formik
          //     {
          //   handleSubmit,
          //   handleChange,
          //   handleBlur,
          //   values,
          //   touched,
          //   isValid,
          //   errors,
          // }
        ) => (
          <Form noValidate onSubmit={Formik.handleSubmit}>
            <Row className="mb-3">
              {inputs.map((inputDetails, index) => (
                <Input
                  key={index}
                  name={inputDetails.name}
                  size={inputDetails.size}
                  type={inputDetails.type || "text"}
                  Formik={Formik}
                />
              ))}
            </Row>

            {/* <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={Formik.values.city}
                  onChange={Formik.handleChange}
                  isInvalid={!!Formik.errors.city}
                />
  
                <Form.Control.Feedback type="invalid">
                  {Formik.errors.city}
                </Form.Control.Feedback>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={Formik.handleChange}
                  isInvalid={!!Formik.errors.terms}
                  feedback={Formik.errors.terms}
                  feedbackType="invalid"
                  id="validationFormik0"
                />
              </Form.Group> */}
            <Button type="submit">Submit form</Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
