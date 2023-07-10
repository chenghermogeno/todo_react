import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("token") || "");
  const [newComment, setNewComment] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: newTodo, comments: [] }]);
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addComment = (todoId, comment) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          comments: [...todo.comments, { id: Date.now(), text: comment }],
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteComment = (todoId, commentId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          comments: todo.comments.filter((comment) => comment.id !== commentId),
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const startEditing = (id, text) => {
    setEditTodoId(id);
    setEditedTodoText(text);
  };

  const cancelEditing = () => {
    setEditTodoId(null);
    setEditedTodoText("");
  };

  const saveEditedTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: editedTodoText,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditedTodoText("");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <button
          onClick={() => handleLogout()}
          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Logout
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold">To-Do List</h1>
          <input
            type="text"
            placeholder="Add a new to-do"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="block w-full border h-10 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            onClick={addTodo}
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add
          </button>

          {todos.map((todo) => (
            <div key={todo.id} className="mt-4">
              {editTodoId === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editedTodoText}
                    onChange={(e) => setEditedTodoText(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border h-10"
                  />
                  <button
                    onClick={() => saveEditedTodo(todo.id)}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p className="mb-2">{todo.text}</p>
                  <ul>
                    {todo.comments.map((comment) => (
                      <li key={comment.id}>{comment.text}</li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border h-10"
                  />
                  <button
                    onClick={() => addComment(todo.id, newComment)}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Comment
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => startEditing(todo.id, todo.text)}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
