import { Form, InputGroup, Row, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../UI/Input";
import axios from "axios";
import { useState } from "react";
import { Prompt, useHistory } from "react-router";

import { BsFillPlusCircleFill } from "react-icons/bs";

import { inputs, inputsIngr } from "../../constants";
import DNDlist from "./DNDlist";

const baseUrl = process.env.REACT_APP_BASE_URL;

const AddRecipeForm = () => {
  const history = useHistory();

  const [isFocusedForm, setIsFocusedForm] = useState(false);

  const [ingredients, updateIngredients] = useState([]);
  const [instructions, updateInstructions] = useState([]);

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

  const insertrecipeDet = (originalArr, setFunc) => {
    const tempArr = [];
    for (let i = 0; i < originalArr.length; i++) {
      tempArr.push({ id: "" + i, ...originalArr[i] });
    }
    setFunc([...tempArr]);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const schema = yup.object().shape({
    prepTime: yup
      .string()
      .required()
      .max(20, "too longgggggggg"),
    servings: yup
      .number()
      .required()
      .min(1, "min 111111111")
      .max(20, "max 20000000"),
    title: yup
      .string()
      .required()
      .min(2, "min 22222")
      .max(40, "max 40000000"),
    sourceUrl: yup.string().nullable().url(),
    imgUrl: yup.string().required().url(),
    photographer: yup
      .string()
      .required()
      .min(2, "min 22222")
      .max(40, "max 40000000"),
    sourceName: yup
      .string()
      .required()
      .min(2, "min 22222")
      .max(30, "max 40000000"),
    description: yup.string().max(600, "max 40000000"),
    // categories:'',
    // difficulty:'',
    // terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  const initialValues = {
    prepTime: "",
    servings: "",
    title: "",
    sourceUrl: "",
    imgUrl: "",
    photographer: "",
    sourceName: "",
    description: "",
    // categories: "",
    // difficulty: "",
    terms: false,
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
    setError(null);

    try {
      const response = await axios.post(
        `${baseUrl}recipes/add-recipe`,
        values
      );
      history.replace("/");
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setIsLoading(false);
  };
  return (
    <>
      <Prompt when={isFocusedForm} message="Are you sure you want to leave?" />
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          values.ingredients = ingredients;
          values.instructions = instructions;
          values.difficulty = "hard";
          console.log(values)
          // values.user = { name: "sari" },
          onAddRecipe(values);
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
          <Form
            noValidate
            onSubmit={Formik.handleSubmit}
            onFocus={() => {
              setIsFocusedForm(true);
            }}
          >
            <Row className="mb-3">
              {inputs.map((inputDetails, index) => (
                <Input
                  key={index}
                  name={inputDetails.name}
                  size={inputDetails.size}
                  type={inputDetails.type}
                  Formik={Formik}
                  changeHandler={Formik.handleChange}
                />
              ))}
            </Row>
            <Row className="mb-3">
              <InputGroup>
                {inputsIngr.map((inputDetails, index) => (
                  <Input
                    key={index}
                    name={inputDetails.name}
                    size={inputDetails.size}
                    type={inputDetails.type}
                    value={singleIngredient[inputDetails.name]}
                    Formik={Formik}
                    changeHandler={IngredientsChangeHandler}
                  />
                ))}
                <Button
                  type="button"
                  onClick={addIngredientHandler}
                  variant="warning"
                >
                  <BsFillPlusCircleFill />
                </Button>
              </InputGroup>
            </Row>

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
                size="5"
                value={singleInstruction.instruction}
                Formik={Formik}
                changeHandler={InstructionChangeHandler}
              />
              <Button
                type="button"
                onClick={addInstructionHandler}
                variant="warning"
              >
                <BsFillPlusCircleFill />
              </Button>
            </InputGroup>
            <DNDlist
              componentType="instructions"
              Formik={Formik}
              content={instructions}
              saveDNDHandler={saveDNDHandler}
              updateContent={updateInstructions}
            />

            <Button
              type="submit"
              onClick={() => {
                setIsFocusedForm(false);
              }}
              variant="warning"
            >
              Add{" "}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddRecipeForm;
