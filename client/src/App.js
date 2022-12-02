import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

import Navbar from "./components/Navbar";
import Form from "./pages/Form";

import GetStarted from "./components/GetStarted";

import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import { Switch, Route } from "react-router-dom";
import HCard from "./components/HCard";
import Box from "./components/Box";


function App() {
  return (
    <div className="h-auto">
      <Navbar />
      <Switch>

        <Route exact path="/" component={LandingPage} />
        <Route exact path="/history/:id" component={HCard} />
        <Route exact path="/getstarted" component={GetStarted} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/history" component={History} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/form" component={Box} />
      </Switch>
    </div>
  );
}

export default App;
