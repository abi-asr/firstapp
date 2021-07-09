import './App.css';
import Login from './Pages/Login'
import Home from './Pages/Home'
import Save from './Pages/Save'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/savedItems">
            <Save />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
