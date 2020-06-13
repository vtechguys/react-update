import React from "react";
import {
  dispatchFormInputChange,
  dispatchFormInputError,
  dispatchFormInputErrors,
  dispatchFormInputValid,
} from "../utils/dispatch";
import { formReducer } from "../utils/reducer";
import { isEmpty } from "../utils";
import { Input } from "./ui";

const validateEveryInputOnSubmit = (config, validators) => {
  const errors = {};
  const fieldNames = Object.keys(config);
  for (let name of fieldNames) {
    const { touched, required, value, label } = config[name];
    if (validators && validators[name]) {
      if (required || (touched && value)) {
        if (!validators[name](value)) {
          errors[name] = `${label} is invalid`;
        }
      }
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

function Form({
  config,
  validators,
  onSubmit,
  errors = null,
  isSubmitting = false,
}) {
  const [form, formDispatch] = React.useReducer(formReducer, config);
  const setInput = dispatchFormInputChange(formDispatch);
  const setError = dispatchFormInputError(formDispatch);
  const setInputValid = dispatchFormInputValid(formDispatch);
  const setMultipleErrors = dispatchFormInputErrors(formDispatch);
  const [isFormValid, setIsFormValid] = React.useState(true);

  const onInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      name,
      value: typeof value == "string" ? value.trim() : value,
    });
  };
  
  const onBlurHandler = (e) => {
    const { name } = e.target;
    if (validators && validators[name]) {
      const {required, touched, value, label } = form[name];
      if (required || (touched && value)) {
        if (!validators[name](value)) {
          return setError({ name, error: `${label} is invalid` });
        }
        setIsFormValid(true);
        return setInputValid({ name });
      }
    }
    return setIsFormValid(true);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateEveryInputOnSubmit(form, validators);
    if (!isValid) {
      setIsFormValid(false);
      return setMultipleErrors(errors);
    }
    setIsFormValid(true);
    const values = {};
    for (let name in form) {
      const { valid, value } = form[name];
      if (valid && value) {
        values[name] = value;
      }
    }
    onSubmit(values);
  };

  React.useEffect(() => {
    if(errors) {
      setMultipleErrors(errors);
    }
  }, [errors]);

  const isSubmitDisabled = isSubmitting || !isFormValid;

  return (
    <form onSubmit={onSubmitHandler} className="container-fluid column">
      {Object.keys(form).map((name) => {
        const { tag } = form[name];
        switch (tag) {
          case "textarea": {
            return <textarea key={name} disabled={isSubmitting} />;
          }
          default: {
            return (
              <Input
                onChange={onInputChangeHandler}
                {...form[name]}
                key={name}
                disabled={isSubmitting}
                errors={errors}
                onBlur={onBlurHandler}
              />
            );
          }
        }
      })}
      <button
        type="submit"
        className={"btn font-big p12" + (isSubmitDisabled ? " disabled" : "")}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
    </form>
  );
}
export default Form;
