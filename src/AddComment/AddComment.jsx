import { useContext, useEffect, useState } from "react";
import UserContext from "../Contexts/User";
import { postComment } from "../api";

const AddComment = ({ article_id, updateComments }) => {
  const { loggedInUser } = useContext(UserContext);
  const [postBody, setPostBody] = useState();
  const [submitMessage, setSubmitMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const userPostObj = {
      username: loggedInUser.username,
      body: postBody,
    };

    postComment(userPostObj, article_id)
      .then((response) => {
        setSubmitMessage("Comment submitted successfully!");
        updateComments();
      })
      .catch((error) => {
        if (error.response.data.msg === "username does not exist") {
          setSubmitMessage("You need to be logged in to comment.");
        } else {
          setSubmitMessage("Failed to submit comment. Please try again later.");
        }
      });

    setPostBody("");
  };

  if (isLoading) {
    return <p>Loading Comment Form...</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          value={postBody}
          onChange={(event) => setPostBody(event.target.value)}
          required
          placeholder="add your comment here..."
        ></textarea>
        <button>submit</button>
      </form>
      {submitMessage && <p>{submitMessage}</p>}
    </>
  );
};

export default AddComment;
