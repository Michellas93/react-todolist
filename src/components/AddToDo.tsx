import { useEffect, useState } from "react";
import { TodoApi } from "./todo/todo.interface";

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<TodoApi[] | undefined>>;
}

const AddToDo = ({ setTodos }: Props) => {
  // nepouzivame useState <string> protoze nechceme undefined ale misto toho prazdny string
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    // to nam dela, ze pokud tam ten error je  a neco do inputu napiseme, tak zmizi.
    if (error && text != "") {
      setError(false);
    }
  }, [text, error]);

  const handleSubmit = () => {
    if (text == "") {
      setError(true);
      return;
    }
    setTodos((prev) => [
      ...(prev as TodoApi[]),
      {
        completed: false,
        todo: text,
        //  id yacinaji od 1 a postupne se zvedaji proto je nastavime na delku pole + 1
        id: [...(prev as TodoApi[])].length + 1,
        // nepracujeme s tim
        userId: 0,
      },
    ]);
  };

  return (
    <div className="flex items-end w-full">
      <div className="flex flex-col items-start w-full">
        <label className="text-sm text-red-500">
          {error && "Text of todo can not be empty"}
        </label>

        <input
          // do value se da useState a na onChange se zapise to value

          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="todo-text"
          type="text"
          className={`rounded-l-md w-full py-2 px-1 border-[1px] border-gray-400 h-10 ${
            error ? "border-red-500" : "border-gray-400"
          }`}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white rounded-r-md px-2 h-10 w-32 md:w-24 hover:bg-blue-600"
      >
        Add todo
      </button>
    </div>
  );
};

export default AddToDo;
