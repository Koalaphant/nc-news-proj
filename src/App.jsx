import "./App.css";
import Articles from "./Articles/Articles";
import SingleArticle from "./SingleArticle/SingleArticle";
import Header from "./Header/header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </>
  );
}

export default App;
