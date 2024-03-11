import { dateFormatter, articleTextPreview } from "../utils.js";
import "./articlecard.css";

const ArticleCard = ({ article }) => {
  console.log(article);
  return (
    <>
      <div className="container">
        <div className="articleCard">
          <div className="img-section">
            <img src={article.article_img_url} alt="" />
          </div>
          <div className="article-info-section">
            <h2>{article.title}</h2>
            <div className="meta-data">
              <p className="body">{articleTextPreview(article.body)}</p>
              <p>By: {article.author}</p>
              <p>Date: {dateFormatter("2020-03-09T21:21:00.000Z")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;
