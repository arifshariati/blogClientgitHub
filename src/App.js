import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';

// Redux

import { Provider } from 'react-redux';
import store from './redux/store';

//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

//Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

axios.defaults.baseURL = "https://us-central1-covid-blog.cloudfunctions.net/posts";

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;

if(token){
  const decodedToken = jwtDecode(token);

  if(decodedToken.exp * 10000 < Date.now()){
    window.location.href = '/login';
    authenticated = false;
  }else{
    authenticated = true;
  }

}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}></Route>
              <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
              <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
