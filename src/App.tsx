import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./LandingPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import { useState } from "react";
import { User } from "./types";
const dummyUsers: User[] = [
  {
    firstname: "ramskie",
    lastname: "panis",
    email: "john_doe@gmail.com",
    password: "12345",
    date: "2024-03-30",
  },
  {
    firstname: "ramskie",
    lastname: "panis",
    email: "jane_smith#gmail.com",
    password: "abcdef",
    date: "2024-03-29",
  },
  {
    firstname: "ramskie",
    lastname: "panis",
    email: "ramz_dev@gmail.com",
    password: "devpassword",
    date: "2024-03-28",
  },
  {
    firstname: "ramskie",
    lastname: "panis",
    email: "ramz_dev@gmail.com",
    password: "devpassword",
    date: "2024-03-28",
  },
  {
    firstname: "ramskie",
    lastname: "panis",
    email: "ramz_dev@gmail.com",
    password: "devpassword",
    date: "2024-03-28",
  },
  {
    firstname: "ramskie",
    lastname: "panis",
    email: "ramz_dev@gmail.com",
    password: "devpassword",
    date: "2024-03-28",
  },
];
function App() {
  const [users, setUsers] = useState<User[]>(dummyUsers);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/signIn"
            element={<SignIn users={users} setUsers={setUsers} />}
          />
          <Route
            path="/signUp"
            element={<SignUp users={users} setUsers={setUsers} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard users={users} setUsers={setUsers} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
