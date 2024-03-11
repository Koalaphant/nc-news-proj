import { useEffect, useState } from "react";
import { dateFormatter, articleTextPreview } from "../utils";
import { fetchArticles } from "../api";
import "./articles.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((fetchedArticles) => {
      setArticles(fetchedArticles);
      setIsLoading(false);
    });
  }, []);

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
            <li className="articleCard" key={article.id}>
              <img src={article.article_img_url} alt={article.title} />
              <div className="meta-data-info">
                <h2>{article.title}</h2>
                <p className="body">{articleTextPreview(article.body)}</p>
                <p>Date: {dateFormatter(article.created_at)}</p>
                <button>Read More</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Articles;
