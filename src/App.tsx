import React, {ChangeEvent, FormEvent, useState} from 'react';
import './App.css';
import {nanoid} from "nanoid";

type ToDo = {
    id: string;
    value: string;
    checked: boolean;
}

enum Filters {
    ALL = "All",
    DONE = "Done",
    UNDONE = "Undone"
}

function App() {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState(Filters.ALL);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const todo = {
            id: nanoid(),
            value: inputValue,
            checked: false
        }
        setTodos([...todos, todo]);
        console.log(todos)
        setInputValue("");
    }

    function getFiltered() {
        if (filter === Filters.DONE) {
            return todos.filter(todo => todo.checked);
        }
        else if (filter === Filters.UNDONE) {
            return todos.filter(todo => !todo.checked);
        }
        else return todos;
    }

    function handleCheck(id: string, event: ChangeEvent<HTMLInputElement>) {
        let temp = todos.slice();
        temp.forEach(todo => {
            if (todo.id === id) {
                todo.checked = event.target.checked;
            }
        });
        setTodos(temp);
    }

    function handleDelete(id: string) {
        setTodos(todos.filter(todo => todo.id !== id));
    }
  return (
    <div className="App">
      <h1>TODO LIST</h1>
        <form onSubmit={submitHandler}>
            <input value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
            <button>Add</button><br/>
        </form>
        <label>
            <input
                type="radio"
                name={"filter"}
                id={"filterAll"}
                defaultChecked
                onChange={() => setFilter(Filters.ALL)}
            />
            All
        </label>
        <label>
            <input type="radio" name={"filter"} id={"filterDone"} onChange={() => setFilter(Filters.DONE)}/>
            Done
        </label>
        <label>
            <input
                type="radio"
                name={"filter"}
                id={"filterIncomplete"}
                onChange={() => setFilter(Filters.UNDONE)}

            />
            Incomplete
        </label>
        <br/>
        <ul style={{listStyle: "none"}}>
            {getFiltered().map(todo =>
                <li>
                    <input type="checkbox" checked={todo.checked} onChange={(e) => handleCheck(todo.id, e)}/>
                    {todo.value}
                    <button onClick={() => handleDelete(todo.id)}>X</button>
                </li>)}
        </ul>
    </div>
  );
}

export default App;
