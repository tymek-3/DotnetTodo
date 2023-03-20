import { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "../axios";
import Input from "../components/Input";
import PageTitle from "../components/PageTitle";

type Props = {
  setUserAt: React.Dispatch<React.SetStateAction<string>>;
  isLogedIn: boolean;
};

const LoginPage = (props: Props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [erorMessage, setErorMessage] = useState<string>(
    "Something went wrong"
  );

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setIsError(false);
    try {
      const res = await axios({
        url: "users/login",
        method: "POST",
        data: {
          username,
          password,
        },
      });
      const data = res.data;
      props.setUserAt(data);
      navigate("/");
    } catch (error) {
      const err = error as AxiosError;
      setIsError(true);
      if (err.response?.status === 400) {
        setErorMessage("Incorrect credentials");
        setIsLoading(false);
        return;
      }
      // console.error(err);
    }
    setIsLoading(false);
  };

  if (props.isLogedIn) return <Navigate to={"/"} replace={true} />;

  return (
    <main className="">
      <PageTitle title="Login" />
      <form
        className="flex flex-col items-center gap-y-3"
        onSubmit={handleSubmit}
      >
        <Input placeholder="Username" setValue={setUsername} value={username} />
        <Input
          placeholder="Password"
          setValue={setPassword}
          type="password"
          value={password}
        />
        <p className={`text-red-500 ${!isError && "invisible"} my-0 py-0`}>
          {erorMessage}
        </p>
        <button className="text-2xl border border-black py-2 px-4 w-min hover:bg-zinc-100 active:bg-zinc-300">
          {isLoading ? "..." : "Login"}
        </button>
        <Link to="/register">Don't have an account? Register here</Link>
      </form>
    </main>
  );
};

export default LoginPage;
