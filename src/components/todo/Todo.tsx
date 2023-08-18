import { useEffect, useState } from "react";
import { TodoApi } from "./todo.interface";

interface Props {
  id: number;
  name: string;
  completed: boolean;
  setTodos: React.Dispatch<React.SetStateAction<TodoApi[] | undefined>>;
}

export const Todo = ({ id, name, completed, setTodos }: Props) => {
  const [checked, setChecked] = useState(completed);
  const [isEdited, setEdited] = useState(false);
  const [editedText, setEditedText] = useState(name);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (editedText == "" && !error) {
      setError(true);
    } else if (editedText != "") {
      setError(false);
    }
  }, [editedText, error]);

  const handleDelete = () => {
    // ukazuje nam co je v tom useState, ma 2 typy bud todoapi jako pole nebo undefined a my potrebujeme aby to bralo jako api.
    // filter = smaze jen takovy predmet ktery ma id stejny jako v props vse ostatni tam necha
    setTodos((prev) =>
      [...(prev as TodoApi[])].filter((item) => item.id != id)
    );
  };

  const handleEdit = () => {
    if (editedText == "") {
      setError(true);
      return;
    }
    setTodos((prev) => {
      const p = prev as TodoApi[];
      return p.map((todo) => {
        if (todo.id == id) {
          todo.todo = editedText;
        }
        return todo;
      });
    });
    setEdited(false);
  };
  const handleCancel = () => {
    setEdited(false);
    // setEditedText davame na puvodni
    setEditedText(name);
  };

  return (
    <div className="flex justify-between p-5 border-[1px] border-gray-300 gap-8">
      <div className="flex gap-4 items-center w-full">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {isEdited ? (
          <textarea
            placeholder={error ? "Todo text can not be empty" : ""}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className={`w-full p-1 border-[1px] ${
              error ? " border-red-500 placeholder-red-500" : "border-gray-400"
            }`}
          />
        ) : (
          <p>{name}</p>
        )}
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => (isEdited ? handleEdit() : setEdited(true))}
          className={`rounded-md px-5 py-2 text-white  bg-green-500  ${
            error ? "bg-opacity-50 cursor-not-allowed" : " hover:bg-green-600 "
          }`}
        >
          {isEdited ? "Done" : "Edit"}
        </button>
        <button
          onClick={() => (isEdited ? handleCancel() : handleDelete())}
          className={`bg-red-500 rounded-md px-5 py-2 text-white hover:bg-red-600`}
        >
          {isEdited ? "Cancel" : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default Todo;
