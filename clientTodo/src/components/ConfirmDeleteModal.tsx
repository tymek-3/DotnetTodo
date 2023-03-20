import React from "react";
import ReactDOM from "react-dom";
import axios from "../axios";
import { auth } from "../helpers";
import { TTodo } from "../types";
import BaseModal from "./BaseModal";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  todo: TTodo | undefined;
  userAt: string;
  deleteTodo: (todoId: string) => void;
};

const ConfirmDeleteModal = (props: Props) => {
  const handleDelete = async (e: any) => {
    console.log("got here");
    if (props.todo === undefined) {
      console.log(props.todo);
      return;
    }
    try {
      axios({
        url: `todos/${props.todo.id}`,
        method: "DELETE",
        headers: auth(props.userAt),
      });
      props.setIsOpen(false);
      props.deleteTodo(props.todo.id);
    } catch (err) {}
  };

  return (
    <BaseModal
      isOpen={props.isOpen}
      styles="h-24 flex flex-col items-center justify-center"
    >
      <h3>Are you sure you want to delete this todo?</h3>
      <div>
        <button
          className="border border-black border-r-0 px-3 py-1 rounded-md rounded-r-none"
          onClick={() => props.setIsOpen(false)}
        >
          Cancel
        </button>
        <button
          className="text-red-600 border border-black px-3 py-1 rounded-md rounded-l-none"
          onClick={handleDelete}
        >
          Confirm
        </button>
      </div>
    </BaseModal>
  );
};

export default ConfirmDeleteModal;
