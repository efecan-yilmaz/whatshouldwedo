import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Movies from './components/Movies';
import Series from './components/Series';
import Activities from './components/Activities';
import Music from './components/Music';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute path="/" exact component={Dashboard} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={SignUp} />
                        <PrivateRoute path="/movies" exact component={Movies} />
                        <PrivateRoute path="/series" exact component={Series} />
                        <PrivateRoute path="/activities" exact component={Activities} />
                        <PrivateRoute path="/music" exact component={Music} />
                    </Switch>
                </AuthProvider>
            </BrowserRouter>
        );
    }
}

export default App;