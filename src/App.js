import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import Login from "./components/Login";
import ToDoList from "./components/TodoList";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="todo" element={<ToDoList />} />
      </Routes>
    </Router>
  );
}

export default App;
