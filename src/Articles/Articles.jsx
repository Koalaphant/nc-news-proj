import { useEffect, useState } from "react";
import { dateFormatter, articleTextPreview } from "../utils";
import { fetchArticles } from "../api";
import { Link, useParams } from "react-router-dom";
import "./articles.css";

const Articles = () => {
  const { topic_name } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles(topic_name).then((fetchedArticles) => {
      setArticles(fetchedArticles);
      setIsLoading(false);
    });
  }, [topic_name]);

  if (isLoading) {
    return <p className="isLoading">Searching for your articles...</p>;
  }

  if (articles.length === 0) {
    return <p className="isLoading">No articles found</p>;
  }

  return (
    <>
      <section className="container">
        <ul>
          {articles.map((article) => (
            <li className="articleCard" key={article.article_id}>
              <img src={article.article_img_url} alt={article.title} />
              <div className="meta-data-info">
                <h2>{article.title}</h2>
                <p className="body">{articleTextPreview(article.body)}</p>
                <p>Date: {dateFormatter(article.created_at)}</p>
                <Link to={`/articles/${article.article_id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Articles;
