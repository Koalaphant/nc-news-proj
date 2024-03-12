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

export const fetchCommentById = (article_id) => {
  return itemsApi.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.comments;
  });
};

export const fetchUsers = () => {
  return itemsApi.get(`/users`).then((response) => {
    return response.data.users;
  });
};

export const postComment = (comment, article_id) => {
  return itemsApi
    .post(`/articles/${article_id}/comments`, comment)
    .then((response) => {
      response.data.comment;
    });
};
