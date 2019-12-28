import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../components/firebase';
import { Button, ErrorMessage, Form, Input } from '../components/common';

const Register = () => {
  const { firebase } = useContext(FirebaseContext);
  const [formValues, setFormValues] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [ errorMessage, setErrorMessage ] = useState('');
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    }
  }, []);

  const handleInputChange = (e) => {
    e.persist();
    setErrorMessage('');

    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.password === formValues.confirmPassword) {
      firebase
      .register({
        email: formValues.email,
        password: formValues.password,
        firstname: formValues.firstName,
        lastname: formValues.lastName,
        username: formValues.username,
      })
      .catch((error) => {
        if (isMounted) {
          console.log('error', error);
          setErrorMessage(error.message);
        }
      });
    } else {
      setErrorMessage('Password values do not match.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="username"
        onChange={handleInputChange}
        placeholder="user name"
        required
        value={formValues.username}
      />
      <Input
        name="firstName"
        onChange={handleInputChange}
        placeholder="first name"
        required
        value={formValues.firstName}
      />
      <Input
        name="lastName"
        onChange={handleInputChange}
        placeholder="last name"
        required
        value={formValues.lastName}
      />
      <Input
        name="email"
        onChange={handleInputChange}
        placeholder="email"
        required
        type="email"
        value={formValues.email}
      />
      <Input
        minLength={6}
        name="password"
        onChange={handleInputChange}
        placeholder="password"
        required
        type="password"
        value={formValues.password}
      />
      <Input
        minLength={6}
        name="confirmPassword"
        onChange={handleInputChange}
        placeholder="confirm password"
        required
        type="password"
        value={formValues.confirmPassword}
      />
      {!!errorMessage && (
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>
      )}
      <Button block type="submit">
        Register
      </Button>
    </Form>
  );
};

export default Register;
