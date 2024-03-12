import { useContext, useState } from "react";
import UserContext from "../Contexts/User";
import { postComment } from "../api";

const AddComment = ({ article_id }) => {
  const { loggedInUser } = useContext(UserContext);
  const [postBody, setPostBody] = useState();
  const [commentResponse, setCommentResponse] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userPostObj = {
      username: loggedInUser.username,
      body: postBody,
    };

    postComment(userPostObj, article_id).then((response) => {
      setCommentResponse((currCommentResponse) => {});
    });

    setPostBody("");
  };

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
    </>
  );
};

export default AddComment;
