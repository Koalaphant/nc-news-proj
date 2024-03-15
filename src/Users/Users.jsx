import { useContext, useEffect, useState } from "react";
import { fetchUsers } from "../api";
import "./users.css";
import UserContext from "../Contexts/User";

const Users = () => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    fetchUsers().then((users) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading Users...</p>;
  }

  return (
    <div className="container">
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.username} className="user-card">
            <img src={user.avatar_url} alt="user-avatar" />
            <p className="name">{user.name}</p>
            <p className="username">{user.username}</p>
            <button
              className="standard-btn"
              onClick={() => setLoggedInUser(user)}
            >
              Log In
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
