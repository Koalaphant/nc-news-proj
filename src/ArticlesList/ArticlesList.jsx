import ArticleCard from "../ArticleCard/ArticleCard";

const ArticlesList = ({ articles }) => {
  return (
    <>
      <div>
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </>
  );
};

export default ArticlesList;
