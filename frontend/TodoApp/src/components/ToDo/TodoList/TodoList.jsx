import React, { useState } from "react";
import "./TodoList.css";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { TodoEdit } from "../TodoEdit/TodoEdit";
import axios from "axios";
import { API_URL } from "../../../constants/constants";

export function TodoList({ todoList, setTodoList }) {
  const [editItem, setEditItem] = useState("");

  const handleCompleteToggle = async (_id, completed) => {
    try {
      const response = await axios(`${API_URL}toggle`, {
        method: "PUT",
        data: {
          _id: _id,
          completed: completed,
        },
      });
      if (response) {
        const { _id, completed } = response.data;
        const responseToggle = todoList.map((item) => {
          if (item._id === _id)
            return {
              ...item,
              completed: completed,
            }
          return item;
        });
        setTodoList(responseToggle);
      }

      //console.log("===toggle", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodoItem = async (_id) => {
    console.log("id...", _id);
    try {
      const response = await axios(API_URL, {
        method: "DELETE",
        data: {
          _id: _id,
        },
      });

      console.log("delete data", response);
      if (response) {
        const { _id } = response.data;
        const responseDelete = todoList.filter((item) => item._id !== _id);
        setTodoList(responseDelete);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("..edititem", editItem);

  return (
    <div className="todo-list-containter">
      <div>
        <ul>
          {todoList.map((item, index) => (
            <div className="todo-item" key={item._id}>
              <li
                key={item._id}
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
                onClick={() => handleCompleteToggle(item._id, item.completed)}
              >
                {item.title}
              </li>
              <button
                // style={{ paddingRight: "40px"}}
                onClick={() =>
                  setEditItem({
                    ...editItem,
                    _id: item._id,
                    title: item.title,
                    completed: item.completed,
                  })
                }
              >
                <FaPen />
              </button>
              <button>
                <FaTrash onClick={() => deleteTodoItem(item._id)} />
              </button>
            </div>
          ))}
        </ul>
      </div>
      {editItem && (
        <div>
          <TodoEdit
            todoList={todoList}
            setTodoList={setTodoList}
            editItem={editItem}
            setEditItem={setEditItem}
          />
        </div>
      )}
    </div>
  );
}
