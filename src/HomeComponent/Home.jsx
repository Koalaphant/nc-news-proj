import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import { articleTextPreview, dateFormatter } from "../utils";
import { Link } from "react-router-dom";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((articles) => {
      const sixMostRecent = articles.slice(0, 6);

      setArticles(sixMostRecent);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p className="isLoading">Searching for your articles...</p>;
  }

  const votesFormat = (numOfVotes) => {
    let color = "purple";
    if (numOfVotes === 0) {
      color = "black";
    } else if (numOfVotes < 0) {
      color = "red";
    }

    return (
      <p>
        Votes: <span style={{ color: color }}>{numOfVotes}</span>
      </p>
    );
  };

  return (
    <>
      <h1>Most Recent Articles:</h1>
      <ul>
        {articles.map((article) => (
          <li className="articleCard" key={article.article_id}>
            <img src={article.article_img_url} alt={article.title} />
            <div className="meta-data-info">
              <h2>{article.title}</h2>
              <p className="body">{articleTextPreview(article.body)}</p>
              <div>{votesFormat(article.votes)}</div>
              <p>Date: {dateFormatter(article.created_at)}</p>
              <Link to={`/articles/${article.article_id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
