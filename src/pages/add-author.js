import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../components/firebase';
import { Button, Input, Form } from '../components/common';

const AddAuthor = () => {
  const [authorName, setAuthorName] = useState('');
  const [success, setSuccess] = useState(false);
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
      .createAuthor({
        authorName,
      })
      .then(() => {
        if (isMounted) {
          setAuthorName('');
          setSuccess(true);
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        onChange={(e) => {
          e.persist();
          setSuccess(false);
          setAuthorName(e.target.value);
        }}
        placeholder="author name"
        value={authorName}
      />
      {!!success && (
        <span>
          Author created successfully!
        </span>
      )}
      <Button block type="submit">
        Add new author
      </Button>
    </Form>
  );
};

export default AddAuthor;
