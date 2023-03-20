import { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../axios";
import Input from "../components/Input";
import PageTitle from "../components/PageTitle";

type Props = {
  setUserAt: React.Dispatch<React.SetStateAction<string>>;
  isLogedIn: boolean;
};

const RegisterPage = (props: Props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [erorMessage, setErorMessage] = useState<string>(
    "Something went wrong"
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios({
        url: "users/register",
        method: "post",
        data: {
          username,
          password,
        },
      });
      const data = res.data;
      props.setUserAt(data);
    } catch (error) {
      const err = error as AxiosError;
      setIsError(true);
      setErorMessage(err.message);
      console.error(err);
    }
    setIsLoading(false);
  };

  if (props.isLogedIn) return <Navigate to={"/"} replace={true} />;

  return (
    <main>
      <PageTitle title="Register" />
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
          Register
        </button>
        <Link to="/login">Already have an account? Login here</Link>
      </form>
    </main>
  );
};

export default RegisterPage;
