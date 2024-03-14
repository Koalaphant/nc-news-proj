import axios from "axios";

const itemsApi = axios.create({
  baseURL: "https://nc-news-nxya.onrender.com/api",
});

export const fetchArticles = (topic, sortBy, order) => {
  let url = "/articles";

  if (topic) {
    url += `?topic=${topic}`;
  }

  if (sortBy && order) {
    url += `${topic ? "&" : "?"}sort_by=${sortBy}&order=${order}`;
  }

  return itemsApi.get(url).then((response) => {
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
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteComment = (comment_id) => {
  return itemsApi.delete(`/comments/${comment_id}`);
};

export const fetchTopics = () => {
  return itemsApi.get("/topics").then((response) => {
    return response.data.topics;
  });
};

export const voteArticle = (article_id, vote) => {
  return itemsApi.patch(`/articles/${article_id}`, { inc_votes: vote });
};
