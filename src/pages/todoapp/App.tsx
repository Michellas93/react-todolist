import { useEffect, useState } from "react";
import AddToDo from "../../components/AddToDo";
import Navbar from "../../components/Navbar";
import Todo from "../../components/todo/Todo";
import useTodos from "../../hooks/useTodos";
import { TodoApi } from "../../components/todo/todo.interface";
import { useNavigate } from "react-router-dom";

const App = () => {
	const navigate = useNavigate();
	const { data, loading, error } = useTodos();
	const [todos, setTodos] = useState<TodoApi[]>();
	useEffect(() => {
		if (!loading && !error) {
			setTodos(data?.todos);
		}
	}, [data, loading, error]);

	if (error) navigate("/error");
	if (loading) return <p>Loading...</p>;

	return (
		<div className="flex flex-col min-h-screen justify-center items-center ">
			<Navbar />
			<div className="w-1/2 min-w-[300px] rounded-md border-[1px] border-gray-400 max-h-[600px] ">
				<div className="bg-gray-200 w-full p-3">
					{/* todo: nahradit realnyma datama */}
					<h2 className="text-2xl font-semibold">Todos({todos?.length})</h2>
				</div>
				<div className="py-4 px-8">
					<AddToDo setTodos={setTodos} />
					{/* & ukazuje na sebe sama zobak ukazuje hned nasledujici deti * jaky koliv element nth-child jak ykoli lichy element */}
					<div className="[&>*:nth-child(odd)]:bg-gray-100 mt-5 max-h-[400px] overflow-auto">
						{todos?.map((item) => (
							<Todo
								id={item.id}
								key={item.id}
								name={item.todo}
								completed={item.completed}
								setTodos={setTodos}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
