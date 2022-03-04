import { Route, Switch } from "react-router-dom";
import { Dashboard } from "src/pages/Dashboard";

export const Routes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
  </Switch>
);
