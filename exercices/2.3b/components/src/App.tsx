import './App.css';
import UserCard from './UserCard';
import PageTitle from './PageTitle';
import Footer from './Footer';

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];

const App = () => {
  const title = "Welcome to My App";
  const footerText = "© 2023 My App";

  return (
    <div>
      <PageTitle title={title} />
      {users.map((user, index) => (
        <UserCard key={index} name={user.name} age={user.age} />
      ))}
      <Footer text={footerText} />
    </div>
  );
};

export default App;
