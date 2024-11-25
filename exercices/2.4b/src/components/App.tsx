import { useState } from "react";
import "./App.css";
import "./UserCard.css";
import UserCard from "./UserCard";
import { User } from "../types";

function App() {
  const [count, setCount] = useState(0);

  const userCards: User[] = [
    { name: "John Doe", age: 25, isOnline: true },
    { name: "Jane Smith", age: 30, isOnline: false },
    { name: "Bob Johnson", age: 40, isOnline: true },
  ];

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {userCards.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </>
  );
}

export default App;
