import { Form, InputGroup, Row, Button, Container, Col } from "react-bootstrap";
import { Field, Formik } from "formik";
import Input from "../UI/Input";
import { useContext, useState } from "react";
import { Prompt, useHistory } from "react-router";
import { FaPlusCircle } from "react-icons/fa";
import { inputs, inputsIngr } from "../../constants";
import DNDlist from "./DNDlist";
import AuthContext from "../../store/auth-context";
import Title from "../UI/Title";
import SubmitButton from "../UI/SubmitButton";
import schema from "../../validations/recipeSchema";
import useFetch from "../../hooks/useFetch";

const baseUrl = process.env.REACT_APP_BASE_URL;

const AddRecipeForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const url = `recipes/categories`;

  const options = {
    method: "GET",
  };
  const { data } = useFetch(url, options);
  const categories = data?.categories;

  const [isFocusedForm, setIsFocusedForm] = useState(false);

  const [ingredients, updateIngredients] = useState([]);
  const [instructions, updateInstructions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);

  const [singleIngredient, setSingleIngredient] = useState({
    id: "" + ingredients.length,
    quantity: "",
    measuringUnit: "",
    ingredientName: "",
    state: "",
  });

  const [singleInstruction, setSingleInstruction] = useState({
    id: "" + instructions.length,
    instruction: "",
  });

  function saveDNDHandler(result, itemsState, updateFunc) {
    if (!result.destination) return;
    const items = Array.from(itemsState);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateFunc(items);
  }

  const initialValues = {
    prepTime: "",
    servings: "",
    title: "",
    sourceUrl: "",
    imgUrl: "",
    photographer: "",
    sourceName: "",
    description: "",
    categories: [],
  };

  const IngredientsChangeHandler = ({ target: { name, value } }) => {
    setSingleIngredient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const InstructionChangeHandler = ({ target: { value } }) => {
    setSingleInstruction((prev) => ({
      ...prev,
      instruction: value,
    }));
  };
  const addIngredientHandler = () => {
    if (singleIngredient.ingredientName.trim() == "") return;
    updateIngredients([...ingredients, singleIngredient]);
    setSingleIngredient({
      id: "" + (ingredients.length + 1),
      quantity: "",
      measuringUnit: "",
      ingredientName: "",
      state: "",
    });
  };

  const addInstructionHandler = () => {
    if (singleInstruction.instruction.trim() == "") return;
    updateInstructions([...instructions, singleInstruction]);
    setSingleInstruction({
      id: "" + (instructions.length + 1),
      instruction: "",
    });
  };
  const onAddRecipe = async (values) => {
    setIsLoading(true);
    setError([]);
    try {
      await authCtx.customAxios().post(`${baseUrl}recipes/add-recipe`, values, {
        headers: { authorization: `bearer ${authCtx.user.accessToken}` },
      });
      history.replace("/");
    } catch (error) {
      setError([...error.response.data.errors]);
    }
    setIsLoading(false);
  };
  return (
    <>
      <Prompt when={isFocusedForm} message="Are you sure you want to leave?" />
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          setError([]);
          values.ingredients = ingredients;
          values.instructions = instructions;
          if (!authCtx.user?.id) {
            setError((prev) => [...prev, "You are not authenticated"]);
            return;
          }
          values.userId = authCtx.user.id;
          onAddRecipe(values);
        }}
        initialValues={initialValues}
      >
        {(Formik) => (
          <Container>
            <Title>Add a Recipe</Title>
            <Form
              noValidate
              onSubmit={Formik.handleSubmit}
              onFocus={() => {
                setIsFocusedForm(true);
              }}
            >
              <Row className="mb-3">
                <Col xs={12} md={5}>
                  <div>
                    {inputs
                      .slice(0, -3)
                      .map(({ name, label, size, type, isRequired }, index) => (
                        <Input
                          key={index}
                          name={name}
                          label={label}
                          size={size}
                          type={type}
                          isRequired={isRequired}
                          Formik={Formik}
                          changeHandler={Formik.handleChange}
                        />
                      ))}
                  </div>
                  <div id="checkbox-group" className="mt-4">
                    Categories
                  </div>
                  <div role="group">
                    {categories &&
                      categories.map(({ title }, index) => (
                        <label key={index} className="mx-2">
                          <Field
                            type="checkbox"
                            name="categories"
                            value={title}
                          />
                          {title}
                        </label>
                      ))}
                  </div>
                </Col>
                <Col xs={12} md={7}>
                  {inputs
                    .slice(-3)
                    .map(({ name, label, size, type, isRequired }, index) => (
                      <Input
                        key={index}
                        name={name}
                        label={label}
                        size={size}
                        type={type}
                        isRequired={isRequired}
                        Formik={Formik}
                        changeHandler={Formik.handleChange}
                      />
                    ))}
                  <InputGroup>
                    {inputsIngr.map(
                      ({ name, label, size, type, isRequired }, index) => (
                        <Input
                          key={index}
                          name={name}
                          label={label}
                          size={size}
                          type={type}
                          isRequired={isRequired}
                          value={singleIngredient[name]}
                          Formik={Formik}
                          changeHandler={IngredientsChangeHandler}
                        />
                      )
                    )}
                  </InputGroup>
                  <Button className="rounded-circle btn-light text-warning p-0 fs-4 my-1">
                    <FaPlusCircle onClick={addIngredientHandler}>
                      +
                    </FaPlusCircle>
                  </Button>
                  <DNDlist
                    componentType="ingredients"
                    Formik={Formik}
                    content={ingredients}
                    saveDNDHandler={saveDNDHandler}
                    updateContent={updateIngredients}
                  />
                  <InputGroup>
                    <Input
                      name="instruction"
                      label="Instruction"
                      size="12"
                      value={singleInstruction.instruction}
                      Formik={Formik}
                      changeHandler={InstructionChangeHandler}
                    />
                    <Button className="rounded-circle btn-light text-warning p-0 fs-4 my-1">
                      <FaPlusCircle onClick={addInstructionHandler}>
                        +
                      </FaPlusCircle>
                    </Button>
                  </InputGroup>
                  <DNDlist
                    componentType="instructions"
                    Formik={Formik}
                    content={instructions}
                    saveDNDHandler={saveDNDHandler}
                    updateContent={updateInstructions}
                  />
                </Col>
              </Row>
              {error?.length >= 1 &&
                error.map((e) => <div className="text-danger">{e}</div>)}

              <SubmitButton
                isLoading={isLoading}
                onClick={() => {
                  setIsFocusedForm(false);
                }}
              >
                Add The Recipe
              </SubmitButton>
            </Form>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default AddRecipeForm;
