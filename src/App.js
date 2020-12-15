import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute path="/" exact component={Dashboard} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={SignUp} />
                    </Switch>
                </AuthProvider>
            </BrowserRouter>
        );
    }
}

export default App;