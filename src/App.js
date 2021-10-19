import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import { userActions } from "./redux/actions";
import Login from "./components/Login";
import Home from "./pages/Home";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();

  const { userLogin } = bindActionCreators(userActions, dispatch);

  const { userInfo } = useSelector((state) => state.users);

  useEffect(() => {
    const isLoginCheck = () => {
      if (userInfo) setIsLogin(true);
      else {
        let localStorageValue = JSON.parse(
          localStorage.getItem("authorizationInfo")
        );
        if (
          localStorageValue?.rememberMe &&
          JSON.parse(localStorage.getItem("authorization")).isLogin
        ) {
          userLogin(localStorageValue);
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      }
    };

    isLoginCheck();
  });
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={isLogin ? Home : Login} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
