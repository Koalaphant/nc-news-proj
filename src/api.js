import axios from "axios";

const itemsApi = axios.create({
  baseURL: "https://nc-news-nxya.onrender.com/api",
});

export const fetchArticles = () => {
  return itemsApi.get("/articles").then((response) => {
    return response.data.articles;
  });
};
