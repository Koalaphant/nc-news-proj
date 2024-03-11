import "./App.css";
import Articles from "./Articles/Articles";
import Header from "./Header/header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </>
  );
}

export default App;
