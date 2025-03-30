import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./LandingPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import { useState } from "react";
import { User } from "./types";
// const dummyUsers: User[] = [
//   { username: "john_doe", password: "12345", date: "2024-03-30" },
//   { username: "jane_smith", password: "abcdef", date: "2024-03-29" },
//   { username: "ramz_dev", password: "devpassword", date: "2024-03-28" },
// ];
function App() {
  const [users, setUsers] = useState<User[]>([]);

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
