import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addTodo } from "../../store/actionCreators/todo";

import { form, inputField, check, hide } from "./AddTodoForm.module.scss";

export default function AddTodoForm() {
  const dispatch = useDispatch();
  const { showTodoForm } = useSelector((state) => state.todoForm);

  const input = React.createRef();

  const [title, setTitle] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    input.current.focus();
  });

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleCheck() {
    setIsComplete(!isComplete);
  }

  function createTodo(title, isComplete) {
    const dateTime = new Date();
    return {
      title,
      isComplete,
      dateTime,
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    dispatch(addTodo(createTodo(title, isComplete))).then(function () {
      setTitle("");
      setIsComplete(false);
    });
  }

  return (
    <div className={!showTodoForm ? hide : null}>
      <form className={form} onSubmit={handleSubmit}>
        <input
          type='checkbox'
          className={check}
          checked={isComplete}
          onChange={handleCheck}
        />
        <input
          ref={input}
          type='text'
          value={title}
          onChange={handleChange}
          placeholder='Todo Title'
          className={`${inputField} is-small`}
        />
        <button
          className={`button is-small is-outlined`}
          disabled={title.length === 0}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}
