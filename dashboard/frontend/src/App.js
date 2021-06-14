import "./App.css";
import { Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Doctor from "./components/Doctor";
import Nurse from "./components/Nurse";

function App() {
  return (
    <>
      <Route exact path="/">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/doctor">
        <Doctor />
      </Route>
      <Route path="/nurse">
        <Nurse />
      </Route>
    </>
  );
}

export default App;
