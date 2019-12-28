import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from '../components/firebase';
import { Button, ErrorMessage, Form, Input } from '../components/common';

const LoginPage = () => {
  const [ formValues, setFormValues ] = useState({ email: '', password: '' });
  const [ errorMessage, setErrorMessage ] = useState('');
  const { firebase } = useContext(FirebaseContext);
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
    .login({
      email: formValues.email,
      password: formValues.password,
    })
    .catch((error) => {
      if (isMounted) {
        console.log('error', error);
        setErrorMessage(error.message);
      }
    });
  };

  const handleInputChange = (e) => {
    e.persist();

    setErrorMessage('');

    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }));
  }

  return (
  <section>
    <Form onSubmit={handleSubmit}>
      <Input
        name="email"
        onChange={handleInputChange}
        placeholder="email"
        required
        type="eamil"
        value={formValues.email}
      />
      <Input
        name="password"
        onChange={handleInputChange}
        placeholder="password"
        required
        type="password"
        value={formValues.password}
      />
      {!!errorMessage && (
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>
      )}
      <Button block type="submit">
        Login
      </Button>
    </Form>
  </section>
  );
};

export default LoginPage;
