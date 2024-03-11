import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import ArticlesList from "../ArticlesList/ArticlesList";
import "./articles.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);

  return (
    <>
      <h1>Articles</h1>
      <ArticlesList articles={articles} />
    </>
  );
};

export default Articles;
