import { db } from "../../auth/firebase";
import { SET_SELECTED_DATE } from "../actionTypes/dailyTodo";
import moment from "moment";

import getDailyTodoInstance from "../../helpers/getDailyTodoInstance";
import { fetchTodosSuccess } from "./todo";

function onSetSelectedDate(date) {
  return {
    type: SET_SELECTED_DATE,
    payload: {
      date,
    },
  };
}
function setSelectedDate(date) {
  return (dispatch, getState) => {
    dispatch(onSetSelectedDate(new Date(date)));
    dispatch(fetchDailyTodosBydate());
  };
}

function fetchDailyTodosBydate() {
  return (dispatch, getState) => {
    const { todoLists } = getState().todoList;
    const daily = getDailyTodoInstance(todoLists);
    const { _id } = daily;
    const { selectedDate } = getState().dailyTodo;

    const beginingOfTheSelectedDate = moment(selectedDate)
      .startOf("day")
      .toString();
    const endOfTheSelectedDate = moment(selectedDate).endOf("day").toString();

    //  00:00:00 included
    let query = db.collection("todos").where("todoListId", "==", _id);
    query = query.where("dateTime", ">=", new Date(beginingOfTheSelectedDate));
    query = query.where("dateTime", "<=", new Date(endOfTheSelectedDate));

    const unsubscribe = query.onSnapshot(function (querySnapshot) {
      const todos = [];
      querySnapshot.forEach(function (doc) {
        todos.push({
          ...doc.data(),
          _id: doc.id,
        });
      });

      dispatch(fetchTodosSuccess(todos));
    });

    return unsubscribe;
  };
}

export { setSelectedDate, fetchDailyTodosBydate };
