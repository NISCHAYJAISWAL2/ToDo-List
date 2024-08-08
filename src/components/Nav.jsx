import React, { useState, useEffect } from "react";
import "./style.css";
import emptyImage from "./empty.svg";

let val = 1;
const Nav = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        { id: val, name: inputValue.trim(), status: "pending" },
        ...todos,
      ]);
      setInputValue("");
    }
    val = val + 1;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const updateStatus = (index) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === index
        ? { ...todo,
            status: todo.status === "pending" ? "completed" : "pending",
          }
        : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, idx) => idx !== index);
    setTodos(updatedTodos);
  };

  const handleFilterClick = (newFilter) => {
    setFilter(newFilter === filter ? "" : newFilter);
  };

  const handleDeleteAll = () => {
    val = 1;
    setTodos([]);
  };

  const filteredTodos = todos.filter((todo) =>
    filter ? todo.status === filter : true
  );

  const TodoItem = ({ todo, index }) => {
    const handleChange = () => {
      updateStatus(index);
    };

    const handleDelete = () => {
      removeTodo(index);
    };

    return (
      <li className="todo">
        <label htmlFor={`todo-${index}`}>
          <input
            id={`todo-${index}`}
            type="checkbox"
            checked={todo.status === "completed"}
            onChange={handleChange}
          />
          <span className={todo.status === "completed" ? "checked" : ""}>
            {todo.name}
          </span>
        </label>
        <button className="delete-btn" onClick={handleDelete}>
          <i className="fa fa-times"></i>
        </button>
      </li>
    );
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          className="todo-input"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
        />
        <button className="add-todo-button" onClick={handleAddTodo}>
          <i className="fa fa-plus-circle"></i>
        </button>
         </div>
         <div className="filters">
        <div
          className={`filter ${filter === "completed" ? "active" : ""}`}
          onClick={() => handleFilterClick("completed")}
        >
          Complete
        </div>
        <div
          className={`filter ${filter === "pending" ? "active" : ""}`}
          onClick={() => handleFilterClick("pending")}
        >
          Incomplete
        </div>
        <div className="delete-all" onClick={handleDeleteAll}>
          Delete All
        </div>
        </div>
        <div className="todos-container">
        <ul className="todos">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem key={todo.id} index={todo.id} todo={todo} />
            ))
          ) : (
            <img className="empty-image" src={emptyImage} alt="No todos" />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
