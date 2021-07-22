import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Pages/LOGIN/Login'
import Home from './Pages/Home/Home'
import Save from './Pages/Saved_Items/Save'
import Profile from './Pages/Profile/Profile';
import { EMPTYPATH, HOMEPATH, LOGIN_PATH, PROFILEPATH, SAVEPATH } from './Common/CommonConstants';
 

function App() {
  return (
    <div className="App">
      <Router> 
        <Switch>
          <Route exact path={EMPTYPATH}>
            <Login />
          </Route>
          <Route exact path={LOGIN_PATH}>
            <Login />
          </Route>
          <Route path={HOMEPATH}>
            <Home />
          </Route>
          <Route path={SAVEPATH}>
            <Save />
          </Route>
          <Route path={PROFILEPATH}>
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
