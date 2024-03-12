import "./header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../Contexts/User";

const Header = () => {
  const { loggedInUser } = useContext(UserContext);

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
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>Logged in as: {loggedInUser.username}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
