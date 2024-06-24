import React, { useState } from "react";
import { Todo } from "../interfaces";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const selectAllTodos = () => {
    setTodos(
      todos.map((todo) =>
        todo.completed ? todo : { ...todo, completed: true }
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="todo-list">
      <h1>todos</h1>
      <div className="input-section">
        <button onClick={selectAllTodos}>✔️</button>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? addTodo() : null)}
        />
      </div>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      ))}
      <div className="footer">
        <div className="todo-count">
          {remainingTodos} {remainingTodos === 1 ? "items left" : "items left"}
        </div>
        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>

        <div className="clear-todos">
          <button onClick={clearCompletedTodos}>Clear Completed</button>
        </div>
      </div>
      <h6>created by Ed5Arthur</h6>
    </div>
  );
};

export default TodoList;
