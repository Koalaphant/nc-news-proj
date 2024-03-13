import { useContext, useEffect, useState } from "react";
import "./addComment.css";
import { postComment } from "../api";

const AddComment = ({ article_id, setComments, loggedInUser }) => {
  const [newComment, setNewComment] = useState();
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitFailMessage, setSubmitFailMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const commentBody = {
      username: loggedInUser.username,
      body: newComment,
    };

    postComment(commentBody, article_id)
      .then((newCommentFromApi) => {
        setSubmitMessage("Comment submitted successfully!");
        setNewComment("");
        setComments((currComments) => {
          return [newCommentFromApi, ...currComments];
        });
      })
      .catch((error) => {
        if (error.response.data.msg === "username does not exist") {
          setSubmitFailMessage("You need to be logged in to comment.");
        } else {
          setSubmitFailMessage(
            "Failed to submit comment. Please try again later."
          );
        }
      });
  };

  if (isLoading) {
    return <p>Loading Comment Form...</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          className="comment-submit-body"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          required
          placeholder="add your comment here..."
        ></textarea>
        <button>submit</button>
      </form>
      {submitMessage && <p className="submit-message">{submitMessage}</p>}
      {submitFailMessage && (
        <p className="submit-fail-message">{submitFailMessage}</p>
      )}
    </>
  );
};

export default AddComment;
