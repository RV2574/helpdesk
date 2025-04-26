import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TicketList from "./components/TicketList";
import TicketDetails from "./components/TicketDetails";
import Dashboard from "../pages/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/tickets" exact component={TicketList} />
        <Route path="/tickets" exact component={TicketList} />
        <Route path="/tickets/:id" component={TicketDetails} />
        <Route path="/dashboard" component={Dashboard} />

      </Switch>
    </Router>
  );
}

export default App;