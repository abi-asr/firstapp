import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Pages/LOGIN/Login'
import Home from './Pages/Home/Home'
import Save from './Pages/Saved_Items/Save'
 

function App() {
  return (
    <div className="App">
      <Router> 
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
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
