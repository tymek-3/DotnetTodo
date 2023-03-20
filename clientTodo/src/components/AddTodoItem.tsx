import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "../axios";
import { TTodo } from "../types";
import AddTodoModal from "./AddTodoModal";

type Props = {
  userAt: string;
  addTodo: (todo: TTodo) => void;
  setIsOpen: (value: boolean) => void;
};

const AddTodoItem = (props: Props) => {
  return (
    <>
      <button
        className={`p-2 my-1 mx-2 border border-zinc-500`}
        onClick={() => {
          props.setIsOpen(true);
        }}
      >
        Add Todo
      </button>
    </>
  );
};

export default AddTodoItem;
