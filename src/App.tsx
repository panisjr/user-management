import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./LandingPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import { useState } from "react";
import { User} from "./types";
import { UserProvider } from "./UserProvider";
// const dummyUsers: User[] = [
//   {
//     firstname: "aamskie1",
//     lastname: "1",
//     email: "john_doe@gmail.com",
//     password: "12345",
//     date: "2024-03-30",
//   },
//   {
//     firstname: "rbamskie1",
//     lastname: "2",
//     email: "jane_smith#gmail.com",
//     password: "abcdef",
//     date: "2024-03-29",
//   },
//   {
//     firstname: "ramsdkie3",
//     lastname: "3",
//     email: "ramz_dev@gmail.com",
//     password: "devpassword",
//     date: "2024-03-28",
//   },
//   {
//     firstname: "ramafddskie",
//     lastname: "4",
//     email: "ramz_dev@gmail.com",
//     password: "devpassword",
//     date: "2024-03-25",
//   },
//   {
//     firstname: "qamskie",
//     lastname: "5",
//     email: "ramz_dev@gmail.com",
//     password: "devpassword",
//     date: "2024-03-26",
//   },
//   {
//     firstname: "ramskie",
//     lastname: "6",
//     email: "ramz_dev@gmail.com",
//     password: "devpassword",
//     date: "2024-03-27",
//   },
// ];
function App() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <UserProvider>
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
    </UserProvider>
  );
}

export default App;
