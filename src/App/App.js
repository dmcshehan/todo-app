import classNames from "./App.module.scss";

import React, { useEffect } from "react";
import firebase from "../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { userLoginSuccess } from "../store/actionCreators/user";
import { closeDropdown } from "../store/actionCreators/dropdown";
import { changeScreenSize } from "../store/actionCreators/ui";
import { hideTodoListForm } from "../store/actionCreators/todoListForm";

//Components
import DropDown from "./Dropdown/Dropdown";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Navbar/Navbar";
import Container from "./Container/Container";
import Notification from "./Notification/Notification";

//Pages
import NotFound from "./404/404";
import Home from "./Home/Home";
import Signin from "./Signin/Signin";

//hooks
import isLoggedIn from "../hooks/useIsLoggedIn";

export default function App() {
  const { isDropdownOpen } = useSelector((state) => state.dropDown);
  const { screenSize } = useSelector((state) => state.ui);
  const { showTodoListForm } = useSelector((state) => state.todoListForm);
  const isUserLoggedIn = isLoggedIn();

  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (loggedInUser) {
      if (loggedInUser) {
        dispatch(userLoginSuccess(loggedInUser));
      }
    });

    function handleResize() {
      const { innerWidth } = window;
      if (innerWidth <= 768) {
        dispatch(changeScreenSize("mobile"));
      } else if (innerWidth >= 769 && innerWidth <= 1023) {
        dispatch(changeScreenSize("tablet"));
      } else {
        if (screenSize !== "desktop") {
          return dispatch(changeScreenSize("desktop"));
        }
      }
    }
    handleResize();
  }, [isUserLoggedIn]);

  function handleBackgroundClick() {
    if (isDropdownOpen) {
      dispatch(closeDropdown());
    }
    if (showTodoListForm) {
      dispatch(hideTodoListForm());
    }
  }

  return (
    <React.StrictMode>
      <BrowserRouter>
        <div className={classNames.app} onClick={handleBackgroundClick}>
          <Navbar />
          <DropDown />
          <Container>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/signin' component={Signin} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route path='/' component={NotFound} />
            </Switch>
          </Container>
          <Notification />
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}
