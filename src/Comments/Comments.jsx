import { useEffect, useState } from "react";
import { fetchCommentById } from "../api";
import { dateFormatter } from "../utils";
import "./comments.css";
import AddComment from "../AddComment/AddComment";

const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCommentById(article_id).then((fetchedComments) => {
      setComments(fetchedComments);
      setIsLoading(false);
    });
  }, []);

  const updateComments = () => {
    fetchCommentById(article_id).then((fetchedComments) => {
      setComments(fetchedComments);
    });
  };

  if (isLoading) {
    return <p className="isLoading">Loading comments...</p>;
  }

  if (comments === undefined) {
    return setComments([]);
  }

  if (comments.length === 0) {
    return <p className="isLoading">No comments found</p>;
  }

  return (
    <>
      <section className="comments-section">
        <AddComment article_id={article_id} updateComments={updateComments} />
        <ul>
          <h3>Comments</h3>
          {comments.map((comment) => (
            <li className="comment-card" key={comment.comment_id}>
              <p>{comment.author}</p>
              <p id="comment-body">{comment.body}</p>
              <p>{dateFormatter(comment.created_at)}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Comments;
