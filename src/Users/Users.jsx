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
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.username} className="user-card">
          <img src={user.avatar_url} alt="user-avatar" />
          <p className="username">{user.username}</p>
          <p>{user.name}</p>
          <button onClick={() => setLoggedInUser(user)}>Log In</button>
        </li>
      ))}
    </ul>
  );
};

export default Users;
