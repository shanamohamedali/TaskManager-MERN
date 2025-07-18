import React, { useState } from "react";
import { TodoInput } from "../TodoInput/TodoInput";
import { TodoButton } from "../TodoButton/TodoButton";
import "./TodoEdit.css";
import { API_URL } from "../../../constants/constants";
import axios from "axios";

export function TodoEdit({ todoList, setTodoList, editItem, setEditItem }) {
  //const[editedItem,setEditedItem]=useState(" ")
  //const{id,title,completed}=editItem;
  console.log("...dgasf", todoList);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEditItem({ ...editItem, title: e.target.value });
  };
  const handleChangeSave = async (e) => {
    e.preventDefault();
    try {
      if (editItem.title !== "") {
        const response = await axios(API_URL, {
          method: "PUT",
          data: {
            _id: editItem._id,
            title: editItem.title,
            completed: editItem.completed,
          },
        });
        if (response) {
          console.log("edit response", response.data);
          const { _id, title, completed } = response.data;
          const responseEditedData = todoList.map((item) => {
            if (item._id === _id) 
              return {
                ...item,
                title: title,
              }
              return item;
          });
          console.log("respo", responseEditedData);
          setTodoList(responseEditedData);
          setEditItem("");
        }
      } else {
        setError("Input is required, enter the edited task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="todoedit-container">
        <TodoInput
          onChange={handleChange}
          value={editItem.title}
          name="editInput"
          type="text"
          placeholder="Edit Todo Item.."
          onKeyDown={(e)=>{
            if(e.key==="Enter") handleChangeSave(e)
          }
           }
        />
        <TodoButton onClick={handleChangeSave} label="SAVE" />
        <TodoButton onClick={() => setEditItem("")} label="CANCEL" />
      </div>
      {error && <p className="error">{error}</p>}
    </>
  );
}
