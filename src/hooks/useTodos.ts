import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios"; //zmena
import { TodoApi as Todo } from "../components/todo/todo.interface";

interface TodoData {
	todos: Todo[];
	total: number;
	skip: number;
	limit: number;
}

export const useTodos = () => {
	const [data, setData] = useState<TodoData>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<AxiosError>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get("https://dummyjson.com/todos");
				// at se k tomu chova jako todo data proto as
				setData(res.data as TodoData);
				setLoading(false);
			} catch (e) {
				setError(e as AxiosError);
			}
		};
		fetchData();
	}, []);
	return { data, loading, error };
};

export default useTodos;
