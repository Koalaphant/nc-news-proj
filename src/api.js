import axios from "axios";

const itemsApi = axios.create({
  baseURL: "https://nc-news-nxya.onrender.com/api",
});

export const fetchArticles = () => {
  return itemsApi.get("/articles").then((response) => {
    return response.data.articles;
  });
};

export const fetchArticleById = (article_id) => {
  return itemsApi.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
};
