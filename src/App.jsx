import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const API = "http://localhost:8080/api/users";

  const getUsers = () => {
    fetch(API + "/all")
      .then(res => res.json())
      .then(data => setUsers(data));
  };

  const addUser = () => {
    fetch(API + "/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    })
      .then(res => res.json())
      .then(() => {
        setName("");
        setEmail("");
        getUsers();
      });
  };

  const deleteUser = (id) => {
    fetch(API + "/delete/" + id, {
      method: "DELETE"
    }).then(() => getUsers());
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <h1>✨ User details</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={addUser}>Add User</button>
      </div>

      <div className="list">
        {users.map(user => (
          <div className="card" key={user.id}>
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>

            <button onClick={() => deleteUser(user.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;