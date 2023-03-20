import { AxiosError } from "axios";
import React, {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useState,
} from "react";
import axios from "../axios";
import { auth } from "../helpers";
import { TTodo } from "../types";
import { RiDeleteBin6Fill, RiPencilFill } from "react-icons/ri";

type Props = {
  todo: TTodo;
  userAt: string;
  toggleComplete: (todo: TTodo) => void;
  setModalOpen: (value: boolean) => void;
  setTodoToDelete: (todo: TTodo) => void;
  editTodo: (todo: TTodo) => void;
};

const TodoItem = (props: Props) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>(props.todo.title);

  const handleClick = async () => {
    try {
      const res = await axios({
        url: `todos/${props.todo.id}/toggle-complete`,
        method: "PATCH",
        headers: auth(props.userAt),
      });
      props.toggleComplete(res.data);
    } catch (e) {
      // console.error(e as AxiosError);
    }
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    props.setTodoToDelete(props.todo);
    props.setModalOpen(true);
  };

  const handleEdit = (e: any) => {
    e.stopPropagation();
    setEditing((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputTitle === "") return;
    try {
      const res = await axios({
        url: `todos/${props.todo.id}`,
        method: "PATCH",
        headers: auth(props.userAt),
        data: {
          title: inputTitle,
        },
      });
      const editedTodo = res.data;
      props.editTodo(editedTodo);
      setEditing(false);
    } catch (e) {}
  };

  return (
    <div
      className={`p-2 my-1 mx-2 border border-zinc-500 flex justify-center cursor-pointer relative group`}
      tabIndex={0}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <h3
          className={`${
            props.todo.isCompleted && "line-through text-zinc-500"
          } text-xl`}
        >
          {editing ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="text-center border-b border-black w-fit"
              />
            </form>
          ) : (
            props.todo.title
          )}
        </h3>
        <h4 className="text-xs text-slate-500">
          {new Date(props.todo.createdAt).toLocaleString("pl-PL")}
        </h4>
      </div>
      <div className="flex-col right-5 absolute hidden group-hover:flex">
        <button onClick={handleDelete} className="hover:text-red-700">
          <RiDeleteBin6Fill size={20} />
        </button>
        <button onClick={handleEdit} className="hover:text-blue-600">
          <RiPencilFill size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
