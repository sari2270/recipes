import { Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import Input from "../UI/Input";
import AuthContext from "../../store/auth-context";
import SubmitButton from "../UI/SubmitButton";
import { loginInputs as inputs } from "../../constants";
import schema from "../../validations/loginSchema";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <>
      <h2 className="text-center">LOGIN</h2>
      <Formik
        validationSchema={schema}
        onSubmit={async (values) => {
          const user = {
            email: values.email,
            password: values.password,
          };
          const errors = await authCtx.login(user);
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
                    Formik={Formik}
                    changeHandler={Formik.handleChange}
                    roundedPill={"rounded-pill"}
                  />
                </Form.Group>
              ))}
            </Row>
            {authCtx.loginError?.length >= 1 &&
              [...authCtx.loginError].map((e, index) => (
                <div key={index} className="text-danger">
                  {e}
                </div>
              ))}
            <SubmitButton
              isLoading={isLoading}
              btnBG={"light"}
              btnText={"warning"}
            >
              Login
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
