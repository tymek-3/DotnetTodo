import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import AddTodoModal from "../components/AddTodoModal";
import BaseModal from "../components/BaseModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Todos from "../components/Todos";
import { auth } from "../helpers";
import { TTodo } from "../types";

type Props = {
  isLogedIn: boolean;
  userAt: string;
};

const HomePage = (props: Props) => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [addTodoModalOpen, setAddTodoModalOpen] = useState<boolean>(false);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] =
    useState<boolean>(false);
  const [todoToDelete, setTodoToDelete] = useState<TTodo | undefined>();

  useEffect(() => {
    if (props.isLogedIn) getTodos();
  }, [props.isLogedIn]);

  const getTodos = async () => {
    try {
      const res = await axios({
        url: "todos",
        method: "GET",
        headers: auth(props.userAt),
      });
      const data = res.data;
      setTodos(data);
    } catch (error) {
      const err = error as AxiosError;
      // console.error(err);
    }
  };

  const toggleComplete = (todo: TTodo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo))
    );
  };

  const addTodo = (todo: TTodo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const editTodo = (todo: TTodo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo))
    );
  };

  const deleteTodo = (todoId: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== todoId));
  };

  if (!props.isLogedIn)
    return <Link to="/login">You are not loged in. Click here to login</Link>;

  return (
    <main>
      <AddTodoModal
        isOpen={addTodoModalOpen}
        setIsOpen={(value: boolean) => setAddTodoModalOpen(value)}
        addTodo={addTodo}
        userAt={props.userAt}
      />
      <ConfirmDeleteModal
        isOpen={confirmDeleteModalOpen}
        setIsOpen={(value: boolean) => setConfirmDeleteModalOpen(value)}
        todo={todoToDelete}
        userAt={props.userAt}
        deleteTodo={deleteTodo}
      />
      <Todos
        toggleComplete={toggleComplete}
        todos={todos}
        userAt={props.userAt}
        addTodo={addTodo}
        setAddModalOpen={(value: boolean) => setAddTodoModalOpen(value)}
        setConfirmModalOpen={(value: boolean) =>
          setConfirmDeleteModalOpen(value)
        }
        setTodoToDelete={(value: TTodo) => setTodoToDelete(value)}
        editTodo={editTodo}
      />
    </main>
  );
};

export default HomePage;
