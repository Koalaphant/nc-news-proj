import { useEffect, useState } from "react";
import { dateFormatter, articleTextPreview } from "../utils";
import { fetchArticles } from "../api";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "./articles.css";

const Articles = () => {
  const { topic_name } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchArticles(topic_name).then((fetchedArticles) => {
      setArticles(fetchedArticles);
      setIsLoading(false);
    });
  }, [topic_name]);

  const handleSortByChange = (event) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);
    setIsLoading(true);
    fetchArticles(topic_name, selectedSortBy, sortOrder).then(
      (fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      }
    );
  };

  const handleSortOrderChange = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder);
    setIsLoading(true);
    fetchArticles(topic_name, sortBy, selectedSortOrder).then(
      (fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      }
    );
  };

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

  if (isLoading) {
    return <p className="isLoading">Searching for your articles...</p>;
  }

  if (articles.length === 0) {
    return <p className="isLoading">No articles found</p>;
  }

  return (
    <>
      <section className="container">
        <div className="sort-dropdown">
          <select value={sortBy} onChange={handleSortByChange}>
            <option value="created_at">Sort by Date</option>
            <option value="comment_count">Sort by Comment Count</option>
            <option value="votes">Sort by Votes</option>
          </select>
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
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
      </section>
    </>
  );
};

export default Articles;
