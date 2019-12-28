import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from './button';
import { Input } from './input';

const CommentForm = styled.form`
  display: flex;
  margin-top: 32px;

  ${Input} {
    margin-right: 8px;
    margin-top: auto;
    margin-bottom: auto;
  }

  ${Button} {
    margin: auto 0;
  }
`;

const CommentListItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 4px 0;

  >strong {
    font-size: 80%;
    color: #666;
  }
`;

export const BookComments = (props) => {
  const { bookId, firebase } = props;
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.subscribeToBookComments({
      bookId,
      onSnapshot: (snapshot) => {
        console.log('bsn', snapshot);
        const snapshotComments = [];

        snapshot.forEach((doc) => {
          snapshotComments.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setComments(snapshotComments);
      },
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    }
  }, []);

  if (!comments) {
    return null;
  }

  const handlePostCommentSubmit = (e) => {
    e.preventDefault();

    firebase.postComment({
      text: commentText,
      bookId,
    });
  };

  return (
    <div>
      <CommentForm onSubmit={handlePostCommentSubmit}>
        <Input
          onChange={(e) => {
            e.persist();

            setCommentText(e.target.value);
          }}
          value={commentText}
        />
        <Button type="submit">
          Post Comment
        </Button>
      </CommentForm>
      {comments.map((comment) => {
        const milliseconds = (comment.dateCreated.seconds * 1000) + (comment.dateCreated.nanoseconds / 1000000);

        return (
          <CommentListItem key={comment.id}>
            <strong>
              {comment.username} - {new Date(milliseconds).toLocaleString()}
            </strong>
            <div>
              {comment.text}
            </div>
          </CommentListItem>
        );
      })}
    </div>
  )
};
