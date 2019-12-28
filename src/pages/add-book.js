import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../components/firebase';
import { Button, Input, Form } from '../components/common';
import styled from 'styled-components';

const FormField = styled.div`
  margin-bottom: 20px;
`;

let fileReader;

if (typeof window !== 'undefined') {
  fileReader = new FileReader();
}

const AddBook = () => {
  const { firebase } = useContext(FirebaseContext);
  const [authors, setAuthors] = useState([]);
  const [bookCover, setBookCover] = useState('');
  const [bookName, setBookName] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [summary, setSummary] = useState('');
  const [success, setSuccess] = useState(false);
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    fileReader.addEventListener('load', () => {
      setBookCover(fileReader.result);
    });
  }, []);

  useEffect(() => {
    //  query all available authors
    if (firebase) {
      firebase
      .getAuthors()
      .then((snapshot) => {
        if (isMounted) {
          const availableAuthors = [];

          snapshot.forEach((doc) => {
            availableAuthors.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          setAuthorId(availableAuthors[0].id)
          setAuthors(availableAuthors);
        }
      });
    }
  }, [firebase]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();

        firebase
          .createBook({
            authorId,
            bookCover,
            bookName,
            summary,
          })
          .then(() => {
            if (isMounted) {
              setSuccess(true);
            }
          });
      }}
    >
      <FormField>
        <Input
          onChange={(e) => {
            e.persist();
            setBookName(e.target.value);
            setSuccess(false);
          }}
          placeholder="book name"
          value={bookName}
        />
      </FormField>
      <FormField>
        <strong>
          Author
        </strong>
        <div>
          <select
            onChange={(e) => {
              e.persist();
              setAuthorId(e.target.value);
              setSuccess(false);
            }}
            value={authorId}
          >
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      </FormField>
      <FormField>
        <strong>
          Book Cover
        </strong>
        <Input
          onChange={(e) => {
            e.persist();
            fileReader.readAsDataURL(e.target.files[0]);
            setSuccess(false);
          }}
          type="file"
        />
      </FormField>
      <FormField>
        <strong>
          Summary
        </strong>
        <Input
          onChange={(e) => {
            e.persist();
            setSummary(e.target.value);
            setSuccess(false);
          }}
          placeholder="book summary"
          value={summary}
        />
      </FormField>
      {!!success && (
        <span>
          New book added successfully.
        </span>
      )}
      <Button block type="submit">
        Add new book
      </Button>
    </Form>
  );
};

export default AddBook;
