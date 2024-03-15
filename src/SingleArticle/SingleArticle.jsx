import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchArticleById, voteArticle } from "../api";
import { dateFormatter } from "../utils";
import "./singlearticle.css";
import Comments from "../Comments/Comments";
import NoMatch from "../ErrorHandling/NoMatch";

const SingleArticle = () => {
  const { article_id } = useParams();

  const [singleArticle, setSingleArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [voteCount, setVoteCount] = useState(null);
  const [voteFailed, setVoteFailed] = useState(false);
  const [articleExists, setArticleExists] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id)
      .then((article) => {
        setSingleArticle(article);
        setVoteCount(article.votes);
        setIsLoading(false);
      })
      .catch((error) => {
        setArticleExists(false);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleVote = (voteType) => {
    const newVote = voteType === "upvote" ? 1 : -1;
    voteArticle(article_id, newVote)
      .then(() => {
        setVoteCount((prevCount) => prevCount + newVote);
        setVoteFailed(false);
      })
      .catch((error) => {
        setVoteFailed(true);
        setVoteCount((prevCount) => prevCount + newVote);
      });
  };

  if (isLoading) {
    return <p>Loading article...</p>;
  }
  if (!articleExists) {
    return (
      <>
        <NoMatch />
      </>
    );
  }

  const backgroundStyle = {
    background: `url(${singleArticle.article_img_url}) no-repeat rgba(0, 0, 0, 0.8)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    padding: "100px 20px",
    textAlign: "center",
    backgroundBlendMode: "multiply",
  };

  return (
    <>
      <section className="hero-section" style={backgroundStyle}>
        <p className="article-topic">{singleArticle.topic}</p>
        <p className="single-article-date">
          {dateFormatter(singleArticle.created_at)}
        </p>
        <h1 className="single-article-title">{singleArticle.title}</h1>
        <p className="single-article-meta-info">
          Written by: {singleArticle.author} <br />
        </p>
      </section>
      <div className="article-container">
        <article className="article-body-section">
          <p className="single-article-body">{singleArticle.body}</p>
          <div className="vote-section">
            <button className="vote-btn" onClick={() => handleVote("upvote")}>
              👍
            </button>
            <p>{voteCount}</p>
            <button className="vote-btn" onClick={() => handleVote("downvote")}>
              👎
            </button>
            {voteFailed && (
              <p style={{ color: "red" }}>
                Failed to vote. Please try again later.
              </p>
            )}
          </div>
        </article>
        <section className="comments-container">
          <Comments article_id={article_id} />
        </section>
      </div>
    </>
  );
};

export default SingleArticle;
