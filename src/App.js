import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const { userInfo } = useSelector((state) => state.users);

  useEffect(() => {
    const isLoginCheck = () => {
      if (userInfo) setIsLogin(true);
      else setIsLogin(false);
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
