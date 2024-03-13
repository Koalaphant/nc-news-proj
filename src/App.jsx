import "./App.css";
import Articles from "./Articles/Articles";
import SingleArticle from "./SingleArticle/SingleArticle";
import Header from "./Header/header";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./Contexts/User";
import Users from "./Users/Users";
import Topics from "./Topics/Topics";
import ArticlesByTopic from "./ArticlesByTopic/ArticlesByTopic";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "Guest",
    name: "Guest",
    avatar_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
  });

  return (
    <UserContext.Provider
      value={{ loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser }}
    >
      <Header />
      <Routes>
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/users" element={<Users />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topic_name" element={<ArticlesByTopic />}></Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
