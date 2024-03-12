import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchArticleById } from "../api";
import { dateFormatter } from "../utils";
import "./singlearticle.css";

const SingleArticle = () => {
  let { article_id } = useParams();

  const [singleArticle, setSingleArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id).then((article) => {
      setSingleArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

  console.log(singleArticle);
  if (isLoading) {
    return <p>Loading article...</p>;
  }

  const backgroundStyle = {
    background: `url(${singleArticle.article_img_url}) no-repeat rgba(0, 0, 0, 0.5)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    padding: "100px 0",
    textAlign: "center",
    backgroundBlendMode: "multiply",
  };

  return (
    <>
      <section className="hero-section" style={backgroundStyle}>
        <p className="article-topic">Topic: {singleArticle.topic}</p>
        <h1 className="article-title">{singleArticle.title}</h1>
        <p className="article-meta-info">
          Written by: {singleArticle.author} <br />{" "}
          {dateFormatter(singleArticle.created_at)}
        </p>
      </section>
      <article className="article-body-section">
        <p>{singleArticle.body}</p>
      </article>
    </>
  );
};

export default SingleArticle;
