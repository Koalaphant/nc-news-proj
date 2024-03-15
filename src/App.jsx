import "./App.css";
import Articles from "./Articles/Articles";
import SingleArticle from "./SingleArticle/SingleArticle";
import Header from "./Header/header";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./Contexts/User";
import Users from "./Users/Users";
import Topics from "./Topics/Topics";
import NoMatch from "./ErrorHandling/NoMatch";
import Home from "./HomeComponent/Home";

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
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/users" element={<Users />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topic_name" element={<Articles />}></Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
