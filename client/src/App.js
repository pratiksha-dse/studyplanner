import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import AdminRoute from "./hocs/AdminRoute";
import StudentRoute from "./hocs/StudentRoute";
import Home from "demos/Home.js";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AdminSession from "demos/AdminSession";
import StudentSession from "demos/StudentSession";
import AdminSessionEdit from "demos/AdminSessionEdit";
import SessionView from "demos/SessionView";
import EnrollSessionView from "demos/EnrollSessionView";
export default function App() {

  return (
    <Router>
      <Switch>
        <AdminRoute exact path="/admin_session" component={AdminSession} />
        <AdminRoute path="/admin_session_edit" component={AdminSessionEdit} />
        <StudentRoute exact path="/sessions" component={StudentSession} />
        <StudentRoute path="/session" component={SessionView} />
        <StudentRoute path="/enroll_session" component={EnrollSessionView} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
