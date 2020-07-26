import { db } from "../../auth/firebase";
import { FETCH_TODOS_SUCCESS } from "../actionTypes/todo";

function fetchTodosSuccess(todos) {
  return {
    type: FETCH_TODOS_SUCCESS,
    payload: {
      todos,
    },
  };
}

function fetchTodos(_id) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      db.collection("todos")
        .where("todoListId", "==", _id)
        .onSnapshot(function (querySnapshot) {
          const todos = [];
          querySnapshot.forEach(function (doc) {
            todos.push({ ...doc.data(), _id: doc.id });
          });

          resolve(todos);
          dispatch(fetchTodosSuccess(todos));
        });
    });
  };
}

function addTodo(title) {
  return (dispatch, getState) => {
    const { _id } = getState().todoList.selected;

    const completeTodo = {
      title,
      isComplete: false,
      todoListId: _id,
    };

    return new Promise(function (resolve, reject) {
      db.collection("todos")
        .add(completeTodo)
        .then(function (docRef) {
          resolve(docRef.id);
          console.log("Document written with ID: ", docRef.id);
        });
    });
  };
}

function updateTodo(_id, mergeObject) {
  return (dispatch, getState) => {
    db.collection("todos")
      .doc(_id)
      .update(mergeObject)
      .then(function (docRef) {
        console.log("Document successfully updated!");
      });
  };
}

export { fetchTodos, addTodo, updateTodo };