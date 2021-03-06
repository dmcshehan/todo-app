import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer from "./user";

import dropdownReducer from "./dropdown";
import notificationReducer from "./notification";
import todoListReducer from "./todoList";
import todoListFormReducer from "./todoListForm";
import todoReducer from "./todo";
import todoFormReducer from "./todoForm";
import dailyTodoReducer from "./dailyTodo";
import uiReduer from "./ui";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["dropDown", "todoListForm", "todoForm", "dailyTodo", "ui"],
};

const rootReducer = combineReducers({
  user: userReducer,
  dropDown: dropdownReducer,
  notification: notificationReducer,
  todoList: todoListReducer,
  todoListForm: todoListFormReducer,
  todoForm: todoFormReducer,
  todo: todoReducer,
  dailyTodo: dailyTodoReducer,
  ui: uiReduer,
});

export default persistReducer(persistConfig, rootReducer);
