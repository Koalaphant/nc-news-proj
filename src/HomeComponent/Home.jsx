import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import { articleTextPreview, dateFormatter } from "../utils";
import { Link } from "react-router-dom";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((articles) => {
      const sixMostRecent = articles.slice(0, 9);

      setArticles(sixMostRecent);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p className="isLoading">Searching for your articles...</p>;
  }

  return (
    <>
      <section className="container">
        <h1 className="page-header">Recent Articles</h1>

        <ul className="article-card-container">
          {articles.map((article) => (
            <li className="articleCard" key={article.article_id}>
              <Link to={`/articles/${article.article_id}`}>
                <img
                  className="article-preview-img"
                  src={article.article_img_url}
                  alt={article.title}
                />
              </Link>
              <div className="meta-data-info">
                <p className="article-topic">{article.topic}</p>
                <p className="article-date">
                  Date: {dateFormatter(article.created_at)}
                </p>
                <h2>{article.title}</h2>
                <p className="body">{articleTextPreview(article.body)}</p>
                <p>Votes: {article.votes}</p>
                <Link to={`/articles/${article.article_id}`}>
                  <button className="read-more-btn">Read More</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Home;
