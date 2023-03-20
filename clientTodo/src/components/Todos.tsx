import React from "react";
import { TTodo } from "../types";
import AddTodoItem from "./AddTodoItem";
import TodoItem from "./TodoItem";

type Props = {
  todos: TTodo[];
  userAt: string;
  toggleComplete: (todo: TTodo) => void;
  addTodo: (todo: TTodo) => void;
  setAddModalOpen: (value: boolean) => void;
  setConfirmModalOpen: (value: boolean) => void;
  setTodoToDelete: (todo: TTodo) => void;
  editTodo: (todo: TTodo) => void;
};

const Todos = (props: Props) => {
  return (
    <div className="flex flex-col md:grid md:grid-flow-row lg:grid-cols-5 md:grid-cols-3">
      {props.todos.map((todo) => (
        <TodoItem
          toggleComplete={props.toggleComplete}
          userAt={props.userAt}
          todo={todo}
          key={todo.id}
          setModalOpen={props.setConfirmModalOpen}
          setTodoToDelete={props.setTodoToDelete}
          editTodo={props.editTodo}
        />
      ))}
      <AddTodoItem
        userAt={props.userAt}
        addTodo={props.addTodo}
        setIsOpen={props.setAddModalOpen}
      />
    </div>
  );
};

export default Todos;
