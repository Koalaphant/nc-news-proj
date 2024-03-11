import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <h1>
          <Link to="/">NC News</Link>
        </h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Topics</li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          <li>Logged in as:</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
