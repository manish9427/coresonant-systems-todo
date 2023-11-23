import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((res) => res.json())
      .then((data) =>
        setTodos(
          data.map((todo, index) => ({
            ...todo,
            id: index + 1,
            editing: false,
          }))
        )
      );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        title: newTodo,
        completed: false,
        editing: false,
      },
    ]);
    setNewTodo("");
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const editTodo = (index, value) => {
    const updatedTodos = [...todos];
    updatedTodos[index].title = value;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const toggleEditing = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].editing = !updatedTodos[index].editing;
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button type="submit">Add Todo</button>
      </form>
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      {todos
        .filter((todo) => {
          if (filter === "all") {
            return true;
          }
          if (filter === "active" && !todo.completed) {
            return true;
          }
          if (filter === "completed" && todo.completed) {
            return true;
          }
          return false;
        })
        .map((todo, index) => (
          <div key={index}>
            <p>ID: {todo.id}</p>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            {todo.editing ? (
              <input
                value={todo.title}
                onChange={(e) => editTodo(index, e.target.value)}
              />
            ) : (
              <span
                style={{ textDecoration: todo.completed ? "line-through" : "" }}
              >
                {todo.title}
              </span>
            )}
            <button onClick={() => toggleEditing(index)}>
              {todo.editing ? "Save" : "Edit"}
            </button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </div>
        ))}
    </div>
  );
}

export default App;
