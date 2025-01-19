import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    axios.get("https://dummyapi-node.onrender.com/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div className="container">
      <h1>User Directory</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />
      <button className="sortButton"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <div className="userGrid">
        {filteredUsers.map((user) => (
          <div className="userCard" key={user.id} onClick={() => setSelectedUser(user)}>
            <img
            className="userImage"
              src={user.profile_picture}
              alt={user.name}
              width="50"
              height="50"
            />
            <p>{user.name}</p>
          </div>
        ))}
      </div>
      {selectedUser && (
        <div className="selectedUser">
          <img src={selectedUser.profile_picture} alt={selectedUser.name} className="selectedImage" />
          <h2>{selectedUser.name}</h2>
          <p>Website: {selectedUser.website}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Phone: {selectedUser.phone}</p>
        </div>
      )}
    </div>
  );
};

export default App;
