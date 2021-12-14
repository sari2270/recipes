import { Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { registerInputs as inputs } from "../../constants";
import Input from "../UI/Input";
import SubmitButton from "../UI/SubmitButton";
import schema from "../../validations/registerSchema";
import AuthContext from "../../store/auth-context";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Register = () => {
  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <>
      <h2 className="text-center">REGISTER</h2>
      <Formik
        validationSchema={schema}
        onSubmit={async (values) => {
          const user = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          };
          const errors = await authCtx.register(user);
          if (errors.length == 0) history.replace("/");
        }}
        initialValues={initialValues}
      >
        {(Formik) => (
          <Form noValidate onSubmit={Formik.handleSubmit}>
            <Row className="mb-3">
              {inputs.map((inputDetails, index) => (
                <Form.Group key={index}>
                  <Input
                    key={index}
                    name={inputDetails.name}
                    label={inputDetails.label}
                    type={inputDetails.type || "text"}
                    roundedPill={"rounded-pill"}
                    Formik={Formik}
                    changeHandler={Formik.handleChange}
                  />
                </Form.Group>
              ))}
            </Row>
            {authCtx.registerError?.length >= 1 &&
              [...authCtx.registerError].map((e, index) => (
                <div key={index} className="text-danger">
                  {e}
                </div>
              ))}
            <SubmitButton
              isLoading={isLoading}
              btnBG={"light"}
              btnText={"warning"}
            >
              Register
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
