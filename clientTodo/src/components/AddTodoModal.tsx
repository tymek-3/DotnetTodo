import React, { BlockquoteHTMLAttributes, FormEvent, useState } from "react";
import ReactDOM from "react-dom";
import axios from "../axios";
import { TTodo } from "../types";
import { auth } from "../helpers";
import BaseModal from "./BaseModal";

type Props = {
  isOpen: boolean;
  userAt: string;
  setIsOpen: (value: boolean) => void;
  addTodo: (todo: TTodo) => void;
};

const AddTodoModal = (props: Props) => {
  const [titleInput, setTitleInput] = useState<string>("");

  const closeModal = () => props.setIsOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (titleInput.length > 0) {
      const res = await axios({
        url: "todos",
        method: "POST",
        data: {
          title: titleInput,
        },
        headers: auth(props.userAt),
      });
      const newTodo = res.data;
      props.addTodo(newTodo);
    }
    setTitleInput("");
    closeModal();
  };

  return (
    <BaseModal isOpen={props.isOpen}>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Todo title"
          className="border border-black indent-1"
          onChange={(e) => setTitleInput(e.target.value)}
          value={titleInput}
        />
        <button>Add Todo</button>
      </form>
      <button onClick={closeModal}>Close</button>
    </BaseModal>
  );
};

export default AddTodoModal;
