import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home/index';
import history from './history';
import Search from '../Search';
import Reviews from '../Reviews';
import MyPage from '../MyPage';
import { Redirect } from 'react-router';
import NavBar from '../NavBar';
import Landing from "../Landing";

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (
    <>
    
    <Router history={history}>
      <NavBar />
      <Switch>
      <Route path="/Landing" exact component={Landing} />
      <Route path="/search" exact component={Search} />
      <Route path="/reviews" exact component={Reviews} />
      <Route path="/myPage" exact component={MyPage} />
      <Route path="*">
          <Redirect to="/Landing" />
        </Route>
      </Switch>
    </Router>
  
    </>
  );
}