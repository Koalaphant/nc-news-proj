import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticlesByTopic } from "../api";
import { articleTextPreview, dateFormatter } from "../utils";

const ArticlesByTopic = () => {
  const { topic_name } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticlesByTopic(topic_name).then((articles) => {
      setArticles(articles);
    });
  }, []);

  return (
    <section className="container">
      <ul>
        {articles.map((article) => {
          return (
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
          );
        })}
      </ul>
    </section>
  );
};

export default ArticlesByTopic;
