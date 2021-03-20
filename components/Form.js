import React, { useContext, useState } from 'react';

import styles from 'styles/form.module.css';

export const FormContext = React.createContext({
  values: {},
  errors: {},
  initialValues: {},
  setValues() {},
  setErrors() {},
  handleChange() {},
  onReset() {}
});

const FormProvider = ({ initialValues = {}, children, validate, onSubmit }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setValues((s) => ({
      ...s,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors((s) => ({
      ...s,
      [name]: validate({ ...values, [name]: value })[name]
    }));
  };

  const onReset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = validate(values);
    if (!Object.keys(errs).length) {
      onSubmit(values);
    } else {
      setErrors(errs);
    }
  };

  const contextValue = {
    initialValues,
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    onReset
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

export const Field = ({
  name,
  type = 'text',
  as = 'input',
  className = '',
  children,
  ...rest
}) => {
  const { values, errors, handleChange } = useContext(FormContext);
  const value = values[name];
  const error = errors[name];
  const elemProps = {
    id: name,
    name,
    type,
    value,
    onChange: handleChange,
    ...rest
  };
  if (as !== 'input') {
    delete elemProps.type;
  }

  const element = React.createElement(as, elemProps);

  return (
    <div data-invalid={!!error} className={`${styles.field} ${className}`}>
      {error && <p>{error}</p>}
      <label htmlFor={name}>
        {element}
        {children}
      </label>
    </div>
  );
};

export default FormProvider;
