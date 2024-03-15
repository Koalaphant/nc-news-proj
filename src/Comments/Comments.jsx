import { useContext, useEffect, useState } from "react";
import { fetchCommentById, deleteComment, fetchUsers } from "../api";
import { dateFormatter } from "../utils";
import "./comments.css";
import AddComment from "../AddComment/AddComment";
import UserContext from "../Contexts/User";

const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const { loggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [deleteFeedback, setDeleteFeedback] = useState(null);

  useEffect(() => {
    fetchCommentById(article_id).then((fetchedComments) => {
      setComments(fetchedComments);
      setIsLoading(false);
    });
    fetchUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers);
    });
  }, []);

  const handleDeleteComment = (comment_id) => {
    deleteComment(comment_id)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setDeleteFeedback("Comment deleted successfully.");

        setTimeout(() => {
          setDeleteFeedback(null);
        }, 5000);
      })
      .catch((error) => {
        setDeleteFeedback("Failed to delete comment. Please try again.");
        setTimeout(() => {
          setDeleteFeedback(null);
        }, 5000);
      });
  };

  if (isLoading) {
    return <p className="isLoading">Loading comments...</p>;
  }

  if (comments === undefined) {
    return setComments([]);
  }

  return (
    <>
      <section className="comments-section">
        <h3 className="comments-title">Comments</h3>
        <AddComment
          article_id={article_id}
          setComments={setComments}
          loggedInUser={loggedInUser}
        />
        {deleteFeedback && <p className="delete-feedback">{deleteFeedback}</p>}
        <ul>
          {comments.map((comment) => (
            <li className="comment-card" key={comment.comment_id}>
              <aside className="img-col">
                {users.map((user) => {
                  if (user.username === comment.author) {
                    return (
                      <img
                        key={user.username}
                        src={user.avatar_url}
                        alt={user.username}
                        className="user-img-comment"
                      />
                    );
                  }
                  return null;
                })}
              </aside>
              <aside className="comment-data-col">
                <p>{comment.author}</p>
                <p>{dateFormatter(comment.created_at)}</p>
                <p id="comment-body">{comment.body}</p>
                {loggedInUser.username === comment.author && (
                  <button
                    onClick={() => handleDeleteComment(comment.comment_id)}
                  >
                    Delete
                  </button>
                )}
              </aside>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Comments;
