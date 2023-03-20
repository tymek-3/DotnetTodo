import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  isRouteErrorResponse,
  Route,
  Routes,
  UNSAFE_DataRouterStateContext,
} from "react-router-dom";
import axios from "./axios";
import AddTodoModal from "./components/AddTodoModal";
import Navbar from "./components/Navbar";
import { auth } from "./helpers";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { TUser } from "./types";

const App = () => {
  const [userAt, setUserAt] = useState<string>(
    localStorage.getItem("userAt") || ""
  );
  const [user, setUser] = useState<TUser | undefined>();
  const isLogedIn = user !== undefined;

  useEffect(() => {
    if (!isLogedIn && userAt.length > 0) {
      getUserData();
    }
  }, [userAt]);

  const getUserData = async () => {
    try {
      const res = await axios({
        url: "/users/me",
        method: "GET",
        headers: auth(userAt),
      });
      setUser(await res.data);
      localStorage.setItem("userAt", userAt);
    } catch (error) {
      const err = error as AxiosError;
      // console.error(err);
      setUser(undefined);
      if (err.response!.status === 401) {
        setUserAt("");
      }
    }
  };

  const logout = () => {
    setUser(undefined);
    setUserAt("");
    localStorage.removeItem("userAt");
  };

  return (
    <>
      <h1>{user?.username}</h1>

      <Navbar isLogedIn={isLogedIn} logout={logout} />
      <Routes>
        <Route
          path="/"
          element={<HomePage isLogedIn={isLogedIn} userAt={userAt} />}
        />
        <Route
          path="/login"
          element={<LoginPage setUserAt={setUserAt} isLogedIn={isLogedIn} />}
        />
        <Route
          path="/register"
          element={<RegisterPage setUserAt={setUserAt} isLogedIn={isLogedIn} />}
        />
      </Routes>
    </>
  );
};

export default App;
