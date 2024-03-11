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
    backgroundImage: `url(${singleArticle.article_img_url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    padding: "100px 0",
    textAlign: "center",
  };

  return (
    <>
      <section className="hero-section" style={backgroundStyle}>
        <h1 className="article-title">{singleArticle.title}</h1>
        <p>
          Written by: {singleArticle.author} ||{" "}
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
